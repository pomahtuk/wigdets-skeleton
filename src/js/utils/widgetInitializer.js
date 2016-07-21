/*jslint browser: true, indent: 2, node: true*/
/*global require*/

'use strict';

var indexOfPolyfill = require('./polyfills/indexOf'),
  forEachPolyfill = require('./polyfills/indexOf'),
  queryString = require('./queryStringParser');

// add array index of for old browsers (IE<9)
indexOfPolyfill();
forEachPolyfill();

function widgetInitializer(params) {
  var matchingExpression = params.expression ||  /app\.js/,
    Widget = params.Widget || function () { return null; },
    scriptTag,
    scriptTags,
    widgetParams,
    widget,
    container,
    scriptQueryString,
    i;

  // iterate over sripts to get this one
  scriptTags = document.getElementsByTagName('script');

  for (i = 0; i < scriptTags.length; i += 1) {
    scriptTag = scriptTags[i];

    // if this is a cript we were looking for
    if (scriptTag.src.match(matchingExpression) && !scriptTag.attributes.inited) {
      // grab all params from widget url
      scriptQueryString = scriptTag.src.split('?')[1];
      widgetParams = queryString.parse(scriptQueryString);

      // Create a div
      container = document.createElement('div');
      scriptTag.parentNode.insertBefore(container, scriptTag);
      widgetParams.container = container;
      widgetParams.containerClass = params.stylePrefix;

      // run init code
      widget = new Widget(widgetParams);
      scriptTag.attributes.inited = true;
    }
  }
}


module.exports = widgetInitializer;
