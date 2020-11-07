<?php
require 'connect.php';
$sql=file_get_contents("php://input");

if(mysqli_query($con,$sql))
{
    echo("User restored successfully!!!");
}
}
else
{
    echo("Cannot Restore.Try again!!!");
}
?>