<?php

require_once "model/T2m.php";
require_once "model/Sp.php";
require_once "model/Uv.php";
require_once "model/Tcwv.php";

class MeteoController
{
	public function getT2mAction()
	{
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
		$t2m = new T2mCollection();
		$t2mCollection = $t2m->loadAll();
		$uv = new UvCollection();
		$uvCollection = $uv->loadAll();
		$sp = new SpCollection();
		$spCollection = $sp->loadAll();
		$tcwv = new TcwvCollection();
		$tcwvCollection = $tcwv->loadAll();

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