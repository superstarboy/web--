/**
 * Created by Administrator on 2016/10/13.
 */
function LoginScene(fun){
    this.$div = $('<div></div>');
    this.$form = $('<form></form>');
    this.$div_1 = $('<div></div>');//用户名的div
    this.$div_2 = $('<div></div>');//密码的div
    this.$user_name = $('<input type="text" name="username" placeholder="用户名"/>');
    this.$psw = $('<input type="password" name="pwd1" placeholder="密码"/>');
    this.$login = $('<input type="button" name="login"/>');
    this.$zhuce = $('<input type="button" name="zhuce"/>');
    this.$leve = $('<input type="button" name="leve"/>');
    var self = this;

    //==============================================
    //插入音乐播放
    var $audio = $('<audio src="src/assets/music/Theme.m4a" autoplay="autoplay" loop="loop"></audio>'),
        music = 1;
    this.$div.append($audio);
    this.$music_con = $('<input type="button" name="music_con"/>');

    this.$music_con.click(function(){
        if(music == 1){
            $audio[0].pause();
            music = 0;
            self.$music_con.css({
               background:'url(src/imge/audio/2.png) no-repeat center'
            });
        }else{
            $audio[0].play();
            music = 1;
            self.$music_con.css({
                background:'url(src/imge/audio/1.png) no-repeat center'
            });
        }
    });
    //创建按键，感觉自己好逗，一个一个敲


    //给所有节点添加css
    this.$div.css({
        'background-image': "url('src/imge/1.png')",
        width:'960px',
        height:'640px',
        position:'relative',
        margin: 'auto'
    });
    this.$form.css({
        height:'424px',
        width:'509px',
        position:'absolute',
        'background-image':"url('src/imge/2.png')",
        top: '100px',
        left: '225px'
    });
    this.$div_1.css({
        'background-image':"url('src/imge/26.png')",
        width: '387px',
        height:'62px' ,
        margin: '80px 0px 0px 55px'
    });
    this.$div_2.css({
        'background-image':"url('src/imge/9.png')",
        width: '387px',
        height:'62px' ,
        margin: '40px 0px 0px 55px'
    });
    this.$user_name.css({
        'background-color': 'rgba(0,0,0,0.5)',
        color:'rgb(233,226,41)',
        'font-size': '20px',
        'margin-top': '15px',
        'margin-left': '130px',
        width:'200px'
    });
    this.$psw.css({
        'background-color': 'rgba(0,0,0,0.5)',
        color:'rgb(233,226,41)',
        'font-size': '20px',
        'margin-top': '15px',
        'margin-left': '130px',
        width:'200px'
    });
    this.$login.css({
        background: 'url(src/imge/13.png)',
        position: 'absolute',
        border: '0px',
        bottom: '80px',
        left: '60px',
        width: '131px',
        height: '36px'
    });
    this.$zhuce.css({
        background: 'url(src/imge/14.png)',
        position: 'absolute',
        border: '0px',
        bottom: '80px',
        right: '80px',
        width: '131px',
        height: '36px'
    });
    this.$leve.css({
        background: 'url(src/imge/25.png)',
        width: '58px',
        height: '58px',
        border: '0px'
    });
    this.$music_con.css({
        background: 'url(src/imge/audio/1.png) no-repeat center',
        width: '58px',
        height: '58px',
        border: '0px'
    });
    //纵欲完成了，以后再也不这么干了，好逗啊


    //创建label标签
    this.$label = $('<label class="error" for="username"></label>');
    this.$label.css({
        color:'red',
        position: 'relative',
        top: '20px',
        left:'130px',
        height:'20px',
        display:'inline-block'
    });
    this.$label2 = $('<label class="error" for="pwd1"></label>');
    this.$label2.css({
        color:'red',
        position: 'relative',
        top: '20px',
        left:'130px',
        height:'20px',
        display:'inline-block'
    });
    //拼装这些部件
    this.$div.append(this.$form);
    this.$div_1.append(this.$user_name);
    this.$div_2.append(this.$psw);
    this.$form.append(this.$div_1);
    this.$form.append(this.$div_2);
    this.$div_1.append(this.$label);      //插入错误提示标签
    this.$div_2.append(this.$label2);
    this.$form.append(this.$login);
    this.$form.append(this.$zhuce);
    this.$div.append(this.$leve);
    this.$div.append(this.$music_con);


    //给注册按钮挂跳转事件
    this.$zhuce.on('click',function(){ //跳转到注册界面
        fun('zhuce');
    });
    //=======================================校验方法


    this.$form.validate({
        rules:{
            username:{
                required:true,            //必填字段
                digits:true,               //只能为数字
                myrule:[8,10]              //输入字符串长度大于8小于10
            },
            pwd1:{
                required:true,            //必填字段
                nickname:true,             //只能数字字母下划线
                myrule:[8,10]              //输入字符串长度大于8小于10
            }
        },
        messages:{
            userName:{
            },
            pwd1:{
            }
        }
    });


    this.$login.on('click',function(){ //进行登录
        if($("form").valid()){
        	var mes = self.$user_name.val() + ';' + self.$psw.val();
        	//坑爹ajax登录链接
        	$.ajax({
	  	 		  type:'post',
	  	 		  url:'index.php?c=Login&a=login',
	  	 		  data:"mes=" + mes,
	  	 		  dataType:'text',
	  	 		  success:function(Res){
	  	 			       console.log(Res);
		  	 		         if(Res == 0){
			  	 		         alert('用户名或密码错误');
		  	 		         }else{
			  	 		         alert('登陆成功');
			  	 		         localStorage.uid = JSON.stringify(Res);
			  	 		         fun('cut');
		  	 		         } 
	       				},
	  	 		  error:function(){
	  	 			    console.log('发送错误');
	  	 			  }	  
	  	 		  })
        }else{
            alert("请正确填写信息");
        }

    });


    //建立版本信息框
    var $banben = $('<div></div>');
    $banben.html('<p>越野机车：1.0</p>' +
        '<p>by：HF160730</p>' +
        '<input type="button" value="关闭"/>');
    this.$div.append($banben);
    $banben.css({
        height:'120px',
        width:'100px',
        position:'absolute',
        top:'200px',
        left:'100px',
        background:'yellow',
        margin: 'auto',
        padding: '10px 30px',
        display:'none'
    });
    //显示版本信息
    this.$leve.click(function(){
        $banben.show();
    });
   $banben.children().last().click(function(){
      $banben.hide();
   });




}