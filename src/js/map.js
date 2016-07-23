/*jslint browser: true, indent: 2, node: true*/
/*global require, module*/
'use strict';

var styles = require('../css/common/reset.css'),
  widgetInitializer = require('./utils/widgetInitializer'),
  Widget = require('./widgets/Map'),
  // TODO: implement propper sript matching
  matchingExpression = /app\.js/;

widgetInitializer({
  expression: matchingExpression,
  Widget: Widget,
  stylePrefix: styles.cleanslate
});
