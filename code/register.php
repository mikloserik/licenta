<?php

$errors = array();

$data = $_POST;

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "licenta";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function validateData($data)
{
	$errors = array();

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
		echo json_encode($errors);
		return false;
	}

  	return $data;
}
 

if (!($data = validateData($data))) {
	return;
}

$sql = "SELECT COUNT(id)  FROM user WHERE username='" . $data['username'] . "';";
$result = $conn->query($sql);
$result = $result->fetch_assoc()['COUNT(id)'];

if ($result !== "0") {
	$errors['error-username'] = "This username already exists.";
	echo json_encode($errors);
	return;
}

$sql = "SELECT COUNT(id)  FROM user WHERE email='" . $data['email'] . "';";
$result = $conn->query($sql);
$result = $result->fetch_assoc()['COUNT(id)'];

if ($result !== "0") {
	$errors['error-email'] = "This email adderess is already registred.";
	echo json_encode($errors);
	return;
}

$sql = "INSERT INTO user (username, password, email, first_name, last_name) VALUES 
	('" . $data['username'] . "',
	'" . password_hash($data['password'], PASSWORD_DEFAULT) . "',
	'" . $data['email'] . "',
	'" . $data['first_name'] . "',
	'" . $data['last_name'] . "');";
if ($conn->query($sql) === TRUE) {

} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

echo "OK";

return;