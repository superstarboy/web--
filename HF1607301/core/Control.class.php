<?php
/*
 * @抽象类，必然要实现的方法
 */
abstract class Control{
	protected $data;
    abstract public function doAction();
    public function loadView($url,$data){
    	//$data = $this->data;
    	require_once $GLOBALS['ROOT_PATH'].'/view/'.$url;
    }
}
?>