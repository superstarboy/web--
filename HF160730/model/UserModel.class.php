<?php
class UserModel extends Model{
    public function getUser($sql){
        $data = $this->db->mysql_assoc($sql);
        return $data;
    }
}