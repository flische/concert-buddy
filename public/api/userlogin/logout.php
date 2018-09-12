<?php
header("Access-Control-Allow-Origin: *");
session_start();
session_destroy();
$_SESSION = [];
print("logged out")
?>