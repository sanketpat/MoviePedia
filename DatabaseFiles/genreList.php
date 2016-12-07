<?php
require_once 'database_connections.php';
$data = json_decode(file_get_contents("php://input"));
$query = "SELECT DISTINCT(name) FROM genre";
$result = mysqli_query($con, $query);
$arr = array();
if(mysqli_num_rows($result) != 0) {
  while($row = mysqli_fetch_assoc($result)) {
  $arr[] = $row;
  }
}
// Return json array containing data from the databasecon
echo $json_info = json_encode($arr);
?>
