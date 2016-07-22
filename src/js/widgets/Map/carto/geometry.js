Geometry = {
  getBounds: function (markersArray) {
    var bounds = new google.maps.LatLngBounds(),
      i;

    for (i = 0; i < markersArray.length; i++) {
      bounds.extend(markersArray[i].getPosition());
    }

    return bounds;
  }
}

module.exports = Geometry;
