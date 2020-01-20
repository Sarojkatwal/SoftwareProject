<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$sql="SELECT * FROM  internuser";
if($result=mysqli_query($con,$sql))
{
    $data="notmatched";
    $request=json_decode($postdata);
    while($row=mysqli_fetch_assoc($result))
    {
        if($row['Admin']==$request->Admin && $row['UserName']==$request->UserName && $row['Password']==$request->Password)
        {
            $data="matched";
            break;
        }
    }
    echo ($data);
}
else{
    http_response_code(404);
}
?>