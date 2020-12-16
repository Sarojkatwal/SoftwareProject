<?php
require 'connect.php';
$internandproject=[];
$sql1="SELECT * FROM  internuser WHERE  Status='Active' AND Admin='0'" ;
$sql2="SELECT * FROM  projectdetail WHERE Pstatus='Notassigned'";
if($result1=mysqli_query($con,$sql1))
{
    $cr=0;
    while($row1=mysqli_fetch_assoc($result1) )
    {
        $internandproject['Userinfo'][$cr]["Username"]=$row1['Username'];
        $internandproject['Userinfo'][$cr]["Uid"]=$row1['Uid'];
        $cr++;
    }
    if($result2=mysqli_query($con,$sql2))
    {
    $cr=0;
    while($row2=mysqli_fetch_assoc($result2) )
    {
        
        $internandproject['Pinfo'][$cr]["Pid"]=$row2['Pid'];
        $internandproject['Pinfo'][$cr]["Projectname"]=$row2['Projectname'];
        $cr++;
    }
    }
    echo json_encode($internandproject);
}
else{
    http_response_code(404);
}
?>