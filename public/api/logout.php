<?php
header("Access-Control-Allow-Origin: *");
session_start();
session_destroy();
echo session_state();
$_SESSION = [];
?>