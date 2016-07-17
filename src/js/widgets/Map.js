/*jslint browser: true, indent: 2, node: true*/
/*global require, module*/
'use strict';

var styles = require('../../css/widgets/map.css');

function MapWidget(params) {
  var container = params.container;

  container.className = params.containerClass;
  container.style.width = params.width ? params.width : 'auto';

  // do some propper templating
  container.innerHTML = '<h1 class="' + styles.header + '">Hello, world!</h1>';
}

module.exports = MapWidget;
