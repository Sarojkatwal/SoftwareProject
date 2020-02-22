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
        $intern[$cr]['Id']=$row['Id'];
        $intern[$cr]['Firstname']=$row['Firstname'];
        $intern[$cr]['Lastname']=$row['Lastname'];
        $intern[$cr]['Username']=$row['Username'];
        $intern[$cr]['Address']=$row['Address'];
       // $intern[$cr]['ProjectName']=$row['ProjectName'];
       // $intern[$cr]['AssignedDate']=$row['AssignedDate'];
       // $intern[$cr]['EndDate']=$row['EndDate'];
        $intern[$cr]['Qualification']=$row['Qualification'];
        $intern[$cr]['Experience']=$row['Experience'];
        $intern[$cr]['Nationality']=$row['Nationality'];
        $intern[$cr]['Religion']=$row['Religion'];
        $intern[$cr]['Gender']=$row['Gender'];
        $cr++;
    }
    echo json_encode($intern);
}
else{
    http_response_code(404);
}
?>