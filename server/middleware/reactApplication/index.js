
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';

import makeStore from '../../../shared/redux/store';
import getConfig from '../../../config/get';
import App from '../../../shared/components/App';

import ServerHTML from './ServerHTML';

/**
 * React application middleware, supports server side rendering.
 */
function reactApplicationMiddleware(request, response) {
  // We should have had a nonce provided to us.  See the server/index.js for
  // more information on what this is.
  if (typeof response.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }
  const nonce = response.locals.nonce;

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if (getConfig('disableSSR')) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('==> Handling react route without SSR');
    }
    // SSR is disabled so we will just return an empty html page and will
    // rely on the client to initialize and render the react application.
    const html = renderToStaticMarkup(<ServerHTML nonce={nonce} />);
    response.status(200).send(html);
    return;
  }

  // Create the redux store.
  const store = makeStore();
  const { getState } = store;

  // First create a context for <ServerRouter>, which will allow us to
  // query for the results of the render.
  const reactRouterContext = createServerRenderContext();

  // Create our React application.
  const app = (
    <ServerRouter location={request.url} context={reactRouterContext}>
      <Provider store={store}>
        <App />
      </Provider>
    </ServerRouter>
  );

  // Render the app to a string.
  const reactAppString = renderToString(app);

  // Generate the html response.
  const html = renderToStaticMarkup(
    <ServerHTML
      reactAppString={reactAppString}
      nonce={nonce}
      helmet={Helmet.rewind()}
      initialState={getState()}
    />,
  );

  // Get the render result from the server render context.
  const renderResult = reactRouterContext.getResult();

  // Check if the render result contains a redirect, if so we need to set
  // the specific status and redirect header and end the response.
  if (renderResult.redirect) {
    response.status(301).setHeader('Location', renderResult.redirect.pathname);
    response.end();
    return;
  }

  response
    .status(
      renderResult.missed
        // If the renderResult contains a "missed" match then we set a 404 code.
        // Our App component will handle the rendering of an Error404 view.
        ? 404
        // Otherwise everything is all good and we send a 200 OK status.
        : 200,
    )
    .send(`<!DOCTYPE html>${html}`);
}

export default reactApplicationMiddleware;
