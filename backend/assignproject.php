<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$request=json_decode($postdata);
$Pid=$request->pid;
$Uid=$request->uid;
$Assigneddate=$request->assigneddate;
$Enddate=$request->enddate;

foreach($Uid as $Uid1)
{
    $sql="INSERT INTO `projectuser` (`Pid`,`Uid`,`Assigneddate`,`Enddate`,`UPstatus`) 
    VALUES ('{$Pid}','{$Uid1}','{$Assigneddate}','{$Enddate}','Inprogress');";
    if(!mysqli_query($con,$sql)){
    http_response_code(422);
    }
}
$sql1="UPDATE `projectdetail` SET `Pstatus` = 'Assigned' WHERE `Pid`='{$Pid}';";
if(mysqli_query($con,$sql1)){
    echo('Added Successfully');
    }
else{
    http_response_code(422);
}
?>