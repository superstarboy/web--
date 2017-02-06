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
			/**
			 * 
			 * 获取当前时间
			 */
			
		   $(function(){
			   function p(s) {
				    return s < 10 ? '0' + s: s;
				}
			   var myDate = new Date();
				var year=myDate.getFullYear();
				var month=myDate.getMonth()+1;
				var date=myDate.getDate(); 
		
				var now=year+'-'+p(month)+"-"+p(date);
				$('.li_style').html(now);
			   $('.cebian>div').each(function(){
				   $(this).on('click',function(){
					   $(this).addClass('cebian_click_hover').children().show().end().siblings().removeClass('cebian_click_hover').children().hide();
				   })
			   })
			   $('.cebian>div').eq(0).trigger('click');//触发点击效果
			   
			   $('#logout').click(function(){
				   if(confirm('确认注销？')){
					   window.location.href ='index.php?a=logout&c=Login';
				   }
			   })
			   
		   })
		   function clickhande(url){
                   $('#manu_user_mes').attr('src','index.php?'+url);
               }
		</script>
	</head>
	<body>
		<div class="safe banner">
			<div class="safe_div">
				<div class="logo">越野机车管理后台</div>
				<div class="li_style"></div>
				<div id="admin_name" class="adminname"><?php echo $data['admin'] ?></div>
				<input type="button" value="注销" class="adminrelo" id="logout"/>
			</div>
		</div>
		<div class="safe">
			<div class="safe_div">
				<div class="cebian">
				<?php
					foreach ($data['data'] as $item=>$menu){
					    if($menu['m_fid'] == 0){
					        echo "<div title='{$menu['m_url']}' class='cebian_style_div'>{$menu['m_name']}";
					       echo "<ul>";
					    foreach ($data['data'] as $item=>$menu1){
					        if($menu1['m_fid'] == $menu['m_id']){
					            echo "<li class='cebian_style_li' onclick=clickhande('{$menu1['m_url']}')>{$menu1['m_name']}</li>";
					        }
					    }
					    echo "</ul></div>";  
					    }
					}
					?>
				</div>
				<div class="menu_iframe_style">
				<iframe id="manu_user_mes" src="index.php?c=Menu&a=player"></iframe>
				</div>
				
			</div>
		</div>
		<div class="safe banner">
			<div class="safe_div">
			
				
			</div>
		</div>
	</body>
	
</html>
