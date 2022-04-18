require.extensions['.css', '.pcss'] = function() {
  return null;
};

const {JSDOM} = require('jsdom');

const {window} = new JSDOM('<div id="root"></div>', {url: 'http://localhost'});

global.window = window;
global.document = window.document;
