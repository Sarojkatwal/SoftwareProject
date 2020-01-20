<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
    $request=json_decode($postdata);
    $username=$request->UserName;
    $password=$request->Password;

    //store
    $sql="INSERT INTO `internuser`(
        `UserName`,
        `Password`
        )VALUES
        ('{$username}',
        '{$password}'
        )";
    if(mysqli_query($con,$sql))
    {
        http_response_code(201);
        echo "Hello";
    }
    else
    {
        http_response_code(422);
    }
}
?>