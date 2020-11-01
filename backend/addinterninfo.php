<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$request=json_decode($postdata);

$Uid=$request->uid;
$Fname=$request->fname;
$Lname=$request->lname;
$Address=$request->address;
$Exper=$request->experience;
$Quali=$request->qualification;
$Nationality=$request->nationality;
$Religion=$request->religion;
$Gender=$request->gender;
//store
$sql1="INSERT INTO `internsdetail` (`Uid`,`Firstname`, `Lastname`,  `Address`, `Qualification`, `Experience`, `Nationality`, `Religion`, `Gender`)
    VALUES ('{$Uid}','{$Fname}', '{$Lname}',  '{$Address}', '{$Quali}', '{$Exper}', '{$Nationality}', '{$Religion}', '{$Gender}')";
    
if(mysqli_query($con,$sql1))
{
    echo("Successfully added");
}
else
{
    echo(http_response_code(422));
}
?>