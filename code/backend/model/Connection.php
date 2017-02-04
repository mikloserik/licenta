<?php 

class Connection
{
	private $servername = "localhost";
	private $username = "root";
	private	$password = "root";
	private	$dbname = "licenta";
	private $conn;
	private static $instance = null;

	public function __construct()
	{
		
	}

	public function getConnection(){
		return new mysqli($this->servername, $this->username, $this->password, $this->dbname);
	}

	public static function getInstance()
    {
        if (!isset(static::$instance)) {
            static::$instance = new static;
        }
        return static::$instance;
    }
}