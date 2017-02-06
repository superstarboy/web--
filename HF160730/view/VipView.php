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
			      //添加vip规则显示按钮
			       $('#add_vip').click(function(){
				       $('#vip_zhezhao').show();
				       $('#vip_save_mes').html('vipt');
				  	})
				  //修改vip规则显示按钮
				  $('.vip_change').each(function(){
					  $(this).on('click',function(){
						 $('#vip_zhezhao').show();
						 $('#vip_save_mes').html('vipx');
						 $('#vip_save_no').html($(this).siblings().eq(0).html());
					  })
				  })
				  //删除vip规则公告按钮
				  $('.vip_drop').each(function(){
					  $(this).on('click',function(){
						  if(confirm('确认删除？')){
							  var mes = $(this).siblings().eq(0).html();
							  $.ajax({
					  	 		  type:'get',
					  	 		  url:'index.php?c=Game&a=vips&mes='+mes,
					  	 		  dataType:'text',
					  	 		  success:function(Res){
						  	 		         if(Res == 0){
							  	 		         alert('删除失败');
						  	 		         }else{
							  	 		         alert('删除成功');
										  		 window.location.href ='index.php?a=vip&c=Menu';
						  	 		         } 
					       				},
					  	 		  error:function(){
					  	 			    console.log('发送错误');
					  	 			  }	  
					  	 		  })
						   }
					  })
				  })
				  //关闭修改添加页面
				  $('#vip_mes_close').click(function(){
					  $('#vip_zhezhao').hide();
				  })
				  //上传修改内容
				  $('#vip_mes_work').click(function(){
					  var lev = $('#vip_title').val(),
					  	  money = $('#vip_con').val(),
					  	  no = $('#vip_save_no').html(),
					  	  mes = lev + ';' + money + ';' + no;
				  	  if(textCheck(lev,0,20) && textCheck(money,0,20) && numCheck(money)){
					  		$.ajax({
					  	 		  type:'get',
					  	 		  url:'index.php?c=Game&a='+$('#vip_save_mes').html()+'&mes='+mes,
					  	 		  dataType:'text',
					  	 		  success:function(Res){
						  	 		         if(Res == 0){
							  	 		         alert('操作失败');
						  	 		         }else{
							  	 		         alert('操作成功');
									  	 		 window.location.href ='index.php?a=vip&c=Menu';
						  	 		         }
					       				},
					  	 		  error:function(){
					  	 			    console.log('发送错误');
					  	 			  }	  
					  	 		  })
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
	<div id="vip_save_mes" class="displayNone"></div>
	<div id="vip_save_no" class="displayNone"></div>
	<div id="vip_zhezhao">
	      <div id="vip_main" class="form_div">
	        <input type="button" id="vip_mes_close" class="all_buttom_style" value="关闭"/><br>
	        <input type="text" id="vip_title" class="input_margin" placeholder="等级名称"/><br>
	        <input type="text" id="vip_con" class="input_margin" placeholder="充值额度"/><br>
	        <input type="button" id="vip_mes_work" class="input_margin all_buttom_style" value="完成"/>
	      </div>
	</div>
		<div class="safe_style safe_login">
			<div id="table">
			     <input type="button" id="add_vip" value="添加规则"/>
                <table border="1" id="vip_table">
                <?php 
                
                echo "<tr><td>编号</td><td>VIP等级</td><td>充值额度</td><td>规则管理</td></tr>";
                  foreach ($data['data'] as $i=>$vals){
                    echo "<tr>";
                    foreach ($vals as $val){
                      echo "<td>{$val}</td>";
                    }
                    echo "<td class='vip_change'>更改</td><td class='vip_drop'>删除</td>";
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