/*jslint browser: true, indent: 2, node: true*/
/*global require, module*/
'use strict';

var styles = require('../../css/widgets/map.css'),
  gmapsLoader = require('./helpers/gmapsApiLoader'),
  Preloader = require('../components/preloader');


/**
 * MapWidget - description
 *
 * @param  {type} params description
 * @return {type}        description
 */
function MapWidget(params) {
  var container = params.container,
    mapHolder = document.createElement('div'),
    logoContainer,
    preloader;

  container.className = params.containerClass;
  container.style.width = params.width ? params.width : '100%';
  container.style.height = params.height ? params.height : '100%';

  // prepare container
  if (!params.hideLogo) {
    logoContainer = document.createElement('div');
    logoContainer.className = styles.logo;
    container.appendChild(logoContainer);
  }

  mapHolder.className = styles['maps-container'];
  container.appendChild(mapHolder);

  // set preloader
  preloader = new Preloader({
    container: container
  });
  preloader.start();

  window.preloader = preloader;

  // load google maps
  gmapsLoader({
    apiKey: params.apiKey,
    container: container,
    callback: function () {
      console.log('loaded!');
      // remove preloader
      // preloader.stop();
      // run all code
      var map = new google.maps.Map(mapHolder, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8,
        disableDefaultUI: true
      });
    }
  });

}

module.exports = MapWidget;
