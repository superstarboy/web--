<?php
require_once '../database/DataBase.class.php';
require_once '../core/Model.class.php';
require_once '../core/Control.class.php';
function __autoload($classname){
    $filename1 = "../control/".$classname.".class.php";
    $filename2 = "../model/".$classname.".class.php";
    if(file_exists($filename1)){
        require_once $filename1;
    }
    if(file_exists($filename2)){
        require_once $filename2;
    }
}
$c = $_GET['c'];
$controlname = $c."Control";
$contrl = new $controlname();
if($contrl instanceof Control){
    $contrl->doAction();
}

?>