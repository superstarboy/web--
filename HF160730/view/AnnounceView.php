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
			      //添加公告显示按钮
			       $('#add_annou').click(function(){
				       $('#annou_zhezhao').show();
				       $('#annou_save_mes').html('t');
				  	})
				  //修改公告显示按钮
				  $('.annou_change').each(function(){
					  $(this).on('click',function(){
						 $('#annou_zhezhao').show();
						 $('#annou_save_mes').html('x');
						 $('#annou_save_no').html($(this).siblings().eq(0).html());
					  })
				  })
				  //删除公告按钮
				  $('.annou_drop').each(function(){
					  $(this).on('click',function(){
						  if(confirm('确认删除？')){
							  var mes = $(this).siblings().eq(0).html();
							  $.ajax({
					  	 		  type:'get',
					  	 		  url:'index.php?c=Game&a=s&mes='+mes,
					  	 		  dataType:'text',
					  	 		  success:function(Res){
								  	 		  if(Res == 0){
									  	 		  alert('删除失败');
								  	 		  }else{
									  	 		  alert('删除成功');
											  	  window.location.href ='index.php?a=announce&c=Menu';
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
				  $('#annou_mes_close').click(function(){
					  $('#annou_zhezhao').hide();
				  })
				  //上传修改内容
				  $('#annou_mes_work').click(function(){
					  var title = $('#annou_title').val(),
					  	  con = $('#annou_con').val(),
					  	  times = $('#annou_validtime').val(),
					  	  no = $('#annou_save_no').html(),
					  	  mes = title + ';' + con + ';' + times + ';' + no;
				  	  if(textCheck(title,0,50) && textCheck(con,0,200) && textCheck(times,0,10)){
					  		$.ajax({
					  	 		  type:'get',
					  	 		  url:'index.php?c=Game&a='+$('#annou_save_mes').html()+'&mes='+mes,
					  	 		  dataType:'text',
					  	 		  success:function(Res){
							  	 			if(Res == 0){
											  	   alert('操作失败');
								  	        }else{
											  	 alert('操作成功');
											  	 window.location.href ='index.php?a=announce&c=Menu';
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
		      })
		      
			</script>
	</head>
	<body>
	<div id="annou_save_mes"></div>
	<div id="annou_save_no" class="displayNone"></div>
	<div id="annou_zhezhao">
	      <div id="annou_main">
	        <input type="button" id="annou_mes_close" value="关闭"/><br>
	        <input type="text" id="annou_title" class="input_margin" placeholder="公告标题"/><br>
	        <input type="text" id="annou_con" class="input_margin" placeholder="公告内容"/><br>
	        <span>过期时间</span><input type="date" class="input_margin" id="annou_validtime"/><br>
	        <input type="button" id="annou_mes_work" class="input_margin" value="完成"/>
	      </div>
	</div>
		<div class="safe_style safe_login">
			<div id="table">
			     <input type="button" id="add_annou" value="添加公告"/>
                <table border="1" id="annou_table">
                <?php 
                
                echo "<tr><td>编号</td><td>公告标题</td><td>公告内容</td><td>过期时间</td><td>发布时间</td></tr>";
                  foreach ($data['data'] as $i=>$vals){
                    echo "<tr>";
                    foreach ($vals as $val){
                      echo "<td>{$val}</td>";
                    }
                    echo "<td class='annou_change'>更改</td><td class='annou_drop'>删除</td>";
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
