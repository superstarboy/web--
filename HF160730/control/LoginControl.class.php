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
        	$this->loadView('LoginView.php',$action);
        	//header("location:index.php?a=&c=Login&wrong=必填字段");
        }
    }
    public function login(){
        $user = $_POST['user'];
        $password = $_POST['password'];
        $code = $_POST['code'];
        
        $model = new LoginModel();
        $rs = $model->login($user,$password,$code);
        //echo $rs;
        if($rs == 0){
        	$_SESSION['user']=$user;
            $model = new MenuModel();  
            $data['data'] = $model->getMenu();
            $data['admin'] = $user;
            $this->loadView('MainView.php',$data);
			//require_once '../view/MainView.php';
			//header("location:../view/MainView.php");
            //echo "../view/MainView.php";
        }else {
            $data = "错误";
            //header("location:{$GLOBALS['ROOT_PATH']}index.php?a=&c=Login&wrong=必填字段");
        	$this->loadView('LoginView.php',$data);
        }
    }
}
?>