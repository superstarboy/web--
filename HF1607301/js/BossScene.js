/**
 * Created by Administrator on 2016/10/18.
 */
function BossScene(fun){
    this.$div = $('<div></div>');
//    var $img3 = $('<img/>'),
//        $img2= $('<img/>'),
//        $img1 = $('<img/>');

    var self = this,
       map_img;
    //获取用户信息
    var uid = JSON.parse(localStorage.uid);      //获取uid
    //获取赛段id
    var mid = JSON.parse(localStorage.saishi); 
    //获取管卡地址
    //赛段下地图，玩过的地图
    var  usermap = ajax('usermap&uid='+uid+'&mid='+mid),
    star = ajax('stararr');
    usermap = eval('('+usermap+')');
    star = eval('('+star+')');
	for(var i=0;i<usermap.length;i++){
		map_img += "<div style='background:url(./" + usermap[i]['game_img'] + ")' name='"+usermap[i]['game_id']+"' title='"+usermap[i]['star_id']+"'><img src='./"+star[usermap[i]['star_id']-1]['star_url']+"' width='50px'/></div>";
 	}
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
//    dc.searchTable('select * from u_m where u_m.uid='+uid+'',function(result){  //取出玩家地图等级
//       var l = result;
//       $img1.attr('src',l.rows.item(0).src);
//        $img2.attr('src',l.rows.item(1).src);
//        $img3.attr('src',l.rows.item(2).src);
//    });
//
//
//    this.$img4 = $('<img src="src/imge/chickp/5.png"/>');
//    this.$img5 = $('<img src="src/imge/chickp/5.png"/>');


    


    //组合配件
//    this.$div.append($img1);
//    this.$div.append($img2);
//    this.$div.append($img3);
//    this.$div.append(this.$img4);
//    this.$div.append(this.$img5);
    this.$div.html(map_img);
   // this.$div.append($("<div style='background:url(./src/img/map/map.jpg)' title='7'><img src='./src/img/equip/5.png' width='50px'/></div><div style='background:url(./src/img/map/map.jpg)' title='8'><img src='./src/img/equip/5.png' width='50px'/></div>"));
  //添加样式
    this.$div.css({
        'background-image': "url('src/imge/1.png')",
        width:'960px',
        height:'640px',
        position:'relative',
        margin: 'auto'
    });

    for(var j=0;j<usermap.length;j++){
    	this.$div.children().eq(j).css({
    		position:'absolute',
    		bottom: (200+100)+'px',
            left:  (50+j*150)+'px',
            width:'100px',
            height:'100px'
    	})
    }
//    this.$div.children().eq(0).css({
//    	position:'absolute',
//            bottom: '50px',
//            left: '150px'
//    });
//    $img2.css({
//        position:'absolute',
//        top: '190px',
//        left: '50px'
//    });
//    $img3.css({
//        position:'absolute',
//        top: '150px',
//        left: '200px'
//    });
//    this.$img4.css({
//        position:'absolute',
//        top: '50px',
//        right: '120px'
//    });
//    this.$img5.css({
//        position:'absolute',
//        bottom: '100px',
//        right: '190px'
//    });

    //点击事件
    this.$div.children().each(function(){
    	$(this).click(function(){
    		if($(this).attr('title') == 5){
    			alert('未解锁');
    		}else{
    			localStorage.mid = JSON.stringify($(this).attr('name'));
    		    fun('game');
    		}
    	});
    });
    
//    //点击事件
//    localStorage.mid = JSON.stringify($(this).children().eq(0).attr('title'));
//    $img1.on('click',function(){
//        dc.updateTable("update e_t set mid=1 where uid=" + uid + "", "更新车手仓库地图1");
//       fun('game');
//    });
//    $img2.on('click',function(){
//        if($(this).attr('src') != 'src/imge/chickp/5.png'){                //判断是否解锁
//            dc.updateTable("update e_t set mid=2 where uid=" + uid + "", "更新车手仓库地图2");
//            fun('game');
//        }else{
//            alert('关卡未解锁');
//        }
//    });
//    $img3.on('click',function(){
//        if($(this).attr('src') != 'src/imge/chickp/5.png'){                //判断是否解锁
//            dc.updateTable("update e_t set mid=3 where uid=" + uid + "", "更新车手仓库地图3");
//            fun('game');
//        }else{
//            alert('关卡未解锁');
//        }
//    });
//    this.$img4.on('click',function(){
//        alert('关卡未解锁');
//    });
//    this.$img5.on('click',function(){
//        alert('关卡未解锁');
//    });
}