<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$intern=[];
$sql=$postdata;
if($result=mysqli_query($con,$sql))
{
    $cr=0;
    while($row=mysqli_fetch_assoc($result))
    {
        $intern[$cr]['Projectname']=$row['Projectname'];
        $intern[$cr]['Assigneddate']=$row['Assigneddate'];
        $intern[$cr]['Enddate']=$row['Enddate'];
        $intern[$cr]['UPstatus']=$row['UPstatus'];
        $cr++;
    }
    echo json_encode($intern);
}
else{
    http_response_code(404);
}
?>