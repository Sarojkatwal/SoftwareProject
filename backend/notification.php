<?php
require 'connect.php';
$message=[];
$sql="SELECT * FROM  notification  ORDER BY `Date.` DESC";
if($result=mysqli_query($con,$sql))
{
    $cr=0;
    while($row=mysqli_fetch_assoc($result))
    {
        $message[$cr]['By']=$row['By.'];
        $message[$cr]['Action']=$row['Action.'];
        $message[$cr]['Date']=$row['Date.'];
        $cr++;
    }
    echo json_encode($message);
}
else{
    echo("Unable to do this action");
}
?>