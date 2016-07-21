/*jslint browser: true, indent: 2, node: true*/
/*global require, module*/
'use strict';

/**
 * gmapsApiLoader - loads a google maps api and executes a callback once loaded
 *
 * @param  {string}       apiKey   description
 * @param  {function}     callback description
 * @param  {DOMElement}   container description
 * @return {type}          description
 */
function gmapsApiLoader(settings) {
  var gmapsScriptTag = document.createElement('script');
  gmapsScriptTag.src = "https://maps.googleapis.com/maps/api/js?key=" + settings.apiKey;

  gmapsScriptTag.onload = function () {
    // we are sure maps we loaded
    if (settings.callback) {
      settings.callback();
    }
  };

  // add script itself
  settings.container.insertAdjacentElement('afterend', gmapsScriptTag);

  return true;
}

module.exports = gmapsApiLoader;
