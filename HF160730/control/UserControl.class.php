<?php
class UserControl extends Control{
    public function doAction(){
        $action = $_GET['a'];
        $mes = $_GET['mes'];
        if($action == 'lock'){            //玩家解锁
            $arr = explode(";",$mes);
            $lock = new LockModel();
            $Res = $lock->lock($arr[1], $arr[0]);
            echo $Res;
        }elseif ($action == 'mes'){     //查找玩家具体信息
            $sql = "select a.u_nik,a.rule_id,b.vr_lev,a.u_money from user a INNER JOIN viprule b ON a.vr_id=b.vr_id AND a.u_id='{$mes}';";
            $user = new UserModel();
            $Res = $user->getUser($sql);
            $res1 = json_encode($Res);
            echo $res1;
        }
    }
    public function UserSelect(){
        echo "用户信息";
    }
}
?>