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
			      //修改显示按钮
			       $('#e_mes_x').click(function(){
				        if($('#e_save_main').html() != ''){
						       $('#e_zhezhao').show();
					       	   $('#e_save_mes').html('equx');
					      }else{
					       alert('请选择交易物品');    
					   }  	   
				  	})
				  //添加显示按钮
				  $('#e_mes_t').click(function(){
					       $('#e_zhezhao').show();
				       	   $('#e_save_mes').html('equt');
				  })
				  //赛段点击效果
				  $('.e_banner_div').each(function(){
						  $(this).on('click',function(){
							   $('.e_banner_li').parent().hide();
							   $(this).next().show();
						   })
					  })
				  //赛段点击效果
				  $('.e_banner_li').each(function(){
					    $(this).click(function(){
						      var mes = $(this).attr('title');
						      ajaxFun(mes);
						    })
					  })
				  //ajax 函数
				  function ajaxFun(mes){
						  $('#e_save_main').html(mes);
						  $.ajax({
					  	 		  type:'get',
					  	 		  url:'index.php?c=Game&a=eMes&mes='+mes,
					  	 		  dataType:'text',
					  	 		  success:function(Res){
						  	 		       if(Res == 0){
							  	 		       alert('查找详细信息失败');
						  	 		       }else{
							  	 			Res = eval('('+Res+')');
							  	 			console.log(Res['img'][0].equimg_url);
							  	 			console.log(Res['mes'][0].equ_name);
							  	 			Res = "<p>物品名称："+Res['mes'][0].equ_name+"</p><p>物品类型："+Res['mes'][0].type_name+"</p><p>vip要求："+Res['mes'][0].vr_lev+"</p><p>物品价格："+Res['mes'][0].equ_money+"</p><p>物品描述："
							  	 			+Res['mes'][0].equ_cri+"</p><div><p>商城图片：</p><div style='width:200px;height:100px;overflow:hidden;'><img src='./"+Res['img'][0].equimg_url+"'/></div></div><div><p>比赛图片：</p><div style='width:200px;height:100px;overflow:hidden;'><img src='./"+Res['img'][1].equimg_url+"'/></div></div><div><p>结束图片：</p><div style='width:200px;height:100px;overflow:hidden;'><img src='./"+Res['img'][2].equimg_url
							  	 			+"'/></div></div>";
							  	 			$('#e_mes').html(Res);
						  	 		       }
					       				},
					  	 		  error:function(){
					  	 			    console.log('发送错误');
					  	 			  }	  
					  	 		  })
			       			}
			       $('.e_banner_div').eq(0).trigger('click');//触发点击效果
			       $('.e_banner_li').eq(0).trigger('click');//触发点击效果
				  //删除显示按钮
				  $('#e_mes_s').on('click',function(){
						  if(confirm('确认删除？')){
							  if($('#e_save_main').html() == ''){
								     alert('请选择赛事赛段');
								     return false;
								  }
							  var mes = $('#e_save_main').html();
							  $.ajax({
					  	 		  type:'get',
					  	 		  url:'index.php?c=Game&a=eDele&mes='+mes,
					  	 		  dataType:'text',
					  	 		  success:function(Res){
						  	 		         if(Res == 0){
							  	 		         alert('商品已有记录无法删除');
						  	 		         }else{
							  	 		         alert('删除成功');
										  		 window.location.href ='index.php?a=equip&c=Menu';
						  	 		         } 
					       				},
					  	 		  error:function(){
					  	 			    console.log('发送错误');
					  	 			  }	  
					  	 		  })
						   }
					  })
				  //关闭form页面
				  $('#e_mes_close').click(function(){
					  $('#e_zhezhao').hide();
				  })
				  //图片预览
				   $('.equip_file').change(function(e){
				         var file = e.target.files[0];
				         var fr = new FileReader();//h5提供的新方法
				         fr.onload = function(e){
				              $('#e_preview').attr('src',e.target.result); //h5的心方法
				             }
				         fr.readAsDataURL(file);  //预览图片
					   })
				  //上传修改内容
				  $('#e_sub').click(function(){
					  var title = $('#e_name').val(),
					  	  dif = $('#e_money').val(),
					  	  cri = $('#e_cri').val(),
					  	  mes;
				  	  if(textCheck(title,0,20) && textCheck(dif,0,20) && numCheck(dif) && textCheck(cri,0,200)){
					  	    mes = 'index.php?c=Game&a='+$('#e_save_mes').html()+'&mes='+$('#e_save_main').html();
					  		$('#e_form').attr('action',mes);
					  		$('#e_form').submit();
					    }
				  		//window.location.href ='index.php?a=equt&c=Game';
				  })
				  //验证方法  传入验证字符与需要的字符长度
				  function textCheck(mes,min,max){
						  if(mes == ''){
							  alert('填写完整内容');
						  }else if(mes.length > max){
							  alert('字数过长');
						  }else if(mes.length < min){
							  alert('字数过短');
						  }else{
							  return true;
						  }
						  return false;
			       }
			       //验证输入为数字
			       function numCheck(mes){
			    	    var reg = /^[0-9]*$/;
						if(reg.test(mes)){
							return true;
						}else{
							alert('需要为数字');
							return false;
						}
			       }
		      })
		      
			</script>
	</head>
	<body>
	<div id="e_save_mes" class="displayNone"></div>
	<div class="displayNone" id="e_save_main"></div>
	<div id="e_zhezhao">
	   <div>
	      <input type="button" id="e_mes_close" class="all_buttom_style" value="关闭"/><br>
	      <form action="index.php" id="e_form" method="post"  class="equip_form" enctype="multipart/form-data">
	        <input type="text" id="e_name" name="name" class="input_margin" placeholder="名称,不能与原装备同名"/><br>
	      	<input type="text" id="e_cri" name="cri"  class="input_margin" placeholder="装备描述"/><br>
	        <input type="text" id="e_money" name="money" class="input_margin" placeholder="装备价格，为数字"/><br>
	        <select name="type_id" class="input_margin"><br>
				<?php 
				  foreach ($data['data'] as $mes1){
                      echo "<option value='{$mes1['type_id']}'>{$mes1['type_name']}</option>";
					}
				?>
			</select>
			<select name="vr_id" class="input_margin">
				<?php 
				  foreach ($data['vip'] as $mes2){
                      echo "<option value='{$mes2['vr_id']}'>{$mes2['vr_lev']}</option>";
					}
				?>
			</select>
			<select name="rule_id" class="input_margin">
				<?php 
				  foreach ($data['exp'] as $mes3){
                      echo "<option value='{$mes3['rule_id']}'>{$mes3['need_exp']}</option>";
					}
				?>
			</select>
			<label>展示图片：</label>
			<input type="file" multiple="multiple" accept="image/png" class="equip_file input_margin" id="file" name="show_file"/><br>
			<label>游戏图片：</label>
			<input type="file" multiple="multiple" accept="image/png" class="equip_file input_margin" id="file" name="game_file"/><br>
			<label>获胜图片：</label>
			<input type="file" multiple="multiple" accept="image/png" class="equip_file input_margin" id="file" name="win_file"/><br>
			<input type="button" id="e_sub" value="完成"/>
		  </form>
		  <div class="show_img"><img id="e_preview" /></div>
	   </div>
	</div>
		<div class="cebian">
			<div id="e_banner_menu">
              		<?php
					foreach ($data['data'] as $menu){
					       echo "<div class='e_banner_div cebian_style_div'>{$menu['type_name']}";
					       echo "</div><ul>";
					    foreach ($data['equip'] as $menu1){
					        if($menu1['type_id'] == $menu['type_id']){
					            echo "<li class='e_banner_li map_banner_li' title='{$menu1['equ_id']}'>{$menu1['equ_name']}</li>";
					        }
					    }
					    echo "</ul>";  
					}
					?>
    		</div>
		</div>
		<div id="e_mes">
		  
		</div>
		<div  class="input_set">
		 <input type="button" id="e_mes_t" class="all_buttom_style" value="添加"/><br>
		 <input type="button" id="e_mes_s" class="all_buttom_style" value="删除"/><br>
		 <input type="button" id="e_mes_x" class="all_buttom_style" value="修改"/><br>
		</div>
		
	</body>
</html>