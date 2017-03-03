var overlay,
        center = new google.maps.LatLng(48.856614, 2.352222),
        places = new google.maps.LatLng(48.855083, 2.347158);

function latLng2Point(latLng, map) {
  var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
  var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
  var scale = Math.pow(2, map.getZoom());
  var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
  return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}

USGSOverlay.prototype = new google.maps.OverlayView();

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: center,
  });
  overlay = new USGSOverlay(map);
}

/** @constructor */
function USGSOverlay(map) {
  this.map_ = map;

  // Define a property to hold the div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null;

  // Explicitly call setMap on this overlay
  this.setMap(map);
}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
USGSOverlay.prototype.onAdd = function() {

  var div = document.createElement('div');
  div.classList.add('speechBubble');

  var paragraph = document.createTextNode('Talkeetna');
  div.appendChild(paragraph);

  this.div_ = div;

  // Add the element to the "overlayImage" pane.
  var panes = this.getPanes();
  panes.overlayImage.appendChild(this.div_);
};

USGSOverlay.prototype.draw = function() {
  var coordinates = latLng2Point(places, this.map_);
  this.div_.style.left = coordinates.x +"px";
  this.div_.style.top = coordinates.y +"px";
};

google.maps.event.addDomListener(window, 'load', initMap);