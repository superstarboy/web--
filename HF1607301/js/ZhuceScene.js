/**
 * Created by Administrator on 2016/10/17.
 */
function ZhuceScene(fun){

    this.$div = $('<div></div>');
    this.$form = $('<form></form>');
    this.$div_1 = $('<div></div>');//用户名的div
    this.$div_2 = $('<div></div>');//密码的div
    this.$div_3 = $('<div></div>');//确认密码div
    this.$user_name = $('<input type="text" name="username" placeholder="用户名"/>');
    this.$psw = $('<input type="password" name="psw1" id="psw1" placeholder="密码"/>');
    this.$psw2 = $('<input type="password" name="psw2" placeholder="确认密码"/>');
    this.$zhuce = $('<input type="button" name="注册"/>');
    this.$leve = $('<input type="button" name="leve"/>');
    this.$back = $('<input type="button" name="back"/>');//返回按钮
    //创建按键，感觉自己好逗，一个一个敲
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
    //============================================================================
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
    this.$label2 = $('<label class="error" for="psw1"></label>');
    this.$label2.css({
        color:'red',
        position: 'relative',
        top: '20px',
        left:'130px',
        height:'20px',
        display:'inline-block'
    });
    this.$label3 = $('<label class="error" for="psw2"></label>');
    this.$label3.css({
        color:'red',
        position: 'relative',
        top: '20px',
        left:'130px',
        height:'20px',
        display:'inline-block'
    });

    //拼装这些部件
    this.$div.append(this.$form);
    this.$form.append(this.$div_1);
    this.$div_1.append(this.$user_name);
    this.$div_2.append(this.$psw);
    this.$div_3.append(this.$psw2);
    this.$div_1.append(this.$label);
    this.$div_2.append(this.$label2);
    this.$div_3.append(this.$label3);
    this.$form.append(this.$div_2);
    this.$form.append(this.$div_3);
    this.$form.append(this.$zhuce);
    this.$div.append(this.$leve);
    this.$div.append(this.$music_con);
    this.$div.append(this.$back);

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
        margin: '40px 0px 0px 55px'
    });
    this.$div_2.css({
        'background-image':"url('src/imge/9.png')",
        width: '387px',
        height:'62px' ,
        margin: '40px 0px 0px 55px'
    });
    this.$div_3.css({
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
    this.$psw2.css({
        'background-color': 'rgba(0,0,0,0.5)',
        color:'rgb(233,226,41)',
        'font-size': '20px',
        'margin-top': '15px',
        'margin-left': '130px',
        width:'200px'
    });
    this.$zhuce.css({
        background: 'url(src/imge/15.png)',
        position: 'absolute',
        border: '0px',
        bottom: '40px',
        right: '160px',
        width: '163px',
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
    this.$back.css({
        background: 'url(src/imge/16.png) no-repeat center',
        width: '58px',
        height: '58px',
        border: '0px'
    });
    //纵欲完成了，以后再也不这么干了，好逗啊




    //==============================================昵称的div加入
    this.$nickname = $('<div id="nickname" style="width: 200px;height: 90px;position:relative;top:200px;background:yellow;margin: auto;padding: 30px 50px;">' +
        '<input type="text" style="height:20px;width: 200px;"placeholder="请输入你的昵称"/>' +
        '<input type="button" value="确定" style="border-radius:10px;height: 50px;width: 100px;margin: 20px 0px 0px 50px;"/></div>');
    this.$body = $('<div style="position: fixed;z-index: 5;width:960px;height:100%;display: none;"></div>');//模糊层

    this.$div.prepend(this.$body);
    this.$body.prepend(this.$nickname);


    //给注册按钮挂跳转事件

    //=======================================校验方法


    this.$form.validate({
        rules:{
            username:{
                required:true,            //必填字段
                digits:true,               //只能为数字
                myrule:[8,10]              //输入字符串长度大于8小于10
            },
            psw1:{
                required:true,            //必填字段
                nickname:true,             //只能数字字母下划线
                myrule:[8,10]              //输入字符串长度大于8小于10
            },
            psw2:{
                equalTo:'#psw1'
            }
        },
        messages:{
            userName:{
            },
            psw1:{
            },
            psw2:{
                equalTo:'密码不一致'
            }
        }
    });


    this.$zhuce.on('click',function(){
                                                                //注册
        if($("form").valid()){
        	var mes = self.$user_name.val();
        	$.ajax({
	  	 		  type:'post',
	  	 		  url:'index.php?c=Login&a=register',
	  	 		  data:"mes=" + mes,
	  	 		  dataType:'text',
	  	 		  success:function(Res){
	  	 			       console.log(Res);
		  	 		         if(Res == 0){
			  	 		         alert('用户已注册，请登录');
		  	 		         }else{
			  	 		         alert('注册成功');
			  	 		         self.$body.show();
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
//昵称的点击确定
    this.$nickname.children().eq(1).click(function(){
       var mes = $(this).siblings().val();
        console.log('这3个来自注册：'+mes);
        console.log(self.$user_name.val()+1);
        console.log(self.$psw.val()+2);

        if(mes != ''){
            UserLogin(mes);
        }
    });
    //写入信息与页面跳转
    function UserLogin(mess){
    	var mes = self.$user_name.val() + ";" + self.$psw.val() + ";" + mess;
    	$.ajax({
  	 		  type:'post',
  	 		  url:'index.php?c=Login&a=register_write',
  	 		  data:"mes=" + mes,
  	 		  dataType:'text',
  	 		  success:function(Res){
  	 			       console.log(Res);
	  	 		         if(Res == 0){
		  	 		         alert('新用户写入信息失败，请检查console.log');
	  	 		         }else{
		  	 		         alert('即将跳转');
		  	 		         localStorage.uid = JSON.stringify(Res);
		  	 		         fun('cut');
	  	 		         } 
       				},
  	 		  error:function(){
  	 			    console.log('发送错误');
  	 			  }	  
  	 		  })
    };



    //返回点击事件
    this.$back.on('click',function(){
        fun('login');
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