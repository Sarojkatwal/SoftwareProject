<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$request=json_decode($postdata);

$Username=$request->username;
$Password=$request->password;
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
$sql1="INSERT INTO `internsdetail` (`Id`, `Firstname`, `Lastname`, `Username`, `Address`, `Qualification`, `Experience`, `Nationality`, `Religion`, `Gender`)
    VALUES (NULL, '{$Fname}', '{$Lname}', '{$Username}', '{$Address}', '{$Quali}', '{$Exper}', '{$Nationality}', '{$Religion}', '{$Gender}')";
    
$sql2="INSERT INTO `internuser` (`Admin`, `Username`, `Password`) VALUES ('{$Admin}', '{$Username}', '{$Password}')";
if(mysqli_query($con,$sql1))
{
    if(mysqli_query($con,$sql2))
    {
    echo("Successfully added");
    }
    else
    {
    echo(http_response_code(422));
    }
}
else
{
    echo(http_response_code(422));
}

?>