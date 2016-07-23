var markers = require('./markers'),
  geometry = require('./geometry'),
  lines = require('./lines');

function Carto (mapHolder) {
  this.mapContainer = mapHolder;
  this.map = undefined;

  return true;
}

Carto.prototype.initMapWithAirports = function (options) {
  // mock empty preloader
  var preloader = options.preloader || { stop: function () {} },
    airportsList = options.airportsList || [],
    defaultMarker = airportsList.find(function (airport) {
      return airport.isDefault;
    }),
    baseUrl = options.baseUrl || 'http://kupibilet.ru/',
    showLines = options.showLines || false,
    mapContainer = this.mapContainer,
    mapMarkers,
    mapBounds;

  // create all markers;
  mapMarkers = markers.createAirportMarkers(airportsList, {
    baseUrl: baseUrl,
    from: defaultMarker
  });

  // get initial map position
  mapBounds = geometry.getBounds(mapMarkers);

  // run all code
  var map = new google.maps.Map(this.mapContainer, {
    center: mapBounds.getCenter(),
    zoom: 8,
    disableDefaultUI: true,
    scrollwheel: false,
    draggable: false,
    disableDoubleClickZoom: true,
  });

  // attach markers to map
  markers.setMapToList(map, mapMarkers);

  // basicly we are just updating zoom level to appropriate
  map.fitBounds(mapBounds);

  // performance!!! this bit of code is for deteaction of iframe resize
  setInterval(function () {
    map.fitBounds(mapBounds);
  }, 500);

  // add lines if enabled
  if (showLines) {
    var flightLines = lines.addLines(mapMarkers);

    lines.animateLines({
      flightLines: flightLines,
      intervalMax: 1500,
      intervalMin: 500,
      duration: 750
    });
  }

  // remove preloader with short delay
  setTimeout(function () {
    preloader.stop()
  }, 750);
};

module.exports = Carto;
