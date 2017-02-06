<?php
class LoginModel extends Model{
    public function login($user,$password,$code){
        session_start();
        $password = md5($password);
        if($code != $_SESSION['code']){
            return 1;  //验证码错误
        }else {
            $sql = "select * from admin where a_id='{$user}' and a_pwd='{$password}';";
            
            $data = $this->db->mysqli_row($sql);
            if(empty($data)){
                return 2;//用户名或者密码错误
            }else {
                return 0;//成功
            }
        }
    }
}