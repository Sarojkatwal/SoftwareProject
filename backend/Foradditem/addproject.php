<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$request=json_decode($postdata);
$Projectname=$request->projectname;
$Projectdetail=$request->projectdescription;
$Admin=1;
//store
$sql="INSERT INTO `projectdetail` (`Projectname`, `Description`, `Status`, `Githublink`) 
VALUES ('{$Projectname}', '{$Projectdetail}', 'Notassigned', '')";
if(mysqli_query($con,$sql))
{
    echo("Added Successfully");
}
else
{
    http_response_code(422);
}
?>