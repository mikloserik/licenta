<?php



function clusterKMeans(array $markers, $zoom) 
{
	$clusters = array();
	$k = $zoom * $zoom * $zoom;
	$n = sizeof($markers);

	for ($i = 0; $i < $k; $i++) {
		$ii = mt_rand(0, $n);
		$clusters[] = $markers[$ii];
		unset($markers[$ii]);
	}


	while (sizeof($markers) != 0) { 
		foreach ($clusters as $clusterKey => $cluster) {
			if (sizeof($markers) != 0) {
				$m = getNearestMarker($cluster, $markers);
				$clusters['clusterKey']['markers'][] = $markers[$m];
				unset($markers[$m]);
			}
		}
	}

	foreach ($clusters as $key => $cluster) {
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
		$clusters[$key]["value"] =  $avgValue / $mn;
		$clusters[$key]['lat'] = $avgLat / $mn;
		$clusters[$key]['lon'] = $avgLon / $mn;
	}

	return $clusters;
}

function getNearestMarker($cluster, $markers) 
{
	$minD = 1000;
	$minMKey = null;
	foreach($markers as $mKey => $m) {
		$d = distance($cluster, $m);
		if($d < $minD){
			$minD = $d;
			$minMKey = $mKey;
		}
	}

	return $minMKey;
}

function distance($a, $b)
{
	$latD = abs($a['lat'] - $b['lat']);
	$lonD = abs($a['lon'] - $b['lon']);

	return sqrt($latD * $latD + $lonD * $lonD);
}