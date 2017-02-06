/**
 * Created by Administrator on 2016/10/13.
 */
function GameScene(fun){
    this.$div=$('<div></div>');
    var self = this;
    //获取用户信息
    var uid = JSON.parse(localStorage.uid);      //获取uid
    var mid = JSON.parse(localStorage.mid);      //获取mid

    
    var mymap,
        play,
        mot,
        weel,
        myplayer,
        myplayer1,
        myplayer2,
        ui1,
        ui2,
        Times,
        le,
        jinbi = 0;

    //====================================================================
    //传入地图src
    var map_src_game = ajax('map&mid='+mid);
    map_src_game = eval('('+map_src_game+')');
    mymap=new myMap(self.$div,map_src_game[0]['game_img']);
//    dc.searchTable('select * from map where map.mid=(select e_t.mid from e_t where e_t.uid='+uid+');',function(result){
//        var l = result;
//       mymap=new myMap(self.$div, l.rows.item(0).src);
//
//    });

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
   		  })
		  return res;
    }  
//============================================================================
        //用户传入

    var player_src_game = ajax('player&uid='+uid);
    player_src_game = eval('('+player_src_game+')');
    for(var i=0;i<player_src_game.length;i++){ //打印人物信息
		 if(player_src_game[i]['type_id'] == 1){
			 play = player_src_game[i]['equimg_url'];
		 }else if(player_src_game[i]['type_id'] == 2){
			 mot = player_src_game[i]['equimg_url'];
		 }else if(player_src_game[i]['type_id'] == 3){
			 weel = player_src_game[i]['equimg_url'];
		 }
	 }
//    play = player_src_game[0]['equimg_url']
//    dc.searchTable('select * from e_s where e_s.eid=(select e_t.play from e_t where e_t.uid='+uid+');',function(result) {
//        var l = result;
//        play = l.rows.item(0).qsrc;
//    });
//    dc.searchTable('select * from e_s where e_s.eid=(select e_t.mot from e_t where e_t.uid='+uid+');',function(result) {
//        var l = result;
//        mot = l.rows.item(0).qsrc;
//    });
//    dc.searchTable('select * from e_s where e_s.eid=(select e_t.weel from e_t where e_t.uid='+uid+');',function(result) {
//        var l = result;
//        weel = l.rows.item(0).qsrc;
//        createPlay();
//    });
    function createPlay(){
        myplayer=new player(self.$div,[play,mot,weel]);
    }
    createPlay();

//===================================================================================
    //ui控制  搜索姿势表随机插入ui的样式
    function createUI(){
        var a, b, c, d;
        var ui_src_game = ajax('ui&');
        ui_src_game = eval('('+ui_src_game+')');
        //打印人物信息
    		 
		 a = ui_src_game[Math.ceil(Math.random()*3)]['equimg_url'];
		 
		 b = ui_src_game[Math.ceil(Math.random()*3)]['equimg_url'];
	
		 c = ui_src_game[7]['equimg_url'];
	
		 d = ui_src_game[9]['equimg_url'];
    	
        
        myplayer1 = new player('ui',[a,c,d],100);
        myplayer2 = new player('ui',[b,c,d],200);
      //上传UI样式
        var UIArr = [a,b];
        localStorage.UIArr = JSON.stringify(UIArr);
        mymap.$me.append(myplayer1.playerBlock);
        mymap.$me.append(myplayer2.playerBlock);
        
//        dc.searchTable('select e_s.qsrc from e_s;',function(result) {
//            var l = result;
//            function myf(){
//                if(result){
//                   a = l.rows.item(Math.ceil(Math.random()*7)).qsrc;
//                   b = l.rows.item(Math.ceil(Math.random()*2)+7).qsrc;
//                    c = l.rows.item(Math.ceil(Math.random()*2)+10).qsrc;
//                    d = l.rows.item(Math.ceil(Math.random()*7)).qsrc;
//                    e = l.rows.item(Math.ceil(Math.random()*2)+7).qsrc;
//                    f = l.rows.item(Math.ceil(Math.random()*2)+10).qsrc;
//
//                    myplayer1 = new player('ui',[a,b,c],100);
//                    myplayer2 = new player('ui',[d,e,f],200);
//
//                   //上传UI样式
//                    var UIArr = [a,d];
//                    localStorage.UIArr = JSON.stringify(UIArr);
//
//                    mymap.$me.append(myplayer1.playerBlock);
//                    mymap.$me.append(myplayer2.playerBlock);
//
//                }else{
//                    setTimeout(myf(),100);
//                }
//            }
//            myf();
//        });
    };

    createUI();



//============================================================================
//控制器传入
    var myroc=new control_1(this.$div,150,30);
//==========================================================================
//速度计传入
    var speedmeter = new speedMeter(this.$div);
    speedmeter.$div.css({
       position:'absolute',
        top:'50px',
        left:'750px'
    });
//===================================================================================
    //控制器控制方式


    myroc.RockPosition('myposition',function(e,X,Y) {
        myplayer.playerX = X;
        myplayer.playerY = Y;
    });

    //运动方法
    function gameStart(){
        myplayer.move();
        myplayer1.move(10);
        myplayer2.move(12);
        mingci();

        if(myplayer.disX == 320){
            mymap.disv = myplayer.disvX;
            mymap.move();
            speedmeter.change(mymap.disv * 10);   //速度计变化
        }else{
            speedmeter.change(myplayer.disvX * 10);   //速度计变化
        }
        if(mymap.dis == -12400){
            le = self.$mingci.html();
            clearInterval(Times);
            colsTime.record();
            theEnd();
        }
    }

    //===================================================================================
    //传入计时器与倒计时
    var colsTime = new colstime(function(){});
    colsTime.$div.css({
        height:'68px',
        width:'230px',
        background:'url(src/imge/play/time.png) no-repeat',
        position:'absolute',
        top:'20px',
        left:'500px',
        'text-align':'center',
        'line-height': '80px',
        'font-size': '30px'
    });
    var fcolsTime = new fcolstime(function(res){
        if(res == '结束'){
            colsTime.start();//开始计时
            //移动定时器打开
            Times = setInterval(function(){
                gameStart();
            },100);
        }
    });

    //===================================================================================
    //暂停按键      点击改变样式并且暂停游戏
    this.$zanting = $('<img src="src/imge/play/pause.png"/>');
    this.$zanting.css({
        position:'absolute',
        top:'30px',
        left:'950px'
    });
    var $audio = $('<audio src="src/assets/music/Theme.m4a" ' +
           'autoplay="autoplay" ' +
            'loop="loop"></audio>'),
        music = 1;
    this.$div.append($audio);
    this.$zanting.click(function(){
        if(music == 1){
            $audio[0].pause();
            music = 0;
            self.$zanting.attr('src','src/imge/play/pause2.png');
            colsTime.pause();
            clearInterval(Times);
        }else{
            $audio[0].play();
            music = 1;
            self.$zanting.attr('src','src/imge/play/pause.png');
            Times = setInterval(function(){
                gameStart();
            },100);
            colsTime.start();
        }
    });
    //===================================================================================
    //金币界面 记录玩家吃掉的金币数量
    this.$jinbi = $('<div></div>');
    this.$jinbi.css({
        position:'absolute',
        top:'20px',
        left:'200px',
        background:'url(src/imge/play/goldwindown.png)',
        height:'68px',
        width:'240px',
        'text-align':'center',
        'line-height': '80px',
        'font-size': '30px'
    });
    function jinBi(){
        self.$jinbi.html(jinbi);
    }
    //===================================================================================
    //制造金币

    function wait(){
        if(mymap && myplayer){
            createJinbi(mymap,myplayer);
            createLuzhang(mymap,myplayer)
        }else{
            setTimeout(function(){
                wait();
            },100)
        }
    }
    wait();

    function createJinbi(m,p){
        var jinbiTime,
            jinbiLeft,
            jinbiTop,
            xuanzhuan,
            gold;
        gold = $('<canvas width="60px" height="60px"></canvas>');
        var canva = gold[0].getContext('2d');
        var iimg = new Array();
        for(var i = 1;i < 21;i++){
            var img = new Image();
            img.src = 'src/imge/play/coin/'+i+'.png';
            iimg.push(img);
        }
        var cur = 0;
        iimg[19].onload = function(){
            xuanzhuan = setInterval(function(){
                canva.beginPath();
                canva.clearRect(0,0,60,60);
                canva.drawImage(iimg[cur],0,0);
                cur++;
                if(cur > 19){
                    cur = 0;
                }
                canva.closePath();
            },50)
        };
        m.$me.append(gold);
        function createDiv(){
            //位置随机获取
            jinbiLeft = Math.ceil(Math.random()*200) + p.disX - m.dis + 500;
            jinbiTop = Math.ceil(Math.random()*160) + 340;
            if(m.dis > 12000){
                clearInterval(jinbiTime);
                clearInterval(xuanzhuan);
                gold.hide();
            }else{
                gold.css({
                    left:jinbiLeft+'px',
                    top:jinbiTop+'px',
                    position:'absolute'
                });
            }
            jinbiTime = setInterval(function(){
                pengzhuang();
            },100);
        }
        createDiv();
        function pengzhuang(){
            if((p.disX - m.dis + 100) >= jinbiLeft && (p.disX - m.dis - 60) <= jinbiLeft &&
                (p.disY + 100) >= jinbiTop && (p.disY - 60) <= jinbiTop){
                jinbi++;
                jinBi();
                createDiv();
            }else if((p.disX - m.dis - 300) >= jinbiLeft){
                createDiv();
            }
        }
    };

    //===================================================================================
    //制造路障
    function createLuzhang(m,p){
        var gold = $('<div></div>');
        var pic,
            jinbiTime;
        m.$me.append(gold);
        function changeImg(){
            pic = Math.ceil(Math.random()*2);
            if(pic == 2){
                pic = 'src/imge/play/shadui.png';
            }else{
                pic = 'src/imge/play/sk.png';
            }
            gold.css({
                background:'url('+pic+')',
                width:'120px',
                height:'37px'
            })
        }
        function createDiv(){
            //位置随机获取
            jinbiLeft = Math.ceil(Math.random()*200) + p.disX - m.dis + 800;
            jinbiTop = Math.ceil(Math.random()*160) + 340;
            if(m.dis > 11000){
                clearInterval(jinbiTime);
                gold.hide();
            }else{
                gold.css({
                    left:jinbiLeft+'px',
                    top:jinbiTop+'px',
                    position:'absolute'
                });
            }
            jinbiTime = setInterval(function(){
                pengzhuang();
            },100);
        }
        changeImg();
        createDiv();
        function pengzhuang(){
            if((p.disX - m.dis + 100) >= jinbiLeft && (p.disX - m.dis - 120) <= jinbiLeft &&
                (p.disY + 100) >= jinbiTop && (p.disY + 63) <= jinbiTop){
                p.disvX -= 0.3;
            }else if((p.disX - m.dis - 500) >= jinbiLeft){
                changeImg();
                createDiv();
            }
        }
    };
    //===================================================================================
    //名次界面 显示玩家当前名次
    this.$mingci = $('<div></div>');
    this.$mingci.css({
        position:'absolute',
        top:'0px',
        left:'50px',
        width:'141px',
        height:'133px',
        background:'url(./src/imge/play/mc.png)',
        'font-size':'100px',
        'font-weight':'700',
        'text-align':'center',
        color:'yellow'
    });
    function mingci(){
        var p = myplayer.disX - mymap.dis,
            p1 = myplayer1.disX,
            p2 = myplayer2.disX;
      if(p >= p1 && p >= p2){
          self.$mingci.html(1);
      }else if(p >= p1 && p < p2){
          self.$mingci.html(2);
      }else if(p >= p2 && p < p1){
          self.$mingci.html(2);
      }else{
          self.$mingci.html(3);
      }
    };
    //===================================================================================
    //控制器控制方式
    this.$div.append(mymap);
    this.$div.append(myplayer);
    this.$div.append(myroc);
    this.$div.append(colsTime.$div);
    this.$div.append(fcolsTime.$div);
    this.$div.append(speedmeter.$div);
    this.$div.append(this.$zanting);
    this.$div.append(this.$jinbi);
    this.$div.append(this.$mingci);


    //=======================================================================
    //最终写入信息
    function theEnd(){
        localStorage.le = JSON.stringify(le);//名次
        localStorage.jinbi = JSON.stringify(jinbi);//金币记录
        //转化le名次为地图等级
//        var lel;
//        //var lesrc;
//        if(le == 1){
//            lel = 3;
//            //lesrc = 'src/imge/chickp/1_3.png';
//        }else if(le == 2){
//            lel = 2;
//           // lesrc = 'src/imge/chickp/1_2.png';
//        }else{
//            lel = 1;
//            //lesrc = 'src/imge/chickp/1_1.png';
//        }
        
        
        //更新金币，经验，游戏记录
        var res = ajax('usergame&uid='+uid+'&money='+jinbi+'&exp='+150+'&top='+le+'&mid='+mid+'&le='+le);
        if(res == 0){
        	console.log('插入失败');
        }else{
        	console.log('插入成功');
        }
       
//        dc.searchTable('select user.gold from user where user.uid='+uid+';',function(result2){
//            if(result2){
//                dc.updateTable('update user set gold='+(result2.rows.item(0).gold + jinbi)+' where uid='+uid+';','玩家金币加成');
//            }
//        });
//
//        dc.searchTable('select * from u_m where u_m.mid=(select e_t.mid from e_t where e_t.uid='+uid+') and u_m.uid='+uid+';',function(result){
//            var l = result;
//            if(lel > l.rows.item(0).le || l.rows.item(0).le == 4){
//                dc.updateTable("update u_m set le=" + lel + ",src='"+lesrc+"' where uid=" + uid + " and mid ="+ l.rows.item(0).mid+"", "更新地图等级");
//            }
//
//            if(le <= 2 && l.rows.item(0).mid + 1 <= 3){
//                dc.searchTable('select * from u_m where u_m.mid='+(l.rows.item(0).mid + 1)+' and u_m.uid='+uid+';',function(result1){
//                    var l1 = result1;
//                    if(l1.rows.item(0).le == 4){
//                        dc.updateTable("update u_m set le=0,src='src/imge/chickp/1.png' where uid=" + uid + " and mid ="+ l1.rows.item(0).mid +"", "解锁新关卡");
//                        var newArr = [1,l1.rows.item(0).mid];
//                        localStorage.newArr = JSON.stringify(newArr);//是否解锁
//                    }else{
//                        var newArr = [0,l1.rows.item(0).mid]
//                        localStorage.newArr = JSON.stringify(newArr);//无解锁
//                    }
//                });
//            }else if(le <= 2 && l.rows.item(0).mid + 1 == 4){
//                var newArr = [0,4]
//                localStorage.newArr = JSON.stringify(newArr);//无解锁
//            } else{
//                var newArr = [0,l.rows.item(0).mid + 1]
//                localStorage.newArr = JSON.stringify(newArr);//无解锁
//            };
//        });
        fun('clear');
    };
}