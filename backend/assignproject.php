<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$request=json_decode($postdata);
$Projectname=$request->projectname;
$Username=$request->username;
$Assigneddate=$request->assigneddate;
$Enddate=$request->enddate;

$sql="UPDATE `projectdetail` SET `Asignedto` = '{$Username}', `Assigneddate` = '{$Assigneddate}', `Enddate` = '{$Enddate}', `Status` = 'assigned' WHERE `projectdetail`.`Projectname` = '{$Projectname}';";
if(mysqli_query($con,$sql))
{
    echo("Assigned Successfully");
}
else
{
    echo("Can't");
    http_response_code(422);
}
?>