/**
 * Created by Administrator on 2016/10/18.
 */
function MainScene(fun){

    this.$div = $('<div></div>');
    this.$div_safe = $('<div></div>');//安全距离div
    this.$single = $('<input type="button" name="single"/>');                          //单人游戏
    this.$multiplayer = $('<input type="button" name="multiplayer"/>');              //多人游戏
    this.$shopping = $('<input type="button" name="shopping"/>');                     //商店
    this.$leve = $('<input type="button" name="leve"/>');                               //设置按钮
    this.$back = $('<input type="button" name="back"/>');//返回按钮                               //返回按钮


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


    //添加样式
    this.$div.css({
        'background-image': "url('src/imge/pattern.jpg')",
        width:'960px',
        height:'639px',
        position:'relative',
        margin: 'auto'
    });
    this.$leve.css({
        background: 'url(src/imge/25.png)',
        width: '58px',
        height: '58px',
        border: '0px'
    });
    this.$single.css({
        background: 'url(src/imge/27.png)',
        position: 'absolute',
        border: '0px',
        bottom: '100px',
        left: '40px',
        width: '263px',
        height: '69px'
    });
    this.$multiplayer.css({
        background: 'url(src/imge/28.png)',
        position: 'absolute',
        border: '0px',
        bottom: '100px',
        'margin-left': '350px',
        width: '263px',
        height: '69px'
    });
    this.$shopping.css({
        background: 'url(src/imge/29.png)',
        position: 'absolute',
        border: '0px',
        bottom: '100px',
        right: '40px',
        width: '263px',
        height: '69px'
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


    //拼装这些部件
    this.$div.append(this.$single);
    this.$div.append(this.$multiplayer);
    this.$div.append(this.$shopping);
    this.$div.append(this.$leve);
    this.$div.append(this.$music_con);
    this.$div.append(this.$back);



    //返回点击事件
    this.$back.on('click',function(){

        var truthBeTold = confirm('是否注销？');     //消息确认框
        if(truthBeTold){
            fun('login');
        }
    });
    //单人游戏点击事件
    this.$single.on('click',function(){
        fun('map');
    });
    //多人游戏点击事件
    //商店点击事件
    this.$shopping.on('click',function(){
        fun('shop');
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


    //公告显示
    $.ajax({
 		  type:'get',
 		  url:'index.php?c=Menu&a=announcements',
 		  dataType:'text',
 		  success:function(Res){
 			  console.log(Res);
		         if(Res == 0){
			         console.log('信息加载错误');
		         }else{
		        	 Res = eval('('+Res+')');
		        	 var mes = '';
		        	 for(var i=0;i<Res.length;i++){
		        		 mes += "<p>"+Res[i]['g_title']+"</p><p>"+Res[i]['g_content']+"</p>";
		        	 }
		        	 mes += '<input type="button" value="关闭"/>';
		 		      $multiplayermes.html(mes);
		 		     $multiplayermes.children().last().click(function(){
		 		        $multiplayermes.hide();
		 		    });
		         } 
 		  },
 		  error:function(){
 			    console.log('发送错误');
 			  }	  
 		  })
// 		  
//    function announcements(Res){
//    	
//    }
 		  
 //多人游戏未开发
    //建立多人游戏信息框
    var $multiplayermes = $('<div></div>');
    this.$div.append($multiplayermes);
    $multiplayermes.css({
        height:'240px',
        width:'200px',
        position:'absolute',
        top:'200px',
        left:'4%',
        background:'rgba(0,0,0,0.5)',
        margin: 'auto',
        padding: '10px 30px',
        'overflow':'auto'
    });
    //显示版本信息
    this.$multiplayer.click(function(){
    	$multiplayermes.html('<p>正在建设中</p>' +
        '<input type="button" value="关闭"/>');
        $multiplayermes.show();
        $multiplayermes.children().last().click(function(){
        $multiplayermes.hide();
        });
    });
    
}