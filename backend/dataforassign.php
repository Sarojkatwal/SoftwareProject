<?php
require 'connect.php';
$internandproject=[];
$sql1="SELECT Username FROM  internuser WHERE  Status='Active' AND Admin='0'" ;
$sql2="SELECT Projectname FROM  projectdetail WHERE Status='Notassigned'";
if($result1=mysqli_query($con,$sql1))
{
    $cr=0;
    while($row1=mysqli_fetch_assoc($result1) )
    {
        $internandproject['Username'][$cr]=$row1['Username'];
        $cr++;
    }
    if($result2=mysqli_query($con,$sql2))
{
    $cr=0;
    while($row2=mysqli_fetch_assoc($result2) )
    {
        
        $internandproject['Projectname'][$cr]=$row2['Projectname'];
        $cr++;
    }
    echo (json_encode($internandproject));
}

}
else{
    http_response_code(404);
}
?>