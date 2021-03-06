<?php

abstract class MeteoData
{
	protected $id;

	protected $lon;
	protected $lat;

	public function setId($id)
	{
		$this->id = $id;
	}

	public function getId()
	{
		return $this->id;
	}

	public function setLon($lon)
	{
		$this->lon = $lon;
	}

	public function getLon()
	{
		return $this->lon;
	}

	public function setLat($lat)
	{
		$this->lat = $lat;
	}

	public function getLat()
	{
		return $this->lat;
	}
}

class MeteoDataCollectionFactory
{
	public function createCollection($classname)
	{
		switch ($classname)
		{
			case "T2m":
				$collection = new T2mCollection();
				break;
			case "Sp":
				$collection = new SpCollection();
				break;
			case "Uv":
				$collection = new UvCollection();
				break;
			case "Tcwv":
				$collection = new TcwvCollection();
				break;
			default:
				$collection = null;
		}

		return $collection;
	}
}