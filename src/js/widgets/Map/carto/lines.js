function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Lines = {
  addLines: function (mapMarkers) {
    var flightLines = [],
      defaultMarker = mapMarkers.find(function (marker) {
        return marker.airport.isDefault;
      });

    var planeSybmbol = {
      // TODO: own plane icon
      path: 'M 10.942,0 C 10.627,0 10.362,0.115 10.141,0.347 9.926,0.575 9.816,0.846 9.816,1.152 V 7.945 L 0,13.94 v 2.358 l 9.819,-3.11 v 5.127 L 7.63,20.393 V 22 L 11.001,21.022 14.31,22 V 20.392 L 12.189,18.316 V 13.188 L 22,16.296 V 13.938 L 12.188,7.946 V 1.152 C 12.188,0.845 12.063,0.574 11.832,0.346 11.594,0.115 11.314,0 11.001,0 h -0.059 z',
      strokeColor: '#54a6e4',
      fillColor: '#54a6e4',
      strokeColor: "#ffffff",
      fillOpacity: 0,
      strokeOpacity: 0,
      scale: 1,
      anchor: new google.maps.Point(11,3)
    };

    mapMarkers.forEach(function (marker) {
      // do not draw a line for default airport
      if (marker.airport.isDefault) {
        return true;
      }

      // Create the polyline and add the symbol to it via the 'icons' property.
      var line = new google.maps.Polyline({
        path: [
          defaultMarker.getPosition(),
          marker.getPosition()
        ],
        geodesic: true,
        strokeColor: '#54a6e4',
        strokeOpacity: 1,
        strokeWeight: 1,
        icons: [{
          icon: planeSybmbol,
          offset: '0%'
        }],
        map: marker.getMap()
      });

      flightLines.push(line);
    });

    return flightLines;
  },

  animateLines: function (options) {
    var flightLines = options.flightLines,
      duration = options.duration || 750,
      frameInterval = 100,
      frameCount = 100,
      stepSize = 100 / (duration / frameInterval),
      intervalMax = options.intervalMax || 1500,
      intervalMin = options.intervalMin || 500;

    function animateCurrentPlane (currentPlaneLine, count) {
      var count = count || 0,
        currentPlaneIcon = currentPlaneLine.get('icons')[0];

      // maje sure icon is visible
      currentPlaneIcon.icon.fillOpacity = 1;
      currentPlaneIcon.icon.strokeOpacity = 1;

      // if we done with animation
      if (count >= frameCount) {
        // reset all attributes
        count = 0;
        currentPlaneIcon.offset = count + '%';
        currentPlaneIcon.icon.fillOpacity = 0;
        currentPlaneIcon.icon.strokeOpacity = 0;
        currentPlaneLine.set('icons', [currentPlaneIcon]);

        // animate next one
        animateFlightLine();
      } else {
        // increment counter
        count += stepSize;
        // move icon
        currentPlaneIcon.offset = count + '%';
        currentPlaneLine.set('icons', [currentPlaneIcon]);
        // do next animation tick
        setTimeout(function () {
          animateCurrentPlane(currentPlaneLine, count);
        }, frameInterval);
      }
    }

    // select random flight line and move plane over this line
    function animateFlightLine () {
      var currentPlaneLine = flightLines[getRandomInt(0, flightLines.length - 1)];

      setTimeout(function () {
        animateCurrentPlane(currentPlaneLine);
      }, getRandomInt(intervalMin, intervalMax));
    }

    // start animation
    animateFlightLine();

    return true;
  }
};

module.exports = Lines;
