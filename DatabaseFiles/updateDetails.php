<?php
// Including database connections
require_once 'database_connections.php';
// Fetching the updated data & storin in new variables
$data = json_decode(file_get_contents("php://input"));
// Escaping special characters from updated data
$id = mysqli_real_escape_string($con, $data->imdb_id);
$title = mysqli_real_escape_string($con, $data->title);
$released = mysqli_real_escape_string($con, $data->released);
$runtime = mysqli_real_escape_string($con, $data->runtime);
$plot = mysqli_real_escape_string($con, $data->plot);
$awards = mysqli_real_escape_string($con, $data->awards);
$poster = mysqli_real_escape_string($con, $data->poster);
$metascore = mysqli_real_escape_string($con, $data->metascore);
$imdbRating = mysqli_real_escape_string($con, $data->imdb_rating);
$imdbVotes = mysqli_real_escape_string($con, $data->imdb_votes);
// mysqli query to insert the updated data
$query = "UPDATE movie SET title='$title',released='$released',runtime='$runtime', plot='$plot', awards='$awards', poster='$poster', metascore='$metascore', imdb_rating='$imdbRating', imdb_votes='$imdbVotes' WHERE imdb_id='$id'";
mysqli_query($con, $query);
echo true;
echo $query;
?>
