<?php
include "connection.php";

$table = $_GET['table'];
$value = $_GET['value'];
$col = $_GET['col'];

if($table === 'sensors'){
	$query = "SELECT * FROM $table WHERE $col='$value' ORDER BY timestamp DESC LIMIT 5";
}
else{
	$query = "SELECT * FROM $table WHERE $col='$value'";	
}

$stream = $conn->query($query);
$data = array();

if ($stream->num_rows > 0) {
    // output data of each row
    while($row = $stream->fetch_assoc()) {
        $data[]=$row;
    }
} else {
    echo "0 results";
}

$conn->close();
echo json_encode($data);



?>