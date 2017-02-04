<?php

require_once "model/MeteoData.php";
require_once "model/Connection.php";

class Tcwv extends MeteoData
{
	private $tcwv;

	public function setTcwv($data)
	{
		$this->tcwv = $data;
	}

	public function getTcwv()
	{
		return $this->tcwv;
	}
}

class TcwvCollection
{
	public function loadAll()
	{
		$tcwvCollection = array();

		$c = Connection::getInstance();
		$conn = $c->getConnection();
		
		$sql = "SELECT tcwv.id, tcwv.value as tcwvv, tcwv.latitude, tcwv.longitude FROM tcwv;";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
		    // output data of each row
		    while($row = $result->fetch_assoc()) {
		    	if($row["longitude"] > 180) {
		    		$row["longitude"] -= 360;
		    	}

		        $data = new Tcwv();
		        $data->setId($row["id"]);
		        $data->setLon($row["longitude"]);
		        $data->setLat($row["latitude"]);
		        $data->setTcwv($row["tcwvv"]);

		        $tcwvCollection[] = $data;
		    }
		}

		$conn->close();

		return $tcwvCollection;
	}
}