import formatWebpackMessages from './formatWebpackMessages'
import { log } from '../../utils';

export const doneLogger = (stats) => {
  // We have switched off the default Webpack output in WebpackDevServer
  // options so we are going to "massage" the warnings and errors and
  // present them in a readable focused way.
  var messages = formatWebpackMessages(stats.toJson({}, true));
  // If errors exist, only show errors.
  if (messages.errors.length) {
    log({
      title: 'client',
      level: 'error',
      message: 'Build failed, please check the console for more information.',
      notify: true,
    });
    messages.errors.forEach(message => {
      console.log(message + '\n');
    });
  } else if (messages.warnings.length) {
    log({
      title: 'client',
      level: 'warn',
      message: 'Build completed with warnings.',
      notify: true,
    });
    messages.warnings.forEach(message => {
      console.log(message + '\n');
    });
  } else {
    log({
      title: 'client',
      level: 'info',
      message: 'Running with latest changes.',
      notify: true,
    });
  }
}

export const compileLogger = () => {
  log({
    title: 'client',
    level: 'info',
    message: 'Building new bundle...',
  });
}

