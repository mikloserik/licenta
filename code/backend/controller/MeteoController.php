<?php

require_once "model/T2m.php";
require_once "model/Sp.php";
require_once "model/Uv.php";
require_once "model/Tcwv.php";

class MeteoController
{
	public function getT2mAction()
	{
		session_start();

		$t2m = new T2mCollection();
		$collection = $t2m->loadAll();

		$result = array();

		foreach ($collection as $data) {
			$result[] = array(
		        	"id" => $data->getId(), 
		        	"t2m" => $data->getT2m(),
		        	"lat" => $data->getLat() + mt_rand() / mt_getrandmax() / 2,
		        	"lon" => $data->getLon() + mt_rand() / mt_getrandmax() / 2,
		        );
		}

		return json_encode($result);
	}

	public function getAllAction()
	{
		session_start();

		$meteoFactory = new MeteoDataCollectionFactory();
		$t2mCollection = $meteoFactory->createCollection("T2m")->loadAll();
		$uvCollection = $meteoFactory->createCollection("Uv")->loadAll();
		$spCollection = $meteoFactory->createCollection("Sp")->loadAll();
		$tcwvCollection = $meteoFactory->createCollection("Tcwv")->loadAll();

		$result = array();

		foreach ($t2mCollection as $key => $data) {
			$result[] = array(
		        	"id" => $data->getId(), 
		        	"t2m" => $data->getT2m(),
		        	"sp" => $spCollection[$key]->getSp(),
		        	"uv" => $uvCollection[$key]->getUv(),
		        	"tcwv" => $tcwvCollection[$key]->getTcwv(),
		        	"lat" => $data->getLat() + mt_rand() / mt_getrandmax() / 2,
		        	"lon" => $data->getLon() + mt_rand() / mt_getrandmax() / 2,
		        );
		}
		

		return json_encode($result);
	}
}