//assume I have access to the google maps API
//assume I have whatever inputs I need
//assume 4 arrays, all 2ples
  //[start, end] for distances
  //[start, end] for time windows
var spatioTemporalDist = function(firstRoute, secondRoute, firstTime, secondTime) {
  var sourceDist = google.maps.geometry.spherical.computeDistanceBetween(firstRoute[0], secondRoute[0]);
  var destDist = google.maps.geometry.spherical.computeDistanceBetween(firstRoute[1], secondRoute[1]);
  var beginDist = Math.max(firstTime[0] - secondTime[0], secondTime[0] - firstTime[0]);
  var endDist = Math.max(firstTime[1] - secondTime[1], secondTime[1] - firstTime[1]);
  console.log(false);
};