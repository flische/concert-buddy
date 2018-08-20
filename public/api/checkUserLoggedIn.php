<?php
session_start();
echo session_id();

header("Access-Control-Allow-Origin: *");
print("checking...");
print_r($_SESSION);

?>