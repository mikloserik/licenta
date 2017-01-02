<?php
	/*$zoom = $_GET["zoom"];
	$alg = $_GET["alg"];*/

	//include "clusterGrid.php";

	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "licenta";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "SELECT t2m.id, t2m.value as t2mv, t2m.latitude, t2m.longitude, sp.value as spv, uv.value as uvv, tcwv.value as tcwvv FROM t2m LEFT JOIN sp ON t2m.id = sp.id LEFT JOIN uv ON t2m.id = uv.id LEFT JOIN tcwv ON t2m.id = tcwv.id;";
	$result = $conn->query($sql);
	$results = array();

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	    	if($row["longitude"] > 180) {
	    		$row["longitude"] -= 360;
	    	}
	        $results[] = array(
	        	"id" => $row["id"], 
	        	//"value" => $row["value"],
	        	"t2m" => $row["t2mv"],
	        	"sp" => $row["spv"],
	        	"uv" => $row["uvv"],
	        	"tcwv" => $row["tcwvv"],
	        	"lat" => $row["latitude"] + mt_rand() / mt_getrandmax() / 2,
	        	"lon" => $row["longitude"] + mt_rand() / mt_getrandmax() / 2,
	        );
	    }
	} 

	$conn->close();

	/*if ($alg == 'server') {
		//$results = clusterKMeans($results, $zoom);
	}*/

	echo json_encode($results);

	return json_encode($results);
?>




















<!--0757056066-->