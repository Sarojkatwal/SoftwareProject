<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$intern=[];
$date=[];
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
            $intern[$cr]['Projectname']=$row['Projectname'];
            $intern[$cr]['Description']=$row['Description'];
            $intern[$cr]['Status']=$row['Status'];
            $intern[$cr]['Githublink']=$row['Githublink'];
            $Udata=[];
            $Udata["Assigneddate"]=$row['Assigneddate'];
            $Udata["Enddate"]=$row['Enddate'];
            $Udata["Username"]=[];
            array_push($Udata['Username'],$row['Username']);
            $Udata["UPstatus"]=$row['UPstatus'];
            $intern[$cr]['Udata']=[];
            array_push($intern[$cr]['Udata'],$Udata);
            $date[$cr]=[];
            array_push($date[$cr],$row['Assigneddate']);
            $cr++;
        }
        else{
            $dcr=array_search($row['Projectname'],$projectname);
            if(!in_array($row['Assigneddate'],$date[$dcr]))
           {
            $Udata=[];
            $Udata["Assigneddate"]=$row['Assigneddate'];
            $Udata["Enddate"]=$row['Enddate'];
            $Udata["Username"]=$row['Username'];
            $Udata["UPstatus"]=$row['UPstatus'];     
            array_push($intern[$dcr]['Udata'],$Udata);
            array_push($date[$dcr],$row['Assigneddate']);
           }
           else{
               //array_push($intern[$dcr]['Udata']['Username'],$row['Username']);

               $mm=($intern[$dcr]['Udata']);
               foreach($mm as $yy=>$y){
                  foreach($y as $z=>$zz){
                      if($z=="Assigneddate")
                      {
                          if($zz==$row['Assigneddate'])
                          {
                          
                          break;
                          }
                      }
                  }
                  array_push($intern[$dcr]['Udata'][$yy]['Username'],$row['Username']);
               }


           }
        }
    }
    echo json_encode($intern);
}
else
{
    http_response_code(404);
}
?>