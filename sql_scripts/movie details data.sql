drop procedure if exists movie_detail_data;

DELIMITER //
CREATE PROCEDURE movie_detail_data(IN movie_id varchar(50))
 BEGIN
 select imdb_id, title, released, runtime, plot, awards, poster, metascore, imdb_rating, imdb_votes, 

(select r.name from rated r where r.id in ( select rl.rated_id from movie_rated_link rl join movie m on rl.imdb_id=m.imdb_id and m.imdb_id=movie_id)) as rated,

(select group_concat(g.name separator ', ') from genre g where g.id in ( select gl.genre_id from movie_genre_link gl join movie m on gl.imdb_id=m.imdb_id and m.imdb_id=movie_id)) as genre,

(select p.name from people p where p.id in ( select d.director_id from movie_director d join movie m on d.imdb_id = m.imdb_id and m.imdb_id=movie_id)) as director,

(select group_concat(p.name separator ', ') from people p where p.id in ( select a.actor_id from movie_actor a join movie m on a.imdb_id = m.imdb_id and m.imdb_id=movie_id)) as actor,

(select group_concat(p.name separator ', ') from people p where p.id in ( select w.writer_id from movie_writer w join movie m on w.imdb_id = m.imdb_id and m.imdb_id=movie_id)) as writer,

(select l.name from language l where l.id in ( select ll.language_id from movie_language_link ll join movie m on ll.imdb_id=m.imdb_id and m.imdb_id=movie_id)) as language,

(select c.name from country c where c.id in ( select cl.country_id from movie_country_link cl join movie m on cl.imdb_id=m.imdb_id and m.imdb_id=movie_id)) as country

from movie where imdb_id= movie_id;
 END //
DELIMITER ;

call movie_detail_data('tt0000001');