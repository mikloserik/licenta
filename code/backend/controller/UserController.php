<?php

require_once "model/User.php";

class UserController
{
	public function loginAction()
	{
		session_start();

		$errors = array();

		$data = $_POST;

		if (!($data = $this->validateLoginData($data, $errors))) {
			return json_encode($errors);
		}

		$user = new User();
		$user->loadByUsername($data['username']);

		if (!$user->getUsername()) {
			$errors['error-username'] = "Username is incorect.";
			return json_encode($errors);
		}

		if (!password_verify($data['password'],$user->getPassword())) {
			$errors['error-password'] = "Username or Password is incorect..";
			return json_encode($errors);
		}

		//set session;
		$_SESSION['username'] = $user->getUsername();
		$_SESSION['user_id'] = $user->getId();

		return "OK";
	}

	public function logoutAction()
	{
		session_start();
		session_unset(); 
		session_destroy();

		return "OK";
	}

	public function registerAction()
	{
		session_start();

		$errors = array();

		$data = $_POST;

		if (!($data = $this->validateRegisterData($data, $errors))) {
			return;
		}

		$user = new User();
		$user->loadByUsername($data['username']);

		if ($user->getUsername()) {
			$errors['error-username'] = "This username already exists.";
			echo json_encode($errors);
			return;
		}

		$user = new User();
		$user->loadByEmail($data['email']);

		if ($user->getEmail()) {
			$errors['error-email'] = "This email adderess is already registred.";
			echo json_encode($errors);
			return;
		}

		$user = new User();

		$user->setUsername($data['username']);
		$user->setPassword(password_hash($data['password'], PASSWORD_DEFAULT));
		$user->setFirstName($data['first_name']);
		$user->setLastName($data['last_name']);
		$user->setEmail($data['email']);

		$user->save();

		return "OK";
	}

	public function getLocationsAction()
	{
		session_start();

		$user = new User();
		$user->loadByUsername($_SESSION['username']);

		return json_encode($user->getLocations());
	}

	public function addLocationAction()
	{
		session_start();

		$location = array(
			"longitude" => $_GET["lon"],
			"latitude" => $_GET["lat"],
			"name" => $_GET["name"]
		);

		$user = new User();
		$user->loadByUsername($_SESSION['username']);

		$user->addLocation($location);

		return "OK";
	}

	private function validateLoginData($data, &$errors)
	{
		foreach ($data as $key => $input) {
			$input = trim($input);
	  		$input = stripslashes($input);
	  		$input = htmlspecialchars($input);
	  		$data[$key] = $input;
		}

		if ($data['username'] == "") {
	  		$errors['error-username'] = "Username is required."; 
		}
		if ($data['password'] == "") {
	  		$errors['error-password'] = "Password is required."; 
		}

		if (!empty($errors)) {
			return false;
		}

	  	return $data;
	}

	private function validateRegisterData($data, &$errors)
	{
		foreach ($data as $key => $input) {
			$input = trim($input);
	  		$input = stripslashes($input);
	  		$input = htmlspecialchars($input);
	  		$data[$key] = $input;
		}

		if (!preg_match("/^[a-zA-Z ]*$/",$data['first_name'])) {
	  		$errors['error-first_name'] = "Only letters and white space allowed"; 
		}
		if ($data['first_name'] == "") {
	  		$errors['error-first_name'] = "First Name is required."; 
		}
		if ($data['last_name'] == "") {
	  		$errors['error-last_name'] = "Last Name is required."; 
		}
		if (!preg_match("/^[a-zA-Z ]*$/",$data['last_name'])) {
	  		$errors['error-last_name'] = "Only letters and white space allowed"; 
		}
		if ($data['username'] == "") {
	  		$errors['error-username'] = "Username is required."; 
		}
		if ($data['password'] == "") {
	  		$errors['error-password'] = "Password is required."; 
		}
		if ($data['email'] == "") {
	  		$errors['error-email'] = "Email is required."; 
		}
		if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
	  		$errors['error-email'] = "Invalid email format"; 
		}

		if (!empty($errors)) {
			return false;
		}

	  	return $data;
	}
}