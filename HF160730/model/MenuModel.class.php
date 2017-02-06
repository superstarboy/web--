<?php
class MenuModel extends Model{
    public function getMenu(){
        $sql = "select * from menu;";
        $data = $this->db->mysql_assoc($sql);
        return $data;
    }
}