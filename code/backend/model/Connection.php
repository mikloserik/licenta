<?php 

class Connection
{
	private $servername = "localhost";
	private $username = "root";
	private	$password = "root";
	private	$dbname = "licenta";
	private $conn;

	public function __construct()
	{
		// Create connection
		$this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
		// Check connection
		if ($this->conn->connect_error) {
		    die("Connection failed: " . $this->conn->connect_error);
		}
	}

	public function getConnection(){
		return $this->conn;
	}
}