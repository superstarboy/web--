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
			       $('#map_mes_x').click(function(){
				        if($('#map_save_main').html() != ''){
						       $('#map_zhezhao').show();
					       	   $('#map_save_mes').html('mapx');
					      }else{
					       alert('请选择赛事赛段');    
					   }  	   
				  	})
				  //添加显示按钮
				  $('#map_mes_t').click(function(){
					       $('#map_zhezhao').show();
				       	   $('#map_save_mes').html('mapt');
				  })
				  //赛段点击效果
				  $('.map_banner_div').each(function(){
						  $(this).on('click',function(){
							   $('.map_banner_li').parent().hide();
							   $(this).next().show();
							   var mes = $(this).attr('title');
							   ajaxFun(mes);
						   })
					  })
				  //赛段点击效果
				  $('.map_banner_li').each(function(){
					    $(this).click(function(){
						      var mes = $(this).attr('title');
						      ajaxFun(mes);
						    })
					  })
				  //ajax 函数
				  function ajaxFun(mes){
						  $('#map_save_main').html(mes);
						  $.ajax({
					  	 		  type:'get',
					  	 		  url:'index.php?c=Game&a=mapMes&mes='+mes,
					  	 		  dataType:'text',
					  	 		  success:function(Res){
						  	 		       if(Res == 0){
							  	 		       alert('查找详细信息失败');
						  	 		       }else{
							  	 			Res = eval('('+Res+')');
							  	 			var img = Res[0].game_img;
							  	 			img = img.replace(/\s/g, "");
							  	 			Res = "<p>赛段名称："+Res[0].game_name+"</p><div>赛段图片：<div style='width:200px;height:200px;overflow:hidden;'><img src='"+img+"'/></div></div>";
							  	 			$('#map_mes').html(Res);
						  	 		       }
					       				},
					  	 		  error:function(){
					  	 			    console.log('发送错误');
					  	 			  }	  
					  	 		  })
			       			}
			       $('.map_banner_div').eq(0).trigger('click');//触发点击效果
			       $('.map_banner_li').eq(0).trigger('click');//触发点击效果
				  //删除显示按钮
				  $('#map_mes_s').on('click',function(){
						  if(confirm('确认删除？')){
							  if($('#map_save_main').html() == ''){
								     alert('请选择赛事赛段');
								     return false;
								  }
							  var mes = $('#map_save_main').html();
							  $.ajax({
					  	 		  type:'get',
					  	 		  url:'index.php?c=Game&a=mapDele&mes='+mes,
					  	 		  dataType:'text',
					  	 		  success:function(Res){
						  	 		         if(Res == 0){
							  	 		         alert('该赛事赛段已有记录无法删除');
						  	 		         }else{
							  	 		         alert('删除成功');
										  		 window.location.href ='index.php?a=map&c=Menu';
						  	 		         } 
					       				},
					  	 		  error:function(){
					  	 			    console.log('发送错误');
					  	 			  }	  
					  	 		  })
						   }
					  })
				  //关闭form页面
				  $('#map_mes_close').click(function(){
					  $('#map_zhezhao').hide();
				  })
				  //图片预览
				   $('#file').change(function(e){
				         var file = e.target.files[0];
				         var fr = new FileReader();//h5提供的新方法
				         fr.onload = function(e){
				              $('#map_preview').attr('src',e.target.result); //h5的心方法
				             }
				         fr.readAsDataURL(file);  //预览图片
					   })
				  //上传修改内容
				  $('#map_sub').click(function(){
					  var title = $('#map_title').val(),
					  	  dif = $('#map_dif').val(),
					  	  mes;
				  	  if(textCheck(title,0,20) && textCheck(dif,0,20) && numCheck(dif)){
					  	    mes = 'index.php?c=Game&a='+$('#map_save_mes').html()+'&mes='+$('#map_save_main').html();
					  		$('#map_x').attr('action',mes);
					  		$('#map_x').submit();
					    }
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
	<div id="map_save_mes" class="displayNone"></div>
	<div class="displayNone" id="map_save_main"></div>
	<div id="map_zhezhao">
	      <input type="button" id="map_mes_close" class="all_buttom_style" value="关闭"/><br>
	      <form action="index.php" id="map_x" method="post" enctype="multipart/form-data"  class="form_div"><br>
	      	<input type="text" id="map_title" name="name" class="input_margin" placeholder="名称"/><br>
	        <input type="text" id="map_dif" name="lev" class="input_margin" placeholder="难度，为数字"/><br>
	        <select class="input_margin" name="fid">
	           <option value="0">赛事（大地图）</option>
				<?php 
				  foreach ($data['data'] as $mes){
                       if($mes['game_fid'] == 0){
                          echo "<option value='{$mes['game_id']}'>{$mes['game_name']}</option>";
                       }
					}
				?>
			</select><br>
			<label>选择文件：</label>
			<input class="input_margin" type="file" multiple="multiple" accept="image/png" id="file" name="file"/><br>
			<input type="button" class="input_margin all_buttom_style" id="map_sub" value="完成"/>
		  </form>
		  <div class="show_img"><img id="map_preview" /></div>
	</div>
		<div class="cebian">
			<div id="map_banner_menu">
              		<?php
					foreach ($data['data'] as $item=>$menu){
					    if($menu['game_fid'] == 0){
					        echo "<div  title='{$menu['game_id']}' class='map_banner_div cebian_style_div'>{$menu['game_name']}";
					       echo "</div><ul>";
					    foreach ($data['data'] as $item=>$menu1){
					        if($menu1['game_fid'] == $menu['game_id']){
					            echo "<li class='map_banner_li' title='{$menu1['game_id']}'>{$menu1['game_name']}</li>";
					        }
					    }
					    echo "</ul>";  
					    }
					}
					?>
    		</div>
		</div>
		<div id="map_mes">
		  
		</div>
		<div  class="input_set">
		 <input type="button" id="map_mes_t" class="all_buttom_style" value="添加"/><br>
		 <input type="button" id="map_mes_s" class="all_buttom_style" value="删除"/><br>
		 <input type="button" id="map_mes_x" class="all_buttom_style" value="修改"/><br>
		</div>
		
	</body>
</html>