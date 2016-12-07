
drop procedure if exists search_movie_count;
DELIMITER //
CREATE PROCEDURE search_movie_count(
	filtername varchar(255),
    search_keyword varchar(255),
    release_year varchar(255),
    min_rating decimal(3,1),
    max_rating decimal(3,1),
    genre varchar(255))
BEGIN

	DECLARE no_title INT DEFAULT 0;
	SET @select_query= "SELECT count(*) as count FROM movie where 1=1";
    SET @keyword = search_keyword;
    
    IF filtername IS NOT NULL AND search_keyword IS NOT NULL THEN
		IF filtername = 'title' THEN
			SET @select_query = CONCAT(@select_query," AND Title like '%",search_keyword,"%'");
		ELSE
			SET no_title=1;
		END IF;
	END IF;
    
    IF release_year IS NOT NULL and release_year != '' THEN
		SET @select_query= CONCAT(@select_query," AND released like '%", release_year,"%'");
    END IF;
    
    IF min_rating IS NOT NULL AND max_rating IS NOT NULL THEN
			SET @select_query = CONCAT(@select_query," AND CAST(imdb_rating AS DECIMAL(3,1)) BETWEEN ", min_rating ," AND ", max_rating);
    END IF;
    
    IF no_title=1 THEN
		IF filtername='country' OR filtername='language' THEN
                SET @select_query = CONCAT(@select_query, " AND imdb_id in (SELECT imdb_id from movie_",filtername,"_link where ",filtername,"_id in(SELECT id FROM ",filtername," where name like '%",search_keyword, "%'))");
         ELSEIF filtername='actor' OR filtername='write' OR filtername='director' THEN
				SET @select_query = CONCAT(@select_query, " AND imdb_id in (SELECT imdb_id from movie_",filtername," where ",filtername,"_id in(SELECT id FROM people where name like '%",search_keyword, "%'))");
			END IF;	
	END IF;
    
	/* IF genre IS NOT NULL THEN
		SET @select_query = CONCAT(@select_query, " AND imdb_id in (SELECT imdb_id from movie_genre_link where genre_id in (SELECT id FROM genre where name ='",genre,"'))");
	END IF;*/
    
    -- SELECT @select_query;
    
	PREPARE stmt FROM @select_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END;
//