# DB Project Framework HTML-AngularJS-PHP-MYSQL
Information:
 - Moviepedia (Analytical and transactional Web application using IMDB dataset)
 - Web application which deals with large dataset (2GB) to understand and implement database query optimization techniques and other database concepts like Stored procedure, dynamic query, triggers, indexes, views implemented for various features.
 - Technologies: HTML5, AngularJS, PHP, MySQL

Instructions:
  - Create database employee
  - Execute following Create table query :
  CREATE TABLE emp_details (
emp_id int(255) NOT NULL AUTO_INCREMENT,
emp_name varchar(255) NOT NULL,
emp_email varchar(255) NOT NULL,
emp_gender varchar(255) NOT NULL,
emp_address varchar(255) NOT NULL,
PRIMARY KEY (emp_id)
);
  - edit datbase_connection from DatabaseFiles folder to as follow
  $con = mysqli_connect("localhost", _username_, _password_, "employee");  /*employee is database name
- Go to C:/wamp(64) folder/alias
- create test.conf file (you can give any name)
- copy paste following line into the test.conf file
Alias / "_path_of_project_root_/" 
<Directory "_path_of_project_root_/">
   Options Indexes FollowSymLinks
    AllowOverride all
  <IfDefine APACHE24>
    Require local
  </IfDefine>
  <IfDefine !APACHE24>
    Order Deny,Allow
	  Deny from all
	  Allow from localhost ::1 127.0.0.1
	</IfDefine>
</Directory>
- start wamp server
- hit localhost from web browser
