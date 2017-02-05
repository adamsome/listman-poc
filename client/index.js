/* eslint-disable global-require */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router';
import { withAsyncComponents } from 'react-async-component';
import { Provider as ReduxProvider } from 'react-redux';
import { rehydrateJobs } from 'react-jobs/ssr';

import makeStore from '../shared/redux/store';
import ReactHotLoader from './components/ReactHotLoader';
import App from '../shared/components/App';

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');

// Create our Redux store.
const store = makeStore(
  // Server side rendering would have mounted our state on this global.
  window.__APP_STATE__, // eslint-disable-line no-underscore-dangle
);

function renderApp(TheApp) {
  const app = (
    <ReactHotLoader>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <TheApp />
        </BrowserRouter>
      </ReduxProvider>
    </ReactHotLoader>
  );

  // We use the react-async-component in order to support super easy code splitting
  // within our application.  It's important to use this helper
  // @see https://github.com/ctrlplusb/react-async-component
  withAsyncComponents(app)
    .then(({ appWithAsyncComponents }) =>
      rehydrateJobs(appWithAsyncComponents)
    )
    .then(({ appWithJobs }) =>
      render(appWithJobs, container)
    );
}

// Execute the first render of our app.
renderApp(App);

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker');

// The following is needed so that we can support hot reloading our application.
if (process.env.NODE_ENV === 'development' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept(
    '../shared/components/App',
    () => renderApp(require('../shared/components/App').default),
  );
}
