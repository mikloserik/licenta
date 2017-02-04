
const LAT_MIN = -90;
const LAT_MAX = 90;
const LON_MIN = -180;
const LON_MAX = 180;
var clusters = [];

function clusterKMeans() {
	clusters.length = 0;
	clusters = [];

	var bounds = map.getBounds();

	var k = 1;
	switch (map.getZoom()){
		case 3 : 
			k = 5;
			break;
		case 4 : 
			k = 7;
			break;
		case 5 : 
			k = 8;
			break;
		case 6 : 
			k = 9;
		    break;
		case 7 : 
			k = 12;
			break;
		case 8 : 
			k = 15;
			break;
		case 9 : 
			k = 15;
			break;
		case 10 : 
			k = 16;
			break;
		default :
			k=1;
	}

	var lon_min = bounds._northEast.lng;
	var lon_max = bounds._southWest.lng;
	var lat_min = bounds._northEast.lat;
	var lat_max = bounds._southWest.lat;

	for (var i=0; i < k; i++) {
		for ( var ii=0; ii < k; ii++ ) {
			clusters.push({lon: 0, lat: 0, t2m: 0, sp: 0, uv: 0, tcwv: 0, markers: []});
			clusters[i*k+ii].lon = lon_min + (lon_max - lon_min) / (k+1) * (i+1);
			clusters[i*k+ii].lat = lat_min + (lat_max - lat_min) / (k+1) * (ii+1);
		}
	}

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
  		var avgT2m = 0;
  		var avgSp = 0;
  		var avgUv = 0;
  		var avgTcwv = 0;
  		if (clusters[i].markers.length > 0) {
  			for (var ii=0; ii < clusters[i].markers.length; ++ii ) {
  				avgLon += clusters[i].markers[ii].lon;
  				avgLat += clusters[i].markers[ii].lat;
  				avgT2m += parseFloat(clusters[i].markers[ii].t2m);
  				avgSp += parseFloat(clusters[i].markers[ii].sp);
  				avgUv += parseFloat(clusters[i].markers[ii].uv);
  				avgTcwv += parseFloat(clusters[i].markers[ii].tcwv);
  			}
  			clusters[i].lon = avgLon/clusters[i].markers.length;
  			clusters[i].lat = avgLat/clusters[i].markers.length;
  			clusters[i].t2m = avgT2m/clusters[i].markers.length;
  			clusters[i].sp = avgSp/clusters[i].markers.length;
  			clusters[i].uv = avgUv/clusters[i].markers.length;
  			clusters[i].tcwv = avgTcwv/clusters[i].markers.length;
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