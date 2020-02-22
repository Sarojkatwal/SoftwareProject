<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$request=json_decode($postdata);

$Username=$request->username;
$Fname=$request->fname;
$Lname=$request->lname;
$Address=$request->address;
$Exper=$request->experience;
$Quali=$request->qualification;
$Nationality=$request->nationality;
$Religion=$request->religion;
$Gender=$request->gender;
$Admin=0;
//store
$sql="UPDATE `internsdetail` SET  `Firstname`='$Fname', `Lastname`='$Lname', `Address`='$Address',
 `Qualification`='$Quali', `Experience`='$Exper', `Nationality`='$Nationality',
  `Religion`='$Religion', `Gender`='$Gender'  WHERE `Username` = '$Username' ";
    
if(mysqli_query($con,$sql))
{
    echo("Successfully updated");
}
else
{
    echo("Cannot update record.Try again!!!");
}

?>