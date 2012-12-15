var  $ = function (global) {

  var webdriver = require('./node/webdriver'),
      assert    = require('assert'),
      driver,
      timeout = 60,
      util = require('util'),
    classSelectorRE = /^\.([\w-]+)$/,
    idSelectorRE = /^#([\w-]*)$/,
    tagSelectorRE = /^[\w-]+$/;

  function $(selector) {
    var locator = 'css';
    if (idSelectorRE.test(selector)) {
      locator = 'id';
      selector = selector.slice(1);
    } else if (tagSelectorRE.test(selector)) {
      locator = 'tagName';
    } else if (classSelectorRE.test(selector)) {
      locator = 'className';
    } else {
      locator = 'css';
    }
    return driver.findElement(webdriver.By[locator](selector));
  };

  webdriver.WebElement.prototype.val = function (value) {
    this.sendKeys(value)
    return this;
  };

  function merge(destination, source) {
    for (var property in source) {
      if (!(property in destination)) {

        destination[property] = source[property];
      }
    }
    return destination;
  }


  $.connect = function (options) {
    if (typeof options === 'string') {
      options = {
        browserName: options
      };
    }
    options = options || {};
    options = merge(options, {
        host: 'http://localhost:4444/wd/hub',
        browserName: 'chrome',
        version: '',
        platform: 'ANY',
        javascriptEnabled: true
    });
    var host = options.host;
    delete options.host;
    driver = new webdriver.Builder().
                  usingServer(host).
                  withCapabilities(options).
                  build();
  };

  $.get = function (url) {
    driver.get(url);
  };

  $.quit = function() {
    driver.quit();
  }

  $.assertTitle = function (title, message) {
    driver.getTitle().then(function($title) {
      try {
        console.assert(title === $title, message)
      } catch (e) {
        console.log('Failure: ' + e.message);
      }
    });
    return new webdriver.promise.Promise();
  }

  $.assertVisibleAndNotEmpty = function (element) {
    element = $(element);
    element.isDisplayed().then(function () {
      console.log(element.getI);
    });
  };

  return $;

}();


function TestLogin() {
    $.get('https://www.localhost.org/en/login');
    $('#username').val('ophina');
    $('#password').val('crest177');
    $('#enter').click();
    $.assertTitle('myabakus->dashboard', 'Llega al dashboard');
}

function TestHome() {
  $('#user').click();
  $.assertVisibleAndNotEmpty('#win-user')
}



$.connect();

TestLogin();
TestHome();



/*
$.assertTitle('myabakus->dashboards', 'Llega al dashboard').then(function () {
  console.log('PRUEBA');
});*/
$.quit();