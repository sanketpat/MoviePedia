<?php
// Including database connections
require_once 'database_connections.php';

$movieId = json_decode(file_get_contents("php://input"));

// mysqli query to fetch all data from database
	$query = "SELECT * from view_name ORDER BY title ASC";
	$result = mysqli_query($con, $query);
	if(mysqli_num_rows($result) != 0) {
		$row = mysqli_fetch_assoc($result));
	}
// Return json array containing data from the databasecon
echo $json_info = json_encode($row);
?>