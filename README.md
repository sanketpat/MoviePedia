# MoviePedia

__Description__: MoviePedia is a web application which helps to search for a movie using combinations of multiple search criteria. Being the part of Applied Database course it demands the use of large dataset, database normalization, and use of database concepts like joins, subqueries, dynamic queries, procedures, triggers, and indexes. In order to fetch and display records in chunks, pagination was implemented using procedures.

__Technologies__: AngularJS, Bootstrap, PHP and MySQL

__Responsibilities__:

 - To prepare a big data set having at least 1 million rows (2GB).
 - Normalization of the database to 3NF.
 - Implementation of the user interface.
 - Implement database query optimization techniques
 - Implementation of procedures, dynamic queries, triggers, indexes to data retrieval as per search criteria.

__Instructions__:

 - Create database 'moviepedia'
 - Execute sql script present at 
 	https://drive.google.com/file/d/0B1_8RGus6Kb5czBaOERfbGxLdWs/view
  
  - Edit datbase_connection from DatabaseFiles folder to as follow
  
	`$con = mysqli_connect("localhost", _username_, _password_, "moviepedia"); 

- Go to C:/wamp(64) folder/alias
- Create test.conf file (you can give any name)
- Copy paste following line into the test.conf file
	```
	Alias / "_path_of_project_root_/" 
	<Directory "_path_of_project_root_/">
		Options Indexes FollowSymLinks
		AllowOverride all
		<IfDefine APACHE24>
			Require local
		</IfDefine>
		<IfDefine !APACHE24>
			Order Deny, Allow
			Deny from all
			Allow from localhost ::1 127.0.0.1
		</IfDefine>
	</Directory>
	```
- Start wamp server
- Hit localhost from web browser

__Project Demo Video__:
https://drive.google.com/file/d/0Bxp8h8G43L5NMEVlV19FUWhmdUk/view?usp=sharing

__Contributors__: Atul Banwar, Sanket Patil, Sharath Chandrika Mummoju
