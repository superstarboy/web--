<?php
class LoginModel extends Model{
    public function login($user,$password){          //登录验证
        $sql = "SELECT u_id from user WHERE u_name='{$user}' and u_pwd='{$password}' and u_state=0;";
        $data = $this->db->mysql_assoc($sql);
        return $data;
    }
    public function register($user){              //注册验证
    	$sql = "SELECT u_id from user WHERE u_name='{$user}';";
    	$data = $this->db->mysql_assoc($sql);
    	return $data;
    }
    public function write($user,$pwd,$mes){           //注册写入数据
    	$sql = "INSERT INTO user(u_name,u_pwd,u_state,u_registertime,u_last,u_nik,vr_id,rule_id) VALUES('{$user}','{$pwd}',0,NOW(),NOW(),'{$mes}',1,1);";
    	//echo $sql;
    	$this->db->mysql_query($sql);
    	$sql = "SELECT u_id from user WHERE u_name='{$user}';";
    	$data = $this->db->mysql_assoc($sql);
    	$u_id = $data[0]['u_id'];
    	$sql = "INSERT INTO usernowequ(u_id,type_id,equ_id) VALUES ('{$u_id}', '1', '1');";  //玩家仓库装备表
    	$this->db->mysql_query($sql);
    	$sql = "INSERT INTO usernowequ(u_id,type_id,equ_id) VALUES ('{$u_id}', '2', '7');";
    	$this->db->mysql_query($sql);
    	$sql = "INSERT INTO usernowequ(u_id,type_id,equ_id) VALUES ('{$u_id}', '3', '9');";
    	$this->db->mysql_query($sql);
    	$sql = "INSERT INTO usernowequ(u_id,type_id,equ_id) VALUES ('{$u_id}', '4', '11');";
    	$this->db->mysql_query($sql);
    	$sql = "INSERT INTO userequip VALUES ('{$u_id}', '1', '8', '12',NOW(), '1','越野机车');";         //玩家初始化道具
    	$this->db->mysql_query($sql);
    	$sql = "INSERT INTO userequip VALUES ('{$u_id}', '7', '8', '12',NOW(), '1','越野机车');";
    	$this->db->mysql_query($sql);
    	$sql = "INSERT INTO userequip VALUES ('{$u_id}', '9', '8', '12',NOW(), '1','越野机车');";
    	$this->db->mysql_query($sql);
    	$sql = "INSERT INTO userequip VALUES ('{$u_id}', '11', '8', '12',NOW(), '1','越野机车');";
    	$this->db->mysql_query($sql);
    	//这初始化真是日了狗
    	return $u_id;
    }
}