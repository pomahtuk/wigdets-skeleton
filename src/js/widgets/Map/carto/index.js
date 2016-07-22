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
    airportsList = options.airportsList || [],
    mapBounds;

  // create all markers;

  // get initial map position
  mapBounds = geometry.getBounds(airportsList);

  // run all code
  var map = new google.maps.Map(this.mapContainer, {
    center: mapBounds.getCenter(),
    zoom: 8,
    disableDefaultUI: true
  });

  google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
    //remove one zoom level to ensure no marker is on the edge.
    this.setZoom(map.getZoom() - 1);

    // set a minimum zoom
    // if you got only 1 marker or all markers are on the same address map will be zoomed too much.
    if (this.getZoom() > 15) {
      this.setZoom(15);
    }
  });

  // basicly we are just updating zoom level to appropriate
  map.fitBounds(bounds);

  // remove preloader
  preloader.stop();

};

module.exports = Carto;
