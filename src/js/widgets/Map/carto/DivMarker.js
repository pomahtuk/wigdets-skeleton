var DivMarker;

// set prototype
DivMarker.prototype = new google.maps.OverlayView();

/** @constructor */
function DivMarker(params) {
  // params
  //  - map
  //  - content
  //  - className
  //  - latlng
  this.latlng_ = params.latlng || new google.maps.LatLng(90, -90);
  this.map_ = params.map;
  this.content_ = params.content;
  this.className_ = params.className;

  // Define a property to hold the marker's div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null;

  // Explicitly call setMap on this overlay
  this.setMap(this.map_);
}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
DivMarker.prototype.onAdd = function() {

  var div = document.createElement('div');
  div.style.position = 'absolute';
  div.className = this.className_;

  // Create the img element and attach it to the div.
  div.innerHTML = this.content_;

  this.div_ = div;

  // click support
  google.maps.event.addDomListener(this.div_, 'click', (function(e) {
    google.maps.event.trigger(this, 'click', e);
  }).bind(this));

  // Add the element to the "overlayMouseTarget" pane.
  var panes = this.getPanes();
  if (panes) {
    panes.overlayMouseTarget.appendChild(this.div_);
  }
};

DivMarker.prototype.draw = function() {
  var overlayProjection = this.getProjection();

  // We use the south-west and north-east
  // coordinates of the overlay to peg it to the correct position and size.
  // To do this, we need to retrieve the projection from the overlay.
  var overlayProjection = this.getProjection();
  var point = overlayProjection.fromLatLngToDivPixel(this.latlng_);

  if (point) {
    this.div_.style.left = (point.x - (this.div_.offsetWidth) / 2) + 'px';
    this.div_.style.top = (point.y - this.div_.offsetHeight) + 'px';
  }
};

DivMarker.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
};

// Set the visibility to 'hidden' or 'visible'.
DivMarker.prototype.hide = function() {
  if (this.div_) {
    // The visibility property must be a string enclosed in quotes.
    this.div_.style.visibility = 'hidden';
  }
};

DivMarker.prototype.show = function() {
  if (this.div_) {
    this.div_.style.visibility = 'visible';
  }
};

DivMarker.prototype.getPosition = function() {
  return this.latlng_;
};

module.exports = DivMarker;
