<?php
class GameControl extends Control{
	public function doAction(){
		$action = $_GET['a'];
		$mes = $_GET['mes'];
		if($action == 't'){            //公告添加
			$arr = explode(";",$mes);
			$game = new GameModel();
			$sql = "INSERT into announcements(g_title,g_content,g_validtime,g_releasetime) VALUES('{$arr[0]}','{$arr[1]}','{$arr[2]}',NOW());";
			if($game->doDb($sql)){
				echo 1;
			}else {
				echo 0;
			}
		}elseif ($action == 'x'){     //公告修改
			$arr = explode(";", $mes);
			$game = new GameModel();
			$sql = "UPDATE announcements SET g_title='{$arr[0]}',g_content='{$arr[1]}',g_validtime='{$arr[2]}',g_releasetime=NOW() WHERE g_id='{$arr[3]}';";
			if($game->doDb($sql)){
				echo 1;
			}else {
				echo 0;
			}
		}elseif ($action == 's'){     //公告删除
			$game = new GameModel();
			$sql = "DELETE FROM announcements WHERE g_id='{$mes}';";
			if($game->doDb($sql)){
				echo 1;
			}else {
				echo 0;
			}
		}elseif ($action == 'vipt'){     //vip添加
			$arr = explode(";", $mes);
			$game = new GameModel();
			$sql = "INSERT INTO viprule(vr_lev,vr_limit) VALUES('{$arr[0]}','{$arr[1]}');";
			if($game->doDb($sql)){
				echo 1;
			}else {
				echo 0;
			}
		}elseif ($action == 'vipx'){     //vip修改
			$arr = explode(";", $mes);
			$game = new GameModel();
			$sql = "UPDATE viprule SET vr_lev='{$arr[0]}',vr_limit='{$arr[1]}' WHERE vr_id='{$arr[2]}';";
			if($game->doDb($sql)){
				echo 1;
			}else {
				echo 0;
			}
		}elseif ($action == 'vips'){     //Vip删除
			$game = new GameModel();
			$sql = "DELETE FROM viprule WHERE vr_id='{$mes}';";
			if($game->doDb($sql)){
				echo 1;
			}else {
				echo 0;
			}
		}elseif ($action == 'mapDele'){     //map删除
			$game = new GameModel();
			$sql = "DELETE FROM gamemap WHERE game_id='{$mes}';";
			if($game->doDb($sql)){
				echo 1;
			}else {
				echo 0;
			}
		}elseif ($action == 'mapMes'){     //map主要信息
			$game = new GameModel();
			$sql = "SELECT game_name,game_img FROM gamemap WHERE game_id='{$mes}';";
			if($game->doDb($sql)){
				$data = $game->accor($sql);
				$data = json_encode($data);
				echo $data;
			}else {
				echo 0;
			}
		}elseif ($action == 'mapx'){     //map修改地图
			$src = './src/img/map';
			$upload = new UploadModel();
			$res = $upload->getFile('file',$src);
			$game = new GameModel();
			if($res == false){
				$this->loadView('MapView.php',$res);
			}else {
				$sql = "UPDATE gamemap SET game_name='{$_POST['name']}',game_img='{$res}',game_difficulty='{$_POST['lev']}',game_fid='{$_POST['fid']}' WHERE game_id='{$mes}';";
				$game->doDb($sql);
				Header("Location: index.php?c=Menu&a=map");
			}
		}elseif ($action == 'mapt'){     //map添加地图
			$src = './src/img/map';
			$upload = new UploadModel();
			$res = $upload->getFile('file',$src);
			$game = new GameModel();
			if($res == false){
				$this->loadView('MapView.php',$res);
			}else {
				$sql = "INSERT INTO gamemap(game_name,game_img,game_difficulty,game_fid) values('{$_POST['name']}','{$res}','{$_POST['lev']}','{$_POST['fid']}');";
				$game->doDb($sql);
				Header("Location: index.php?c=Menu&a=map");
			}
			
		}elseif ($action == 'fenxi'){     //营收分析
			$game = new GameModel();
			$sql = "SELECT * from recharge ORDER BY rec_time;";
			$data = $game->accor($sql);
			if($data){
				$data = json_encode($data);
				echo $data;
			}else {
				echo 0;
			}
		}elseif ($action == 'buy'){     //跳转营收分析
			$this->loadView('BuyView.php',$mes);
		}elseif ($action == 'eMes'){     //equip主要信息
			$game = new GameModel();
			$sql = "SELECT a.equ_name,b.type_name,c.vr_lev,a.equ_money,a.equ_cri FROM equip a INNER JOIN equ_type b on a.type_id=b.type_id INNER JOIN viprule c on a.vr_id=c.vr_id and a.equ_id='{$mes}';";
			$sqlimg = "SELECT b.equimg_url FROM equip a,equ_img b WHERE a.equ_id=b.equ_id AND a.equ_id='{$mes}';";
			if($game->doDb($sql)){
				$data['mes'] = $game->accor($sql);
				$data['img'] = $game->accor($sqlimg);
				$data = json_encode($data);
				echo $data;
			}else {
				echo 0;
			}
		}elseif ($action == 'eDele'){     //装备删除
			$game = new GameModel();
			$sql = "DELETE FROM equip WHERE equ_id='{$mes}';";
			if($game->doDb($sql)){
				echo 1;
			}else {
				echo 0;
			}
		}elseif ($action == 'equx'){     //装备修改
			$src = './src/img/equip';
			$upload = new UploadModel();
			$res = [];
			$res[0] = $upload->getFile('show_file',$src);
			$res[1] = $upload->getFile('game_file',$src);
			$res[2] = $upload->getFile('win_file',$src);
			$game = new GameModel();
			if($res[0] == false){
				$this->loadView('EquipView.php',$res);
			}else {
				$sql = "UPDATE equip SET equ_name='{$_POST['name']}',rule_id='{$_POST['rule_id']}',vr_id='{$_POST['vr_id']}',type_id='{$_POST['type_id']}',equ_cri='{$_POST['cri']}',equ_money='{$_POST['money']}' WHERE equ_id='{$mes}';";				
				if($game->doDb($sql)){//坑爹语句不能执行多条
				    $sqli = "UPDATE equ_img SET equimg_url='{$res[0]}' WHERE equimg_to=1 and equ_id={$mes};";
				    $game->doDb($sqli);
				    $sqli = "UPDATE equ_img SET equimg_url='{$res[1]}' WHERE equimg_to=2 and equ_id={$mes};";
				    $game->doDb($sqli);
				    $sqli = "UPDATE equ_img SET equimg_url='{$res[2]}' WHERE equimg_to=3 and equ_id={$mes};";
					$game->doDb($sqli);
				}
				Header("Location: index.php?c=Menu&a=equip");
			}
		}elseif ($action == 'equt'){     //装备添加
			$src = './src/img/equip';
			$upload = new UploadModel();
			$res = [];
			$res[0] = $upload->getFile('show_file',$src);
			$res[1] = $upload->getFile('game_file',$src);
			$res[2] = $upload->getFile('win_file',$src);
			$game = new GameModel();
			if($res[0] == false){
				$this->loadView('EquipView.php',$res);
			}else {
				$sql = "INSERT INTO equip(equ_name,rule_id,vr_id,type_id,equ_cri,equ_money) values('{$_POST['name']}','{$_POST['rule_id']}','{$_POST['vr_id']}','{$_POST['type_id']}','{$_POST['cri']}','{$_POST['money']}');";
				//查询新添加装备id
				$sqlc = "select equ_id from equip where equ_name='{$_POST['name']}'";
				$game->doDb($sql);
				if(!empty($result = $game->accor($sqlc))){//坑爹sql不能执行多句话
					$sqli = "INSERT INTO equ_img(equ_id,equimg_url,equimg_to) values('{$result[0]['equ_id']}','{$res[0]}',1);";
					$game->doDb($sqli);  //如何解决
					$sqli = "INSERT INTO equ_img(equ_id,equimg_url,equimg_to) values('{$result[0]['equ_id']}','{$res[1]}',2);";
					$game->doDb($sqli);
					$sqli = "INSERT INTO equ_img(equ_id,equimg_url,equimg_to) values('{$result[0]['equ_id']}','{$res[2]}',3);";
					$game->doDb($sqli);
				}
				Header("Location: index.php?c=Menu&a=equip");
			}
			
		}
	}
}