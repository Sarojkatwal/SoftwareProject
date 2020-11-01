<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$request=json_decode($postdata);

$Username=$request->username;
$Password=$request->password;
$Admin=0;

$sql1="INSERT INTO `internuser` (`Admin`, `Username`, `Password`) VALUES ('{$Admin}', '{$Username}', '{$Password}')";
if(mysqli_query($con,$sql1))
{ 
    echo("Successfully added");
}
else
{
    echo(http_response_code(422));
}

?>