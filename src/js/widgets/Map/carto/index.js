var markers = require('./markers'),
  geometry = require('./geometry');

function Carto (mapHolder) {
  this.mapContainer = mapHolder;
  this.map = undefined;

  return true;
}

Carto.prototype.initMapWithAirports = function (options) {
  // mock empty preloader
  var preloader = options.preloader || { stop: function () {} },
    airportsList = options.airportsList || [];

  // remove preloader
  preloader.stop();

  // run all code
  var map = new google.maps.Map(this.mapContainer, {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8,
    disableDefaultUI: true
  });

};

module.exports = Carto;
