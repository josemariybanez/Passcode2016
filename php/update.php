<?php
include "connection.php";

$table = $_GET['table'];

$data=json_decode(file_get_contents("php://input"), true);


$sql = "UPDATE $table SET min=".$data["min"].", max=".$data["max"].", action='".$data["action"]."' WHERE tank='".$data["tank"]."' AND sensor='".$data["sensor"]."'";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();

?>