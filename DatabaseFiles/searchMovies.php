<?php
// Including database connections
require_once 'database_connections.php';

$data = json_decode(file_get_contents("php://input"));
// Escaping special characters from submitting data & storing in new variables.
$selectedSearchByOption = mysqli_real_escape_string($con, $data->selectedSearchByOption);
$searchString = mysqli_real_escape_string($con, $data->searchString);
$selectedYear = mysqli_real_escape_string($con, $data->selectedYear);
$minRating = $data->minRating;
$maxRating = $data->maxRating;
$selectedGenre = mysqli_real_escape_string($con, $data->selectedGenre);
$offset = $data->offset;
$noOfRows = $data->noOfRows;

//echo $selectedGenre;

// mysqli query to fetch all data from database
//	$query = "CALL search_movie_count('$selectedSearchByOption', '$searchString', '$selectedYear', $minRating, $maxRating, '$selectedGenre')";
//	$result = mysqli_query($con, $query);
//
//	//$arr = array();
//	$row = "";
//
//	if(mysqli_num_rows($result) != 0) {
//		//while($row = mysqli_fetch_assoc($result)) {
//		//$arr[] = $row;
//		//}
//		
//		$row = mysqli_fetch_assoc($result);
//	}
//// Return json array containing data from the databasecon
////echo $json_info = json_encode($arr);
//echo $row;

try {
    $dbh = new PDO('mysql:dbname=adproject4_1;host=127.0.0.1', 'root', '');
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

$stmt = $dbh->prepare("CALL search_movie(?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bindParam(1, $selectedSearchByOption, PDO::PARAM_STR); 
$stmt->bindParam(2, $searchString, PDO::PARAM_STR); 
$stmt->bindParam(3, $selectedYear, PDO::PARAM_STR); 
$stmt->bindParam(4, $minRating, PDO::PARAM_STR); 
$stmt->bindParam(5, $maxRating, PDO::PARAM_STR); 
$stmt->bindParam(6, $selectedGenre, PDO::PARAM_STR); 
$stmt->bindParam(7, $offset, PDO::PARAM_STR); 
$stmt->bindParam(8, $noOfRows, PDO::PARAM_STR); 
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo $json_info = json_encode($result);
?>
