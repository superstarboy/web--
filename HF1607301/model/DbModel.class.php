<?php
/*
 * @数据库操作，分为有结果语句和无结果语句，皆返回函数执行结果
 */
class DbModel extends Model{
	public function query($sql){
		$res = $this->db->mysql_query($sql);
		return $res;
	}
	public function assoc($sql){
		$data = $this->db->mysql_assoc($sql);
		return $data;
	}
}