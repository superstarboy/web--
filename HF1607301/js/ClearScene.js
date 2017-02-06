/**
 * Created by Administrator on 2016/10/27.
 */
function ClearScene(fun){
    var self = this;
    //背景 样式
    this.$div = $('<div></div>');
    this.$div.css({
       background:'url(src/imge/result/1.jpg)',
        height:'640px',
        width:'1136px',
        position:'relative',
        margin:'auto'
    });
    //获取玩家信息
    var uid = JSON.parse(localStorage.uid);      //获取uid
    var le = JSON.parse(localStorage.le);        //名次
   // var newArr = JSON.parse(localStorage.newArr);    //解锁
    var UIArr = JSON.parse(localStorage.UIArr); //电脑样式
    var gameTime = JSON.parse(localStorage.time); //用时
    var jinbi = JSON.parse(localStorage.jinbi);//金币
    var mid = JSON.parse(localStorage.mid);      //获取mid
    var saishi = JSON.parse(localStorage.saishi);  //获取赛事

    //ajax函数
    function ajax(url){
    	var res;
    	 $.ajax({
   		  type:'get',
   		  url:'index.php?c=Game&a='+url,
   		  dataType:'text',
   		  async:false,               //同步
   		  success:function(Res){
   		         res = Res;
   		  },
   		  error:function(){
   			    console.log('发送错误');
   			  }	  
   		  });
		  return res;
    }  
    
    

    //选手姿势插入
    function createPlay(one,two,thr){
        //人物姿势插入
        self.$img1 = $('<img src="./'+one+'"/>');
        self.$img1.css({
            position:'absolute',
            bottom:'265px',
            left:'380px'
        });
        self.$img2 = $('<img src="./'+two+'"/>');
        self.$img2.css({
            position:'absolute',
            bottom:'240px',
            left:'190px'
        });
        self.$img3 = $('<img src="./'+thr+'"/>');
        self.$img3.css({
            position:'absolute',
            bottom:'200px',
            left:'550px'
        });
        self.$div.append(self.$img1);
        self.$div.append(self.$img2);
        self.$div.append(self.$img3);
    };
//插入选手图片
    var uplay,
        uiplay1,
        uiplay2;
    var play_src_game = ajax('playerimg&uid='+uid);
    play_src_game = eval('('+play_src_game+')');
    uplay = play_src_game[0]['equimg_url'];
    
    var ui_src_game = ajax('uiimg&src='+UIArr[0]);
    ui_src_game = eval('('+ui_src_game+')');
    uiplay1 = ui_src_game[0]['equimg_url'];
    ui_src_game = ajax('uiimg&src='+UIArr[1]);
    ui_src_game = eval('('+ui_src_game+')');
    uiplay2 = ui_src_game[0]['equimg_url'];
    
    console.log(play_src_game,ui_src_game,uplay);
    
//    dc.searchTable('select e_s.wsrc from e_s where e_s.eid=(select e_t.play from e_t where e_t.uid='+uid+')',function(result){
//        uplay = result.rows.item(0).wsrc;
//    });
//    dc.searchTable('select e_s.wsrc from e_s where e_s.qsrc="'+UIArr[0]+'";',function(result){
//        uiplay1 = result.rows.item(0).wsrc;
//    });
//    dc.searchTable('select e_s.wsrc from e_s where e_s.qsrc="'+UIArr[1]+'";',function(result){
//        uiplay2 = result.rows.item(0).wsrc;
//    });
    function myf(){
        	console.log('come')
            if(le == 1){
                createPlay(uplay,uiplay1,uiplay2);
            }else if(le == 2){
                createPlay(uiplay1,uplay,uiplay2);
            }else{
                createPlay(uiplay2,uiplay1,uplay);
            }
    }
   myf();
   
   //判断是否下一关

    //玩家游戏结果展示
    this.$gameEnd = $('<div></div>');
    this.$gameEnd.css({
        height:'260px',
        width:'280px',
        background:'url(src/imge/2.png)',
        'font-size':'20px',
        color:'yellow',
        'text-aligan':'center',
        position:'absolute',
        'padding':'40px 0px 0px 20px',
        top:'100px',
        right:'150px'
    });
    this.$gameEnd.html('<p>第'+le+'名</p><p>用时：'+gameTime+'</p><p>获得金币：'+jinbi+'</p>');
    this.$div.append(this.$gameEnd);
    //玩家游戏结果信息展示
    var nextOpen = ajax('nextOpen&le='+le+'&mid='+mid+'&uid='+uid+'&saishi='+saishi);
    this.$show = $('<div></div>');
    this.$show.css({
       position:'fixed',
        height:'100%',
        width:'100%',
        'z-index':'1',
        display:'none',
        background:'rgba(0,0,0,0.7)'
    });
    this.$showDiv = $('<div>已开启新关卡，再接再厉，召唤师!!</div>');
    this.$showDiv.css({
       height:'300px',
        width:'300px',
        background:'url(src/imge/2.png)',
        'font-size':'30px',
        'font-weight':'700',
        color:'yellow',
        'text-aligan':'center',
        position:'relative',
        margin:'auto',
        'line-height':'100px',
        padding:'50px'
    });
    this.$show.append(this.$showDiv);
    this.$show.prependTo(this.$div);
    if(nextOpen == 1){         //开启新关卡
        this.$show.show();
    }
    this.$show.click(function(){
       $(this).hide();
    });

    //重新开始
    this.$back = $('<input type="button"/>');//重开按钮
    this.$back.css({
        background: 'url(src/imge/result/7.png)',
        width: '131px',
        height: '37px',
        border: '0px',
        position:'absolute',
        bottom:'10px',
        left:'100px'
    });
    this.$back.on('click',function(){
        fun('game');
    });
    this.$div.append(this.$back);

    //主菜单按钮
    this.$main = $('<input type="button"/>');
    this.$main.css({
        background: 'url(src/imge/result/8.png)',
        width: '162px',
        height: '37px',
        border: '0px',
        position:'absolute',
        bottom:'10px',
        left:'400px'
    });
    this.$main.on('click',function(){
        fun('main');
    });
    this.$div.append(this.$main);

    //下一关
    this.$next = $('<input type="button"/>');
    this.$next.css({
        background: 'url(src/imge/result/9.png)',
        width: '124px',
        height: '37px',
        border: '0px',
        position:'absolute',
        bottom:'10px',
        left:'700px'
    });
    //重开点击事件
    this.$next.on('click',function(){
//        if(newArr[1] == 4){
//            alert('地图正在建设中');
//        }else{
//            dc.searchTable('select * from u_m where u_m.uid='+uid+' and u_m.mid ='+newArr[1]+';',function(result){
//                if(result.rows.item(0).le == 4){
//                    alert('下一关未解锁');
//                }else{
//                    dc.searchTable('update e_t set mid='+result.rows.item(0).mid+' where uid='+uid+'',function(result1){
//                        fun('game');
//                    });
//                }
//            });
//        }
    	var map_src_game = ajax('nextGame&uid='+uid+'&mid='+mid+'&saishi='+saishi);
    	if(map_src_game == 1){
    		mid = parseInt(mid);
    		localStorage.mid = JSON.stringify(mid+1);
    		fun('game');
    	}else{
    		alert('下一关未解锁或者已是最后一关');
    	}
    });
    this.$div.append(this.$next);
}