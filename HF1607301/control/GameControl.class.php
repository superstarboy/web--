<?php
class GameControl extends Control{
	public function doAction(){
		$action = $_GET['a'];
		$mes = $_GET['mes'];
		$db = new DbModel();
		if($action == 'saishi'){            //赛事检索
			$sql = "SELECT * FROM gamemap WHERE game_fid=0;";
			if($data = $db->assoc($sql)){
				$data = json_encode($data);
				echo $data;
			}else {
				echo 0;
			}
		}elseif ($action == 'map'){     //取得地图图片
			$mid = $_GET['mid'];
			$sql = "SELECT * FROM gamemap where game_id={$mid};";
			if($data = $db->assoc($sql)){
				$data = json_encode($data);
				echo $data;
			}else {
				echo 0;
			}
		}elseif ($action == 'player'){   //获取用户图片
			$uid = $_GET['uid'];
			$sql = "SELECT * FROM usernowequ a,equ_img b WHERE a.u_id={$uid} and a.equ_id=b.equ_id and b.equimg_to=2;";
			if($data = $db->assoc($sql)){
				$data = json_encode($data);
				echo $data;
			}else {
				echo 0;
			}
		}elseif ($action == 'ui'){   //获取ui图片
			$sql = "SELECT * FROM equ_img WHERE equimg_to=2;";
			if($data = $db->assoc($sql)){
				$data = json_encode($data);
				echo $data;
			}else {
				echo 0;
			}
		}elseif ($action == 'usergame'){    //插入用户游戏记录
			$uid = $_GET['uid'];
			$mid = $_GET['mid'];
			$money = $_GET['money'];
			$top = $_GET['top'];
			$exp = $_GET['exp'];
			$le = $_GET['le'];
			$sql = "INSERT INTO usergame(u_id,game_id,cus_exp,cus_money,cus_top,cus_gametime) VALUES({$uid},{$mid},{$exp},{$money},{$top},NOW());";
			if($db->query($sql)){
				//更新玩家经验等级
				$sql = "SELECT * FROM usergame where u_id={$uid} and game_id={$mid};";
				$exple = $db->assoc($sql);
				if(count($exple) == 1){
					 $sql = "update user set rule_id=2 where u_id={$uid};";        //经验等级2
					 $db->query($sql);
				}else {
					 $sql = "update user set rule_id=3 where u_id={$uid};";        //经验等级3
					 $db->query($sql);
				}
				$sql = "SELECT * from usercustoms where u_id={$uid} and game_id={$mid};";
				$res = $db->assoc($sql);
				if(empty($res)){
					$sql = "INSERT into usercustoms(u_id,game_id,star_id) VALUES({$uid},{$mid},{$le});";       //添加新成绩
					$db->query($sql);
				}else {
					if($le < $res[0]['star_id']){
						$sql = "UPDATE usercustoms set star_id={$le} WHERE u_id={$uid} and game_id={$mid};";      //更新最新的成绩
						$db->query($sql);
					}
				}
			}else {
				echo 0;
			}
		}elseif ($action == 'star'){  //获取小地图
			$uid = $_GET['uid'];
			$mid = $_GET['mid'];
			
			$sql = "SELECT * from gamemap WHERE game_fid={$mid};";
			if($data = $db->assoc($sql)){
				$data = json_encode($data);
				echo $data;
			}else {
				echo 0;
			}
		}elseif ($action == 'usermap'){             //获取小地图信息地图
			$uid = $_GET['uid'];
			$mid = $_GET['mid'];
			
			$sql = "SELECT * from gamemap a,usercustoms b WHERE a.game_fid={$mid} and a.game_id=b.game_id and b.u_id={$uid};";
			$sqli = "SELECT * from gamemap a  where a.game_fid={$mid};";
			$userDate = $db->assoc($sql);
			$data = $db->assoc($sqli);
			if(empty($userDate)){                          //地图全无游戏记录
				for($i=0;$i<count($data);$i++){
					$data[$i]['star_id'] = "5";
				}
				$data[0]['star_id'] = '4';
			}else {                                         //地图有游戏记录，按游戏记录来
				for($i=0;$i<count($data);$i++){
					$data[$i]['star_id'] = "5";
				}
				for($i=0;$i<count($userDate);$i++){
					if($data[$i]['game_id'] == $userDate[$i]['game_id']){
						$data[$i]['star_id'] = $userDate[$i]['star_id'];
					}
				}
			}
			$data = json_encode($data);
			echo $data;
		}elseif ($action == 'saiduan'){  //获取当前赛段地图
			$mid = $_GET['mid'];
			
			$sql = "SELECT * from gamemap where game_fid={$mid};";
			if($data = $db->assoc($sql)){
				$data = json_encode($data);
				echo $data;
			}else {
				echo 0;
			}
		}elseif ($action == 'stararr'){  //获取地图等级
			$sql = "SELECT * from mapstar;";
			if($data = $db->assoc($sql)){
				$data = json_encode($data);
				echo $data;
			}else {
				echo 0;
			}
		}elseif ($action == 'playerimg'){  //获取玩家图片
			$uid = $_GET['uid'];
			$sql = "SELECT * from equ_img a,usernowequ b where a.equ_id=b.equ_id and b.u_id={$uid} and a.equimg_to=3 and b.type_id=1;";
			if($data = $db->assoc($sql)){
				$data = json_encode($data);
				echo $data;
			}else {
				echo 0;
			}
		}elseif ($action == 'uiimg'){  //获取ui图片
			$src = $_GET['src'];
			$sql = "SELECT * from equ_img where equ_id=(SELECT equ_id from equ_img where equimg_url='{$src}') and equimg_to=3;";
			if($data = $db->assoc($sql)){
				$data = json_encode($data);
				echo $data;
			}else {
				echo 0;
			}
		}elseif ($action == 'nextOpen'){  //是否解锁下一关
			$le = $_GET['le'];
			$uid = $_GET['uid'];
			$saishi = $_GET['saishi'];
			$mid = $_GET['mid'];
			$sql = "SELECT * from gamemap a,usercustoms b where a.game_fid={$sahishi} and a.game_id=b.game_id and b.u_id={$uid} and a.game_id={$mid}+1;";
			$data = $db->assoc($sql);
			if(empty($data)){        //找不出来，没有解锁或者没有这个地图
				$sqli = "select * from gamemap where game_id={$mid}+1 and game_fid={$saishi};";
				$res = $db->assoc($sqli);
				if(empty($res)){  //没有下一关
					echo 0;
				}else{             //下一关没有记录
					if($le = 1){  //条件是否达到要求
						$sqlopen = "insert into usercustoms(u_id,game_id,star_id) VALUES({$uid},{$mid},4);";  //解锁下一关
						$db->query($sqlopen);
						echo 1;
					}else{
						echo 0;
					}
				}   
			}else if($data[0]['']){
				echo 0;
			}
		}else if($action == 'nextGame'){          //判断下一关可用
			$mid = $_GET['mid'];
			$uid = $_GET['uid'];
			$saishi = $_GET['saishi'];
			$sql = "SELECT * from gamemap a,usercustoms b where a.game_fid={$saishi} and a.game_id=b.game_id and b.u_id={$uid} and a.game_id={$mid}+1;";  
			$res = $db->assoc($sql);
			if(empty($res)){      //检查是否有下一关
				echo 0;           //没有下一关
			}else {
				echo 1;           //下一关存在
			}
		}
	}
}