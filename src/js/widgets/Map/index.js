/*jslint browser: true, indent: 2, node: true*/
/*global require, module*/
'use strict';

var styles = require('../../../css/widgets/map.css'),
  gmapsLoader = require('../helpers/gmapsApiLoader'),
  ApiClient = require('../../api'),
  CartoEngine = require('./carto'),
  Preloader = require('../../components/preloader');

/**
 * MapWidget - description
 *
 * @param  {type} params description
 * @return {type}        description
 */
function MapWidget(params) {
  var container = params.container,
    mapHolder = document.createElement('div'),
    baseUrl = params.baseUrl || 'http://kupibilet.ru/',
    showLines = params.showLines || false,
    apiClinet = new ApiClient(),
    carto,
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

  // create carto engine instance
  carto = new CartoEngine(mapHolder);

  // set preloader
  preloader = new Preloader({
    container: container
  });
  preloader.start();

  // test purpose only
  function getTestAirports (response) {
    return apiClinet.getCheapDestinations(response, true);
  }

  // load google maps
  gmapsLoader({
    apiKey: params.apiKey,
    container: container,
    callback: function () {
      apiClinet.getCurrentAirpot(true)
        // .then(apiClinet.getCheapDestinations)
        .then(getTestAirports)
        .then(function (response) {
          carto.initMapWithAirports({
            preloader: preloader,
            airportsList: response,
            showLines: showLines
          })
        })
        .then(undefined, function (error) {
          console.error(error);
          // stop preloader
          // hide block / show unhappy face? // zomby rabbit?
        });
    }
  });

}

module.exports = MapWidget;
