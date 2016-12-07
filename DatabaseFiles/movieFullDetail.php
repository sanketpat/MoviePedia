<?php
// Including database connections
require_once 'database_connections.php';

$movieId = file_get_contents("php://input");

try {
    $dbh = new PDO('mysql:dbname=adproject4;host=127.0.0.1', 'root', '');
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

$stmt = $dbh->prepare("CALL movie_detail_data(?)");
$stmt->bindParam(1, $movieId, PDO::PARAM_STR); 
$stmt->execute();

$result = $stmt->fetch(PDO::FETCH_ASSOC);

echo $json_info = json_encode($result);
?>