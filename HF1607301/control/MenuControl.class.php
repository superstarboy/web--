<?php
/*
 * @分页控制层，提供删除查询锁定用户
 * @用户详情包括基本信息，拥有装备，经验记录，充值记录，
 */
class MenuControl extends Control{
    public function doAction(){
    	$db = new DbModel();
        $action = $_GET['a'];
        if($action == "announcements"){                     //公告查询语句
            $sql = "SELECT g_title,g_content FROM announcements WHERE g_validtime>NOW() ORDER BY g_validtime DESC;";  //查询公告语句
            if($data = $db->assoc($sql)){
            	$data = json_encode($data);
            	echo $data;
            }else {
            	echo 0;
            }
        }elseif ($action == "equip1"){               //查找用户拥有装备信息
        	$uid = $_GET['uid'];
            $sql = "SELECT * FROM equ_img a,equip b,viprule d,exprule e WHERE a.equ_id=b.equ_id AND b.vr_id=d.vr_id AND b.rule_id=e.rule_id AND b.equ_id in(SELECT c.equ_id FROM userequip c WHERE u_id={$uid});";
            if($data = $db->assoc($sql)){
                $data = json_encode($data);
                echo $data;
            }else {
                echo 0;
            }
        }elseif ($action == 'equip2'){   //查找用户未用有装备
        	$uid = $_GET['uid'];
            $sql = "SELECT * FROM equ_img a,equip b,viprule d,exprule e WHERE a.equ_id=b.equ_id AND b.vr_id=d.vr_id AND b.rule_id=e.rule_id AND b.equ_id NOT in(SELECT c.equ_id FROM userequip c WHERE u_id={$uid});";
            if($data = $db->assoc($sql)){
                $data = json_encode($data);
                echo $data;
            }else {
                echo 0;
            }
        }elseif ($action == 'userMes'){  //用户信息查询
            $uid = $_GET['uid'];
            $sql = "SELECT * FROM user a,viprule b,exprule c WHERE a.vr_id=b.vr_id and a.rule_id=c.rule_id AND a.u_id={$uid};";
            if($data = $db->assoc($sql)){
                $data = json_encode($data);
                echo $data;
            }else {
                echo 0;
            }
        }elseif ($action == 'equipShop'){  //装备购买执行
            $money = $_GET['money'];
            $uid = $_GET['uid'];
            $eid = $_GET['eid'];
            $sql = "UPDATE user SET u_money={$money} WHERE u_id={$uid};";
            $sqli = "INSERT INTO userequip(u_id,equ_id,uequ_time) VALUES({$uid},{$eid},NOW());";
            if($db->query($sql) && $db->query($sqli)){
                echo 1;
            }else {
                echo 0;
            }
        }elseif ($action == 'rechange'){ //用户充值
        	$money = $_GET['money'];
        	$uid = $_GET['uid'];
        	$sql = "SELECT * FROM user a,viprule b,exprule c WHERE a.vr_id=b.vr_id and a.rule_id=c.rule_id AND a.u_id={$uid};";       //查找用户信息
        	$res = $db->assoc($sql);
        	$moneys = $res[0]['u_online'] + $money;
        	$sql = "SELECT * FROM viprule WHERE vr_limit <{$moneys} ORDER BY vr_limit DESC;" ;                                                //查找用户当前等级
        	$vip = $db->assoc($sql);
        	$sqli = "UPDATE user SET u_rechargenum=u_rechargenum+1,vr_id={$vip[0]['vr_id']},u_online={$moneys},u_money=u_money+{$money} WHERE u_id={$uid};";    //更新用户vip等级，累计充值额度
        	$db->query($sqli);
        	$sqli = "INSERT INTO recharge(u_id,rec_time,rec_money) VALUES({$uid},NOW(),{$money});";    //插入充值记录
        	$db->query($sqli);
        }elseif ($action == 'equip4'){   //查找用户已装备
        	$uid = $_GET['uid'];
            $sql = "SELECT * FROM equip a,equ_img c WHERE a.equ_id=c.equ_id AND a.equ_id in (SELECT b.equ_id from usernowequ b WHERE u_id={$uid});";
            if($data = $db->assoc($sql)){
                $data = json_encode($data);
                echo $data;
            }else {
                echo 0;
            }
        }elseif ($action == 'equip3'){   //查找用户未装备
        	$uid = $_GET['uid'];
            $sql = "SELECT * FROM equip a,equ_img c,userequip d WHERE a.equ_id=c.equ_id AND a.equ_id=d.equ_id AND d.u_id={$uid} AND a.equ_id not in (SELECT b.equ_id from usernowequ b WHERE u_id={$uid});";
            if($data = $db->assoc($sql)){
                $data = json_encode($data);
                echo $data;
            }else {
                echo 0;
            }
        }elseif ($action == 'nowEquip'){   //更新玩家仓库装备表
        	$uid = $_GET['uid'];
        	$eid = $_GET['eid'];
        	$type = $_GET['type'];
            $sql = "UPDATE usernowequ SET equ_id={$eid} WHERE u_id={$uid} and type_id={$type};";
            if($db->query($sql)){
                echo 1;
            }else {
                echo 0;
            }
        }
    }
    public function pagePlayer($sql,$sqlf,$pagenow,$url,$page,$php){
    	 
    	$page->setPage($sqlf, $pagenow);
    	$data = $page->pageQuery($sql);
    	$data['out'] = $page->pageOut($url);
    	$this->loadView($php,$data);
    }
}