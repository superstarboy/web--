<?php
/*
 * @登录处理界面
 * @接收用户名密码验证码，并且去除sql注入
 */
class LoginControl extends Control{
    public function doAction(){
        $action = $_GET['a'];
        if($action == 'login'){
            $this->login();
        }else if($action == 'logout'){
        	$this->loadView('LoginView.php',$action);
        }else if(empty($action)){
        	$this->loadView('GameView.php',$action);
        	//header("location:index.php?a=&c=Login&wrong=必填字段");
        }
        elseif ($action == 'register'){// 注册
        	$this->register();
        }elseif ($action == 'register_write'){  //写入新用户信息
        	$this->register_write();
        }
    }
    public function login(){      //登录验证方法
        $mes = $_POST['mes'];
        $arr = explode(";",$mes);
        $model = new LoginModel();
        $rs = $model->login($arr[0],$arr[1]);
        //echo $rs;
        if(empty($rs)){   //无内容查询失败
        	 echo 0;
        }else {
            $db = new DbModel(); //更新最后登陆时间
            $sql = "UPDATE user SET u_last=NOW() WHERE u_id={$rs[0]['u_id']};";
            $db->query($sql);
        	echo $rs[0]['u_id'];
        }
    }
    public function register(){   //注册验证方法
    	$mes = $_POST['mes'];
    	$model = new LoginModel();
    	$rs = $model->register($mes);
    	//echo $rs;
    	if(empty($rs)){   //注册成功
    		echo 1;
    	}else {
    		echo 0;       //用户已存在，注册失败
    	}
    }
    public function register_write(){ //写入新用户信息
     	$mes = $_POST['mes'];
        $arr = explode(";",$mes);
        $model = new LoginModel();
        $rs = $model->write($arr[0], $arr[1], $arr[2]);
        if(empty($rs)){   //无内容插入失败
        	 echo 0;
        }else {
        	echo $rs;
        }
    }
}
?>