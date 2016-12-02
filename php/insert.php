<?php
include "connection.php";

$table = $_GET['table'];

$data=json_decode(file_get_contents("php://input"), true);

$keys = array_keys($data);
$sql = NULL;

switch($table){
	case "usertable": 
		$sql = "INSERT INTO usertable (username, password)
		VALUE (".$data["username"].",".$data["password"].")";
		break;
	case "limits": 
		$sql = "INSERT INTO limits (tank, sensor, min, max, action)
		VALUE ('".$data["tank"]."','".$data["sensor"]."',".$data["min"].",".$data["max"].",'".$data["action"]."')";
		break;
	default: break;
}

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

/*
for($i = 0; $i < sizeof($keys); $i++){
	echo("Keys: ".$keys[$i]."\tValue: ".$data[$keys[$i]]);
}

$sql = "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('John', 'Doe', 'john@example.com')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
*/
?>