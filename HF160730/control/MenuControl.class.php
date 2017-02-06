<?php
/*
 * @分页控制层，提供删除查询锁定用户
 * @用户详情包括基本信息，拥有装备，经验记录，充值记录，
 */
class MenuControl extends Control{
    public function doAction(){
    	isset($_GET['pagenow'])?$pagenow=$_GET['pagenow']:$pagenow=1;
    	$page = new PageModel();
        $action = $_GET['a'];
        if($action == "player"){                     //玩家信息
            $sql = "select a.u_id,a.u_nik,a.rule_id,b.vr_lev,a.u_registertime,a.u_last,a.u_money,a.u_state from user a inner join viprule b on a.vr_id=b.vr_id";
            $sqlf = "select count(*) from user";
            $url = "index.php?c=Menu&a=player";
            $this->page($sql, $sqlf, $pagenow, $url,$page);
        }elseif ($action == "search"){               //模糊搜索玩家信息
            $sql = "select a.u_id,a.u_nik,a.rule_id,b.vr_lev,a.u_registertime,a.u_last,a.u_money,a.u_state from user a inner join viprule b on a.vr_id=b.vr_id and (a.u_id like '%{$_GET['s']}%' or a.u_nik like '%{$_GET['s']}%')";
            $sqlf = "select count(*) from user where u_id like '%".$_GET['s']."%' or u_nik like '%".$_GET['s']."%';";
            $url = "index.php?c=Menu&a=search&s=".$_GET['s'];
            $this->page($sql, $sqlf, $pagenow, $url,$page);
        }elseif ($action == "main"){                  //玩家详细信息
            $mes = $_GET['mes'];
            $arr = explode(";",$mes);
            if($arr[0] == 'search_e'){  //装备
                $sql = "SELECT b.equ_name,a.uequ_time,a.userequ_lev FROM userequip a inner join equip b on a.equ_id=b.equ_id and a.u_id='".$arr[1]."' order by a.uequ_time desc";
                $sqlf = "select count(*) FROM userequip WHERE u_id='".$arr[1]."';";
                $url = "index.php?c=Menu&a=main&mes=".$mes;
                $data['one'] = '装备名称';
                $data['two'] = '购买时间';
                $data['thr'] = '装备等级';
            }elseif ($arr[0] == 'search_c'){   //游戏记录
            	$sql = "SELECT game_id,cus_gametime,cus_exp FROM usergame WHERE u_id='".$arr[1]."' order by cus_gametime desc";
            	$sqlf = "select count(*) FROM userequip WHERE u_id='".$arr[1]."';";
            	$url = "index.php?c=Menu&a=main&mes=".$mes;
            	$data['one'] = '游戏关卡';
            	$data['two'] = '游戏时间';
            	$data['thr'] = '获得经验';
            }elseif ($arr[0] == 'search_j'){      //充值记录
            	$sql = "SELECT a.rec_money,a.rec_time,b.u_name FROM recharge a inner join user b on a.u_id=b.u_id and a.u_id='".$arr[1]."' order by a.rec_time desc";
            	$sqlf = "select count(*) FROM recharge WHERE u_id='".$arr[1]."';";
            	
            	$url = "index.php?c=Menu&a=main&mes=".$mes;
            	$data['one'] = '充值金额';
            	$data['two'] = '充值时间';
            	$data['thr'] = '玩家名称';
            }
            $this->page($sql, $sqlf, $pagenow, $url, $page,$data);
        }elseif ($action == 'announce'){         //公告
        	$sql = "SELECT * from announcements ORDER BY g_validtime DESC";
            $sqlf = "select count(*) from announcements;";
            $url = "index.php?c=Menu&a=announce";
            $this->pagePlayer($sql, $sqlf, $pagenow, $url,$page,'AnnounceView.php');
        }elseif ($action == 'vip'){         //vip
        	$sql = "SELECT * from viprule ORDER BY vr_limit DESC";
            $sqlf = "select count(*) from viprule;";
            $url = "index.php?c=Menu&a=vip";
            $this->pagePlayer($sql, $sqlf, $pagenow, $url,$page,'VipView.php');
        }elseif ($action == 'map'){ // 赛事赛段
        	$sql = "SELECT * from gamemap;";
        	$game = new GameModel();
        	$data['data'] = $game->accor($sql);
        	$this->loadView('MapView.php',$data);
        }elseif ($action == 'equip'){ // 交易物品管理
        	$sql = "SELECT * from equ_type;";
        	$sqli = "SELECT * from equip;";
        	$sqlv = "SELECT * from viprule;";
        	$sqle = "SELECT * from exprule;";
        	$game = new GameModel();
        	$data['data'] = $game->accor($sql);
        	$data['equip'] = $game->accor($sqli);
        	$data['vip'] = $game->accor($sqlv);
        	$data['exp'] = $game->accor($sqle);
        	$this->loadView('EquipView.php',$data);
        }
        
    }
    public function page($sql,$sqlf,$pagenow,$url,$page,$mes=1){
    	
    	$page->setPage($sqlf, $pagenow);
    	$data = $page->pageQuery($sql);
    	$data['out'] = $page->pageOut($url);
    	if($mes != 1){
    	    $data['one'] = $mes['one'];
    	    $data['two'] = $mes['two'];
    	    $data['thr'] = $mes['thr'];
    	    $this->loadView('MesView.php', $data);
    	}else{
    	    $this->loadView('PlayerView.php',$data);
    	}	
    }
    public function pagePlayer($sql,$sqlf,$pagenow,$url,$page,$php){
    	 
    	$page->setPage($sqlf, $pagenow);
    	$data = $page->pageQuery($sql);
    	$data['out'] = $page->pageOut($url);
    	$this->loadView($php,$data);
    }
}