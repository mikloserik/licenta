<?php

require_once "model/MeteoData.php";
require_once "model/Connection.php";

class T2m extends MeteoData
{
	private $t2m;

	public function setT2m($data)
	{
		$this->t2m = $data;
	}

	public function getT2m()
	{
		return $this->t2m;
	}
}

class T2mCollection
{
	public function loadAll()
	{
		$t2mCollection = array();

		$c = new Connection();
		$conn = $c->getConnection();
		
		$sql = "SELECT t2m.id, t2m.value as t2mv, t2m.latitude, t2m.longitude FROM t2m;";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
		    // output data of each row
		    while($row = $result->fetch_assoc()) {
		    	if($row["longitude"] > 180) {
		    		$row["longitude"] -= 360;
		    	}

		        $data = new T2m();
		        $data->setId($row["id"]);
		        $data->setLon($row["longitude"]);
		        $data->setLat($row["latitude"]);
		        $data->setT2m($row["t2mv"]);

		        $t2mCollection[] = $data;
		    }
		}

		$conn->close();

		return $t2mCollection;
	}
}