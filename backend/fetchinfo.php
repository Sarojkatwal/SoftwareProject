<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$intern=[];
$sql="SELECT * FROM  interndetail WHERE Username='{$postdata}'";
if($result=mysqli_query($con,$sql))
{
    $cr=0;
    while($row=mysqli_fetch_assoc($result))
    {
        $intern[$cr]['Id']=$row['Id'];
        $intern[$cr]['Name']=$row['Name'];
        $intern[$cr]['ProjectName']=$row['ProjectName'];
        $intern[$cr]['AssignedDate']=$row['AssignedDate'];
        $intern[$cr]['EndDate']=$row['EndDate'];
        $intern[$cr]['Address']=$row['Address'];
        $cr++;
    }
    echo json_encode($intern);
}
else{
    http_response_code(404);
}
?>