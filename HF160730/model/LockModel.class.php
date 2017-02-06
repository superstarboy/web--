<?php
class LockModel extends Model{
	public function lock($id,$state){
		if($state == 1){
			$sql = "UPDATE `user` SET u_state=0 WHERE u_id=".$id;
			$Res = 0;
		}else {
			$sql = "UPDATE `user` SET u_state=1 WHERE u_id=".$id;
			$Res = 1;
		}
		$this->db->mysql_query($sql);
		return $Res;
	}
}