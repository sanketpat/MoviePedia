<?php
// Including database connections
require_once 'database_connections.php';
// Fetching and decoding the inserted data
$data = json_decode(file_get_contents("php://input"));
// Escaping special characters from submitting data & storing in new variables.
$id = mysqli_real_escape_string($con, $data->movie_id);
$title = mysqli_real_escape_string($con, $data->movie_title);
$released = mysqli_real_escape_string($con, $data->movie_released);
$runtime = mysqli_real_escape_string($con, $data->movie_runtime);
$plot = mysqli_real_escape_string($con, $data->movie_plot);
$awards = mysqli_real_escape_string($con, $data->movie_awards);
$poster = mysqli_real_escape_string($con, $data->movie_poster);
$metascore = mysqli_real_escape_string($con, $data->movie_metascore);
$imdbRating = mysqli_real_escape_string($con, $data->movie_rating);
$imdbVotes = mysqli_real_escape_string($con, $data->movie_votes);

// mysqli insert query
$query = "INSERT into movie (imdb_id, title,released,runtime,plot, awards, poster, metascore, imdb_rating, imdb_votes) VALUES ('$id', '$title','$released','$runtime','$plot', '$awards', '$poster', '$metascore', '$imdbRating', '$imdbVotes')";
// Inserting data into database
mysqli_query($con, $query);
echo true;
?>
