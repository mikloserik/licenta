<?php

require_once "model/MeteoData.php";
require_once "model/Connection.php";

class Sp extends MeteoData
{
	private $sp;

	public function setSp($data)
	{
		$this->sp = $data;
	}

	public function getSp()
	{
		return $this->sp;
	}
}

class SpCollection
{
	public function loadAll()
	{
		$spCollection = array();

		$c = Connection::getInstance();
		$conn = $c->getConnection();
		
		$sql = "SELECT sp.id, sp.value as spv, sp.latitude, sp.longitude FROM sp;";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
		    // output data of each row
		    while($row = $result->fetch_assoc()) {
		    	if($row["longitude"] > 180) {
		    		$row["longitude"] -= 360;
		    	}

		        $data = new Sp();
		        $data->setId($row["id"]);
		        $data->setLon($row["longitude"]);
		        $data->setLat($row["latitude"]);
		        $data->setSp($row["spv"]);

		        $spCollection[] = $data;
		    }
		}

		$conn->close();

		return $spCollection;
	}
}