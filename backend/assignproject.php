<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$request=json_decode($postdata);
$Projectname=$request->projectname;
$Username=$request->username;
$Assigneddate=$request->assigneddate;
$Enddate=$request->enddate;

foreach($Username as $Username1)
{
    $sql="INSERT INTO `projectuser` (`Projectname`,`Username`,`Assigneddate`,`Enddate`,`UPstatus`) 
    VALUES ('{$Projectname}','{$Username1}','{$Assigneddate}','{$Enddate}','Inprogress');";
    if(!mysqli_query($con,$sql)){
    http_response_code(422);
    }
}
$sql1="UPDATE `projectdetail` SET `Status` = 'Assigned' WHERE `Projectname`='{$Projectname}';";
if(mysqli_query($con,$sql1)){
    echo('Added Successfully');
    }
else{
    http_response_code(422);
}
?>