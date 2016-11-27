<?php
// Including database connections
require_once 'database_connections.php';
// Fetching the updated data & storin in new variables
$data = json_decode(file_get_contents("php://input"));
// Escaping special characters from updated data
$id = mysqli_real_escape_string($con, $data->emp_id);
$name = mysqli_real_escape_string($con, $data->emp_name);
$email = mysqli_real_escape_string($con, $data->emp_email);
$gender = mysqli_real_escape_string($con, $data->emp_gender);
$address = mysqli_real_escape_string($con, $data->emp_address);
// mysqli query to insert the updated data
$query = "UPDATE emp_details SET emp_name='$name',emp_email='$email',emp_gender='$gender',emp_address='$address' WHERE emp_id=$id";
mysqli_query($con, $query);
echo true;
?>