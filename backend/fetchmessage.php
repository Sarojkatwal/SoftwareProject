<?php
require 'connect.php';

$postdata=file_get_contents("php://input");
$request=json_decode($postdata);
$By=$request->by;
$To=$request->to;
$message=[];
$sql="SELECT * FROM  message WHERE (`By.`='$By'  AND `To.`='$To') OR (`To.`='$By' AND  `By.`='$To') ORDER BY `Date` DESC";
if($result=mysqli_query($con,$sql))
{
    $cr=0;
    while($row=mysqli_fetch_assoc($result))
    {
        $message[$cr]['By']=$row['By.'];
        $message[$cr]['To']=$row['To.'];
        $message[$cr]['Message']=$row['Message'];
        $message[$cr]['Date']=$row['Date'];
        $cr++;
    }
    echo json_encode($message);
}
else{
    echo(http_response_code(422));
}
?>