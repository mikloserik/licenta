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

	if ($data['username'] == "") {
  		$errors['error-username'] = "Username is required."; 
	}
	if ($data['password'] == "") {
  		$errors['error-password'] = "Password is required."; 
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

if ($result == "0") {
	$errors['error-username'] = "Username is incorect.";
	echo json_encode($errors);
	return;
}

$sql = "SELECT password  FROM user WHERE username='" . $data['username'] . "';";
$result = $conn->query($sql);
$result = $result->fetch_assoc()['password'];

if (!password_verify($data['password'],$result)) {
	$errors['error-password'] = "Username or Password is incorect..";
	echo json_encode($errors);
	return;
}

echo "OK";

return;