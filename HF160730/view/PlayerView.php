<?php 
    if(empty($_SESSION['user']))
    {
        header("location:./index.php"); 
    }
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<link rel="stylesheet" type="text/css" href="./css/HF160730.css"/>
		<script src="./js/jquery-3.1.0.min.js"></script>
		<script type="text/javascript">
		      $(function(){
			      //侧边栏按钮跳转
			       $('#search').click(function(){
					  user = $("#user").val();
					 window.location.href ='index.php?a=search&c=Menu&s='+user;
				  	})
				  	//详细信息
			  	   $('.player_mes').each(function(){
				  	   $(this).on('click',function(){
					  	   var mes = $(this).siblings().eq(0).html();
					  	   $('#player_save_mes').html(mes);                   //保存玩家信息
						  	 $.ajax({
					  	 		  type:'get',
					  	 		  url:'index.php?c=User&a=mes&mes='+mes,
					  	 		  dataType:'text',//改成json直接传过来当对象
					  	 		  success:function(Res){
						  	 		  		Res = eval('('+Res+')');
							  	 			$('#player_zhezhao').show();
							  	 			Res = "<p>玩家账号："+Res[0].u_nik+"</p><p>玩家等级："+Res[0].rule_id+"</p><p>vip等级："+Res[0].vr_lev+"</p><p>账户余额："+Res[0].u_money+"</p>";
							  	 			$('.player_main_ses').html(Res);
					       				},
					  	 		  error:function(){
					  	 			    console.log('发送错误');
					  	 			  }	  
					  	 		  })
				  	   })
			  	   })
			       //用户装备
			  	   $('#search_e').click(function(){
				  	     var mes = 'search_e' + ';' + $('#player_save_mes').html();
				  		 $('#player_main_mes').attr('src','index.php?c=Menu&a=main&mes='+mes);
			  	   })
			  	    //充值记录
			  	   $('#search_c').click(function(){
				  	     var mes = 'search_c' + ';' + $('#player_save_mes').html();
				  		 $('#player_main_mes').attr('src','index.php?c=Menu&a=main&mes='+mes);
			  	   })
			  	    //经验记录
			  	   $('#search_j').click(function(){
				  	     var mes = 'search_j' + ';' + $('#player_save_mes').html();
				  		 $('#player_main_mes').attr('src','index.php?c=Menu&a=main&mes='+mes);
			  	   })
			  	   //关闭用户详情
			  	   $('#player_mes_close').click(function(){
				  		 $('#player_zhezhao').hide();
			  	   })
			  	   //解锁按钮
			  	    $('.player_lock').each(function(){
				  	    var mes = $(this).parent().siblings().eq(7).html();
				  	    if(mes == 0){
					  	    $(this).val('锁定');
				  	    }else{
				  	    	$(this).val('解锁');
				  	    }
				  	   $(this).on('click',function(){
					  	   mes = mes + ';' + $(this).parent().siblings().eq(0).html();
					  	   var self = this;
						  	 $.ajax({
					  	 		  type:'get',
					  	 		  url:'index.php?c=User&a=lock&mes='+mes,
					  	 		  dataType:'text',//改成json直接传过来当对象
					  	 		  success:function(Res){
							  	 			if(Res == 2){
											  	   alert('修改失败');
								  	        }else{
											  	   alert('修改成功');
										  		 $(self).parent().siblings().eq(7).html(Res);
										  		 if(Res == 1){
										  			$(self).val('解锁');
										  		 }else{
										  			$(self).val('锁定');
										  		 }
									  	   }
					       				},
					  	 		  error:function(){
					  	 			    console.log('发送错误');
					  	 			  }	  
					  	 		  })
				  	   })
			  	   })
			  	   
		      })
		      
			</script>
	</head>
	<body>
	<div id="player_save_mes"></div>
	<div id="player_zhezhao">
	   <div class="player_mes_main">
	      <div id="player_main">
	        <input type="button" class="player_buttom_style" id="player_mes_close" value="关闭"/>
	        <div class="player_main_ses"></div>
	        <input type="button" id="search_e" class="player_buttom_style" value="拥有装备"/>
	        <input type="button" id="search_c" class="player_buttom_style" value="充值记录"/>
	        <input type="button" id="search_j" class="player_buttom_style" value="经验记录"/>
	      </div>
	      <iframe id="player_main_mes" class="player_frame"></iframe>
	   </div>
	</div>
		<div class="safe_style safe_login">
		    <input type="text" placeholder="username" id="user" class="input_style"/>
			<input type="button" id="search" value="搜索"/>
			<div id="table">
                <table border="1" id="player_table">
                <?php 
                
                echo "<tr><td>玩家id</td><td>玩家账号</td><td>玩家等级</td><td>VIP等级</td><td>注册时间</td><td>最后登录</td><td>金币余额</td><td>用户状态</td><td>详细信息</td><td>权限操作</td></tr>";
                  foreach ($data['data'] as $i=>$vals){
                    echo "<tr>";
                    foreach ($vals as $val){
                      echo "<td>{$val}</td>";
                    }
                    echo "<td class='player_mes'>详细信息</td><td><input class='player_lock' type='button' value='锁定'/></td>";
                    echo "</tr>";
                }
                ?>
                </table>
    		</div>
    		<div>
    		<?php 
                    echo $data['out'];
                    ?>
    		</div>
		</div>
		
	</body>
</html>