<?php
require_once 'database_connections.php';
$data = json_decode(file_get_contents("php://input"));
$query = "DELETE FROM movie WHERE imdb_id='$data->imdb_id'";
mysqli_query($con, $query);
echo true;
echo $query;
?>
