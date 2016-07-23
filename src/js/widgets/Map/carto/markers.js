var styles = require('../../../../css/widgets/map.css');

var markers = {
  createAirportMarkers: function (airportsList, options) {
    var DivMarker = require('./DivMarker');

    var airportsMarkers = [],
      airportMarker,
      options = options || {},
      baseUrl = options.baseUrl || 'http://kupibilet.ru/',
      fromAirport = options.from || { code: 'LED' };

    airportsList.forEach(function (airport, index) {
      var markerStyles = airport.price ? styles['with-price'] : styles['from'],
        airportMarkerLink = airport.isDefault === true ? 'javascript:void(0)' : (baseUrl + fromAirport.code + airport.code),
        airportMarkerTarget = airport.isDefault === true ? '' : '_balnk',
        markerMarkup = [
          '<a target="' + airportMarkerTarget + '" href="' + airportMarkerLink + '">',
          airport.isDefault ? airport.code : airport.price ? 'от ' + airport.price + ' руб.' : 'Найти',
          '</a>'
        ];

      if (airport.isDefault) {
        markerStyles += ' ' + styles['default'];
      }

      airportMarker = new DivMarker({
        map: null,
        latlng: new google.maps.LatLng(airport.latitude, airport.longitude),
        content: markerMarkup.join(''),
        className: styles.marker + ' ' + markerStyles
      });

      airportMarker.airport = airport;

      airportsMarkers.push(airportMarker);
    });

    return airportsMarkers;
  },

  setMapToList: function (map, mapMarkers) {
    mapMarkers.forEach(function (marker) {
      marker.setMap(map);
    });
  }
};

module.exports = markers;
