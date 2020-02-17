<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$request=json_decode($postdata);
$Username=$request->username;
$Password=$request->password;
$Admin=1;
//store
$sql2="INSERT INTO `internuser` (`Admin`, `Username`, `Password`) 
VALUES ('{$Admin}', '{$Username}', '{$Password}')";
if(mysqli_query($con,$sql2))
{
    echo("Added Successfully");
}
else
{
    http_response_code(422);
}
?>