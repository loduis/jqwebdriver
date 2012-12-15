var  jWebDriver = function (global) {

  var webdriver = require('./node/webdriver'),
      assert    = require('assert'),
      driver,
      timeout = 60,
      util = require('util'),
    classSelectorRE = /^\.([\w-]+)$/,
    idSelectorRE = /^#([\w-]*)$/,
    tagSelectorRE = /^[\w-]+$/;

  function jWebDriver(selector) {
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
  }

  function val(value) {
    this.sendKeys(value)
    return this;
  }

  function merge(destination, source) {
    for (var property in source) {
      if (!(property in destination)) {

        destination[property] = source[property];
      }
    }
    return destination;
  }

  function connect() {
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
  }

  function get(url) {
    driver.get(url);
  }

  function quit() {
    driver.quit();
  }

  function assertTitle(title, message) {
    driver.getTitle().then(function($title) {
      try {
        console.assert(title === $title, message)
      } catch (e) {
        console.log('Failure: ' + e.message);
      }
    });
    return new webdriver.promise.Promise();
  }

  function assertVisibleAndNotEmpty(element) {
    element = $(element);
    element.isDisplayed().then(function () {
      console.log(element.getI);
    });
  }

  webdriver.WebElement.prototype.val = val;
  // for minify your code reduce script
  !function(jWebDriver) {
    jWebDriver.connect                  = connect;
    jWebDriver.get                      = get;
    jWebDriver.quit                     = quit;
    jWebDriver.assertTitle              = assertTitle;
    jWebDriver.assertVisibleAndNotEmpty = assertVisibleAndNotEmpty;
  }(jWebDriver)


  return jWebDriver;

}();