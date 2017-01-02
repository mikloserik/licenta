<?php

function clusterKMeans(array $markers, $zoom) 
{
	$clusters = array();
	$k = $zoom * $zoom * $zoom;
	$n = sizeof($markers);

	for ($i = 0; $i < $k; $i++) {
		$ii = mt_rand(0, $n-$i);
		//*
		$clusters[] = $markers[$ii];
		/*/
		$aux = $markers[$ii];
		$aux['avg_value'] = $markers[$ii]['value'];
		$aux['avg_lon'] = $markers[$ii]['lon'];
		$aux['avg_lat'] = $markers[$ii]['lat'];
		$aux['mn'] = 1;
		$clusters[] = $aux;
		//*/
		unset($markers[$ii]);
		$markers[$ii] = $markers[$n-$i-1];
	}

	foreach ($markers as $markerKey => $marker) {
		$cKey = getNearestCentroid($clusters, $marker);
		//*
		$clusters[$cKey]['markers'][] = $marker;
		/*/
		$clusters[$cKey]['avg_value'] += $marker['value'];
		$clusters[$cKey]['avg_lon'] += $marker['lon'];
		$clusters[$cKey]['avg_lat'] += $marker['lat'];
		$clusters[$ckey]['mn']++;
		//*/
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
		/*/
		$clusters[$key]['value'] =  $clusters[$key]['avg_value'] / $clusters[$key]['mn'];
		$clusters[$key]['lat'] =  $clusters[$key]['avg_lat'] / $clusters[$key]['mn'];
		$clusters[$key]['lon'] =  $clusters[$key]['avg_lon'] / $clusters[$key]['mn'];
		unset($clusters[$key]['avg_value']);
		unset($clusters[$key]['avg_lon']);
		unset($clusters[$key]['avg_lat']);
		unset($clusters[$key]['mn']); 
		//*/
	}

	return $clusters;
}

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

function distance(array $a,array $b)
{
	$latD = abs($a['lat'] - $b['lat']);
	$lonD = abs($a['lon'] - $b['lon']);

	return sqrt($latD * $latD + $lonD * $lonD);
}