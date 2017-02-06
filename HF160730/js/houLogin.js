$(function(){
	$('#user').blur(blurEmpty($('#user'),'user'));
	$('#pwd').blur(blurEmpty($('#pwd'),'password'));
	$('#code').blur(blurEmpty($('#code'),'code'));
	function blurEmpty(div,mes){
		div.blur(function(){
			if(div.val() == ''){
				$('#wrongtips').text(mes+'cant be empty');
			}else{
				$('#wrongtips').text('right');
			}
		})
	}
//	$('#login').click(function(){
//		if($('#user').val()!='' && $('#pwd').val()!='' && $('#code').val()!=''){
//			console.log('come in');
//			var sendData = {'user':$('#user').val(),
//					'password':$('#pwd').val(),
//					'code':$('#code').val()};
//			$.ajax({
//				type:"POST",
//				url:"../core/Factory.php?c=Login & a=login",
//				data:sendData,
//				dataType:'text',
//				success:function(msg){
//					console.log(msg);
//					  $('body').attr('src',msg);
//				},
//				error:function(){
//					console.log('ajax is wrong!');
//				}
//			})
//		}else{
//			$('#wrongtips').text('cant be empty!!');
//		}
//	})
})
