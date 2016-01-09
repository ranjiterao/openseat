function initMap() {

	var geocoder = new google.maps.Geocoder();

	document.getElementById('submit').addEventListener('click', function() {
		geocodeAddress(geocoder, map);
	});
}

function geocodeAddress(geocoder, resultsMap) {
	var address = document.getElementById('address').value;
	geocoder.geocode({
		'address': address
	}, function(results, status) {
		lat = results[0].geometry.location.lat();
		long = results[0].geometry.location.lng();
		console.log(lat, long, 'latitude and longitude');
	});
}