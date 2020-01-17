<?php
function connect()
{
$conn = mysqli_connect("localhost", "root", "","datastore");
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
mysqli_set_charset($conn,"utf8");
return $conn;
}
$con=connect();
