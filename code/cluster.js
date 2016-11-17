
const LAT_MIN = 33;
const LAT_MAX = 74;
const LON_MIN = -27;
const LON_MAX = 45;
var clusters = [];

function clusterKMeans() {
	var k =  Math.pow(map.getZoom(), map.getZoom() / 2);
	var n = markers.length;

	clusters.length = 0;
	clusters = [];

	//generate centroids grid
	k = Math.round(Math.sqrt(k));
	for (var i=0; i < k; i++) {
		for ( var ii=0; ii < k; ii++ ) {
			clusters.push({lon: 0, lat: 0, value: 0, markers: []});
			clusters[i*k+ii].lon = LON_MIN + (LON_MAX - LON_MIN) / (k+1) * (i+1);
			clusters[i*k+ii].lat = LAT_MIN + (LAT_MAX - LAT_MIN) / (k+1) * (ii+1);
		}
	}

	/*for (var i=0; i < clusters.length; i++) {
		if ( isMarkerInContainer(clusters[i].lon, clusters[i].lat) == false) {
			clusters.splice(i, 1);
			i--;
		}
	}*/

	for ( var i=0; i < markers.length; ++i ) 
  	{
  		if ( isMarkerInContainer(markers[i].lon, markers[i].lat) == true) {
    		var cKey = getNearestCentroid(i);
    		clusters[cKey].markers.push(markers[i]);
    	}
  	}

  	for ( var i=0; i < clusters.length; i++)
  	{
  		var avgLon = 0;
  		var avgLat = 0;
  		var avgVal = 0;
  		if (clusters[i].markers.length > 0) {
  			for (var ii=0; ii < clusters[i].markers.length; ++ii ) {
  				avgLon += clusters[i].markers[ii].lon;
  				avgLat += clusters[i].markers[ii].lat;
  				avgVal += parseFloat(clusters[i].markers[ii].value);
  			}
  			clusters[i].lon = avgLon/clusters[i].markers.length;
  			clusters[i].lat = avgLat/clusters[i].markers.length;
  			clusters[i].value = avgVal/clusters[i].markers.length;
  			delete clusters[i].markers;
  		} else {
  			clusters.splice(i, 1);
  			i--;
  		}
  	}
}

function getNearestCentroid(i) {
	minD = 1000;
	minCKey = null;
	for(var ii=0; ii < clusters.length; ++ii) {
		latD = Math.abs(markers[i].lat - clusters[ii].lat);
		lonD = Math.abs(markers[i].lon - clusters[ii].lon);

		d = Math.sqrt(latD * latD + lonD * lonD);
		
		if(d < minD){
			minD = d;
			minCKey = ii;
		}
	}

	return minCKey;
}

function isMarkerInContainer(lon, lat) {
	bounds = map.getBounds();
	aux = true;

	if (lon < bounds._southWest.lng || lon > bounds._northEast.lng) {
		aux = false;
	}
	if (lat < bounds._southWest.lat || lat > bounds._northEast.lat) {
		aux = false;
	}

	return aux;
}