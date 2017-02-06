<?php
class CutControl extends Control{
    public function doAction(){
        $action = $_GET['a'];
        if($action == 'load'){
            $this->dlfile();
        }
    }
    public function dlfile(){
        $Img = new ImgModel();
        $Img->seleImg();
        echo 1;
    }
}