<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$sql=$postdata;
    
if(mysqli_query($con,"$sql"))
{
    echo("Sent to store");
}
else
{
    echo("Cannot sent.Try again!!!");
}

?>