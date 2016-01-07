var firstMap;
var secondMap;
var coords = [0, 0];
var initMap = function() {
  console.log('init function fired');
  //we initialize two maps
  firstMap = new google.maps.Map(document.getElementById('firstMap'), {
    center: {lat: 37.784, lng: -122.409},
    zoom: 14
    });
  secondMap = new google.maps.Map(document.getElementById('secondMap'), {
    center: {lat: 37.784, lng: -122.409},
    zoom: 14
    });
  console.log('map elements initialized');

  //we use built-in methods to listen for UI events
  google.maps.event.addListener(firstMap, 'click', function(event) {
    addMarker(event.latLng, firstMap);
    coords.push([event.latLng.lat(), event.latLng.lng()]);
  });

  google.maps.event.addListener(secondMap, 'click', function(event) {
    addMarker(event.latLng, secondMap);
    coords.push([event.latLng.lat(), event.latLng.lng()]);
  });

  var addMarker = function(location, map) {
    var marker = new google.maps.Marker({
      position: location,
      label: 'A',
      map: map
    });
  };
};

// var spatioTemporalDist = function(firstRoute, secondRoute, firstTime, secondTime) {
//   var sourceDist = google.maps.geometry.spherical.computeDistanceBetween(firstRoute[0], secondRoute[0]);
//   var destDist = google.maps.geometry.spherical.computeDistanceBetween(firstRoute[1], secondRoute[1]);
//   console.log(false);
// };

//I think this serves the same purpose as the 2nd script on my html page
// google.maps.event.addDomListener(window, 'load', initialize);
