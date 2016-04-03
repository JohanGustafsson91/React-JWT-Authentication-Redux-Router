global.document = require('jsdom').jsdom('<body></body>');
global.window = document.defaultView;
global.localStorage = {
  'setItem': (key, value) => {
    // console.log(key, value);
  },
  'getItem': (key) => {
    // console.log('getItem: ', key);
  },
  'removeItem': (key) => {
    // console.log('removeItem: ', key);
  }
};
global.navigator = window.navigator;
