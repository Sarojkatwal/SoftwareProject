<?php
$localdata=array("username"=>"","loggedin"=>false);
$postdata=file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request=json_decode($postdata);
    $cookie_name = "uname";
    $cookie_value =$request->username;
    setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
    $cookie_name = "log";
    $cookie_value =$request->loggedin;
    setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
}
if(isset($_COOKIE["uname"]) && isset($_COOKIE["log"])) {
    $localdata["username"]=$_COOKIE["uname"];
    $localdata["loggedin"]=$_COOKIE["log"];
}
echo(json_encode($localdata));
?>