<?php
class GameModel extends Model{
    public function doDb($sql){  //执行无结果语句
    	$data = $this->db->mysql_query($sql);
    	return $data;
    }
    public function doCheck($sql){  //判断查重
    	$data = $this->db->mysql_assoc($sql);
    	if(empty($data)){
    		return true;
    	}else {
    		return false;
    	}
    }
    public function accor($sql){ //查询语句
    	$data = $this->db->mysql_assoc($sql);
    	return $data;
    }
}