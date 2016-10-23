
const LAT_MIN = 33;
const LAT_MAX = 74;
const LON_MIN = -27;
const LON_MAX = 45;

function clusterKMeans() {
	var clusters = [];

	var k =  map.getZoom() *  map.getZoom();
	var n = markers.length;

	

	//select centroids randomly
	for ( var i=0; i < k; ++i ) {
		var ii = Math.round(Math.random()*(n-i));
		clusters.push(markers[ii]);
		markers[ii] = markers[n-i+1];
	} 

	//generate centroids grid


	
}

/*
function clusterKMeans($markers, $zoom) 
{
	$clusters = array();
	$k = $zoom * $zoom * $zoom;
	$n = sizeof($markers);

	for ($i = 0; $i < $k; $i++) {
		$ii = mt_rand(0, $n-$i);
		$clusters[] = $markers[$ii];

		unset($markers[$ii]);
		$markers[$ii] = $markers[$n-$i-1];
	}

	foreach ($markers as $markerKey => $marker) {
		$cKey = getNearestCentroid($clusters, $marker);
		$clusters[$cKey]['markers'][] = $marker;

	}

	foreach ($clusters as $key => $cluster) {

		//*
		if (isset($clusters[$key]['markers'])) {
			$mn = sizeof($cluster['markers']);
			$avgValue = 0;
			$avgLat = 0;
			$avgLon = 0;
			foreach($cluster['markers'] as $marker){
				$avgValue += $marker['value'];
				$avgLon += $marker['lon'];
				$avgLat += $marker['lat'];
			}
		
			unset($clusters[$key]['markers']);
		}
	}

	return $clusters;
}
*/
/*
function getNearestCentroid($clusters, $marker) 
{
	$minD = 1000;
	$minCKey = null;
	foreach($clusters as $cKey => $c) {
		$d = distance($c, $marker);
		if($d < $minD){
			$minD = $d;
			$minCKey = $cKey;
		}
	}

	return $minCKey;
}
*/
/*
function distance(array $a,array $b)
{
	$latD = abs($a['lat'] - $b['lat']);
	$lonD = abs($a['lon'] - $b['lon']);

	return sqrt($latD * $latD + $lonD * $lonD);
}
*/