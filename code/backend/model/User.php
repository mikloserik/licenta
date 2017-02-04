<?php

require_once "model/Connection.php";

class User
{
	private $id;
	private $username = NULL;
	private $password;
	private $firstName;
	private $lastName;
	private $email = NULL;

	public function setId($id)
	{
		$this->id = $id;
	}

	public function getId()
	{
		return $this->id;
	}

	public function setUsername($data)
	{
		$this->username = $data;
	}

	public function getUsername()
	{
		return $this->username;
	}

	public function setPassword($data)
	{
		$this->password = $data;
	}

	public function getPassword()
	{
		return $this->password;
	}

	public function setFirstName($data)
	{
		$this->firstName = $data;
	}

	public function getFirstName()
	{
		return $this->firstName;
	}

	public function setLastName($data)
	{
		$this->lastName = $data;
	}

	public function getLastName()
	{
		return $this->lastName;
	}

	public function setEmail($data)
	{
		$this->email = $data;
	}

	public function getEmail()
	{
		return $this->email;
	}

	public function loadByUsername($username)
	{
		$c = Connection::getInstance();
		$conn = $c->getConnection();

		$sql = "SELECT *  FROM user WHERE username='" . $username . "';";
		$result = $conn->query($sql);
		$row = $result->fetch_assoc();

		if ($row) {
			$this->id = $row['id'];
			$this->username = $row['username'];
			$this->password = $row['password'];
			$this->firstName = $row['first_name'];
			$this->lastName = $row['last_name'];
			$this->email = $row['email'];
		}
	}

	public function loadByEmail($email)
	{
		$c = Connection::getInstance();
		$conn = $c->getConnection();;

		$sql = "SELECT *  FROM user WHERE email='" . $email . "';";
		$result = $conn->query($sql);
		$row = $result->fetch_assoc();

		if ($row) {
			$this->id = $row['id'];
			$this->username = $row['username'];
			$this->password = $row['password'];
			$this->firstName = $row['first_name'];
			$this->lastName = $row['last_name'];
			$this->email = $row['email'];
		}
	}

	public function save()
	{
		$c = Connection::getInstance();
		$conn = $c->getConnection();

		$sql = "INSERT INTO user (username, password, email, first_name, last_name) VALUES 
			('" . $this->username . "',
			'" . $this->password . "',
			'" . $this->email . "',
			'" . $this->firstName . "',
			'" . $this->lastName . "');";
		if ($conn->query($sql) === TRUE) {
			return;
		} else {
		    die("Error: " . $sql . "<br>" . $conn->error);
		}
	}

	public function getLocations()
	{
		$c = Connection::getInstance();
		$conn = $c->getConnection();

		$locations = array();

		$sql = "SELECT *  FROM user_location WHERE user_id='" . $this->id . "';";
		$result = $conn->query($sql);

		while ($row = $result->fetch_assoc()) {
			$locations[] = $row;
		}

		return $locations;
	}

	public function addLocation($location)
	{
		$c = Connection::getInstance();
		$conn = $c->getConnection();

		$sql = "INSERT INTO user_location (user_id, longitude, latitude, name) VALUES 
			('" . $this->id . "',
			'" . $location['longitude'] . "',
			'" . $location['latitude'] . "',
			'" . $location['name'] . "');";
		if ($conn->query($sql) === TRUE) {
			return;
		} else {
		    die("Error: " . $sql . "<br>" . $conn->error);
		}
	}
}