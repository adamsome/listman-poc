 - [Project Overview](/internal/docs/PROJECT_OVERVIEW.md)
 - __[Application Configuration](/internal/docs/APPLICATION_CONFIG.md)__
 - [Package Script Commands](/internal/docs/PKG_SCRIPTS.md)
 - [Feature Branches](/internal/docs/FEATURE_BRANCHES.md)
 - [Deploy your very own Server Side Rendering React App in 5 easy steps](/internal/docs/DEPLOY_TO_NOW.md)
 - [FAQ](/internal/docs/FAQ.md)

# Application configuration

The application configuration has been centralised to live within the `<projectroot>/config` folder.

You read configuration values using the `<projectroot>/config/get.js` helper, and you edit the configuration values in the `<projectroot>/config/values.js` file.

> ___NOTE:___ You __MUST NOT__ import the `values.js` configuration into your source code. Rather use the `get.js` helper. Please read all of the below for the context and reasoning on this.

## TOC

 - [Background and Usage](#background-and-usage)
 - [Declaring the configuration values that are safe for client bundles](#declaring-the-configuration-values-that-are-safe-for-client-bundles)
 - [Environment Specific Values](#environment-specifc-values)
 - [Config Highlights](#config-highlights)
   - [Easily add an "API" bundle](#easily-add-an-api-bundle)

## Background and Usage

Below are some of the problems that we faced, and how we ended up with our current implementation...

As this is a universal application you are mostly creating code that is shared between your "client" and "server" bundles. The "client" is sent across the wire to be executed in user's browsers therefore you have to be extra careful in what you include in the bundle.  Webpack by default bundles all code together if it is imported within your source. Therefore if you were to import the application configuration within a module that will be included in the "client" bundle, the entire application configuration would be included with your "client" bundle. This is extremely risky as the configuration exposes the internal structure of your application and may contain sensitive data such as database connection strings.

One possible solution to the above would be to use Webpack's `DefinePlugin` in order to statically inject/replace only the required configuration values into our client bundle.  However,  this solution fails to address our desire to be able to expose execution time provided values (e.g. `FOO=bar npm run start`) to our client bundle. These environment variables can only be interpreted at runtime, therefore we decided on a strategy of making the server be responsible for attaching a configuration object to `window.__CLIENT_CONFIG__` within the HTML response.  This would then allow us to ensure that environment variables can be properly exposed.  This works well, however, it introduces a new problem, we want a unified API to read configuration values without having to figure out if the code is in a browser/server context.

For this we created a helper function called `getConfig`.  It is located in `<projectroot>/config/get`.  You can use it like so:

```js
import getConfig from '../config/get';

export function MyComponent() {
  return <h1>{getConfig('welcomeMessage')}</h1>;
}
```

The `getConfig` helper allows you to specify nested path structures in the form of a dot-notated string or array. For example the following resolve to the same config value:

```js
getConfig('messages.welcome');
getConfig(['messages', 'welcome']);
```

The `getConfig` is also configured to throw helpful error messages when trying to request configuration values that either do not exist or have not been exposed to the client bundles.

## Declaring the configuration values that are safe for client bundles

Within the centralised config (`<projectroot>/config/values.js`) you will see that a `clientConfigFilter` property.  This value is a ruleset/filter that details which of the configuration values you deem required (and safe) for inclusion within your client bundles.  Please go to this section of the configuration file for more detail on how this filtering mechanism works.

When a server request is being processed this filtering configuration export will be serialised and attached to the `window.__CLIENT_CONFIG__` within the HTML response, thereby allowing our browser executed code to have access to the respective configuration values.

## Environment Specific Values

Environment specific values are support via host system environment variables (e.g. `FOO=bar yarn run start`) and/or by providing an "env" file.  

"env" files is an optional feature that is supported by the [`dotenv`](https://github.com/motdotla/dotenv) module. This module allows you to define files containing key/value pairs representing your required environment variables (e.g. `PORT=1337`). To use this feature create an `.env` file within the root of the project (we have provided an example file called `.env_example`, which contains all the environment variables this project currently relies on).

> Note: The `.env` file has been ignored from the git repository in anticipation that it will most likely be used to house development specific configuration.

We generally recommend that you don't persist any "env" files within the repository, and instead rely on your target host environments and/or deployment servers to provide the necessary values per environment.  

If you do however have the requirement to create and persist "env" files for multiple target environments, the system does support it. To do so create a ".env" file that is postfix'ed with the environment you are targeting. For e.g. `.env.development` or `.env.staging` or `.env.production`.

Then when you run your code with the `CONF_ENV=target` set it will load the appropriate "env.target" file.

```js
yarn run build
CONF_ENV=staging yarn run start # This will look for a .env.staging file
```

 > Note: if an environment specific configuration file exists, it will be used over the more generic `.env` file.

As stated before, the application has been configured to accept a mix-match of sources for the environment variables. i.e. you can provide some/all of the environment variables via the `.env` file, and others via the cli/host (e.g. `FOO=bar yarn run build`). This gives you greater flexibility and grants you the opportunity to control the provision of sensitive values (e.g. db connection string).  Please do note that "env" file values will take preference over any values provided by the host/CLI.

> Note: It is recommended that you bind your environment configuration values to the global `./config/values.js`. See the existing items within as an example.

## Config Highlights

Below are some interesting aspects of the configuration file to be aware of.

### Easily add an "API" bundle

A fairly common requirement for a project that scales is to create additional servers bundles, e.g. an API server.

Instead of requiring you to hack the Webpack configuration we have have provided a section within the centralised project configuration that allows you to easily declare additional bundles.  You simply need to provide the source, entry, and output paths - we take care of the rest.  

_IMPORTANT:_ One further requirement for this feature is that within your new server bundle you export the created http listener.  This exported listener will be used by the development server so that it can automatically restart your server any time the source files for it change.
