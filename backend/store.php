<?php
require 'connect.php';
$postdata=file_get_contents("php://input");
$request=json_decode($postdata);
$sqls=$request->sqls;
foreach($sqls as $sq1){
    if(!mysqli_query($con,$sq1))
    {
        http_response_code(422);
    }
}
?>