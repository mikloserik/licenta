<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "licenta";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "SELECT tcwv.id, tcwv.value, latitude.lat, longitude.lon FROM tcwv LEFT JOIN latitude ON tcwv.lat_id = latitude.id LEFT JOIN longitude ON tcwv.lon_id = longitude.id";
	$result = $conn->query($sql);
	$results = array();

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	        $results[] = array(
	        	"id" => $row["id"], 
	        	"value" => $row["value"],
	        	"lat" => $row["lat"] + mt_rand() / mt_getrandmax(),
	        	"lon" => $row["lon"] + mt_rand() / mt_getrandmax(),
	        );
	    }
	} 

	$conn->close();

	//var_dump(json_encode($results));

	echo json_encode($results);

	return json_encode($results);
?>