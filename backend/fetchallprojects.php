<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$intern=[];
$projectname=[];
$sql=$postdata;
if($result=mysqli_query($con,$sql))
{
    $cr=0;
    while($row=mysqli_fetch_assoc($result))
    {
        if(! in_array($row['Projectname'],$projectname))
        {
            array_push($projectname,$row['Projectname']);
            $intern[$cr]['Pid']=$row['Pid'];
            $intern[$cr]['Projectname']=$row['Projectname'];
            $intern[$cr]['Description']=$row['Description'];
            $intern[$cr]['Status']=$row['Pstatus'];
            $intern[$cr]['Githublink']=$row['Githublink'];
            $Udata=[];
            $Udata["Assigneddate"]=$row['Assigneddate'];
            $Udata["Enddate"]=$row['Enddate'];
            $Udata["Uid"]=$row['Uid'];
            $Udata["Username"]=$row['Username'];
            $Udata["UPstatus"]=$row['UPstatus'];
            $intern[$cr]['Udata']=[];
            array_push($intern[$cr]['Udata'],$Udata);
            $cr++;
        }
        else{
            $dcr=array_search($row['Projectname'],$projectname);
            $Udata=[];
            $Udata["Assigneddate"]=$row['Assigneddate'];
            $Udata["Enddate"]=$row['Enddate'];
            $Udata["Uid"]=$row['Uid'];
            $Udata["Username"]=$row['Username'];
            $Udata["UPstatus"]=$row['UPstatus'];     
            array_push($intern[$dcr]['Udata'],$Udata);
        }
    }
    echo json_encode($intern);
}
else
{
    http_response_code(404);
}
?>