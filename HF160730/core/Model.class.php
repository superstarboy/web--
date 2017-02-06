<?php
/*
 * @提供连接数据库的接口 
 */
class Model{
    protected $db;
    public function __construct(){
        //$config = include '../database/config.php';
        $this->db = DataBase::db_get($GLOBALS['config']);
    }
}
?>