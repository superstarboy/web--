<?php
header("location:view/LoginView.php");
require_once 'core/Factory.class.php';
$factory = Factory::getInterface();
$factory->run();


?>