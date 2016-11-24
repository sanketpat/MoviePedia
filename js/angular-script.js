// Application module
var crudApp = angular.module('crudApp',[]);
crudApp.controller("DbController", ['$scope','$http', function($scope,$http){
// Function to get employee details from the database
getInfo();
function getInfo(){
// Sending request to EmpDetails.php files
$http.post('databaseFiles/empDetails.php').success(function(data){
// Stored the returned data into scope
$scope.details = data;
});
}
										
					

// Enabling show_form variable to enable Add employee button
$scope.show_form = true;
// Function to add toggle behaviour to form
$scope.formToggle =function(){
$('#empForm').slideToggle();
$('#editForm').css('display', 'none');
}
$scope.insertInfo = function(info){
$http.post('databaseFiles/insertDetails.php',{"name":info.name,"email":info.email,"address":info.address,"gender":info.gender}).success(function(data){
if (data == true) {
getInfo();
// Hide details insertion form
$('#form').css('display', 'none');
}
});
}

$scope.currentUser = {};
$scope.editInfo = function(info){
$scope.currentUser = info;
$('#form').slideUp();
$('#editForm').slideToggle();
};


$scope.UpdateInfo = function(info){
$http.post('databaseFiles/updateDetails.php',{"id":info.emp_id,"name":info.emp_name,"email":info.emp_email,"address":info.emp_address,"gender":info.emp_gender}).success(function(data){
$scope.show_form = true;
if (data == true) {
getInfo();
}
});
}


$scope.deleteInfo = function(info){
$http.post('databaseFiles/deleteDetails.php',{"del_id":info.emp_id}).success(function(data){
if (data == true) {
getInfo();
}
});
}	

}]);							