<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$postdata=json_decode($postdata);
$sql1=$postdata->o1;
$sql2=$postdata->o2;
//$sql3=$postdata.o3;

if(mysqli_query($con,$sql1))
{
    if(mysqli_query($con,$sql2))
{
    echo("User removed successfully!!!");
}
else
{
    echo("Cannot delete.Try again!!!");
}
}
else
{
    echo("Cannot delete.Try again!!!");
}
?>