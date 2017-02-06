
function CarScene(fun){
   this.$div = $('<div></div>');
    var uid = JSON.parse(localStorage.uid);      //获取uid
//==========================================================================================
    var $yanshi = $('<div></div>'),//演示div
        $yanshi_play = $('<div>点击调节骑手</div>'),//人物
        $yanshi_mot = $('<div>点击调节摩托</div>'),//摩托
        $yanshi_weel = $('<div>点击调节车轮</div>'),//车轮
        $yanshi_power = $('<div>点击调节引擎</div>');//引擎
    $yanshi.css({
        border: '2px solid rgb(38, 159, 152)',
        position: 'absolute',
        width: '300px',
        height: '300px',
        left: '330px',
        top: '20px',
        background:'url(src/imge/2.png)'
    });
    $yanshi_play.css({
        border: '2px solid rgb(38, 159, 152)',
        height: '150px',
        width: '150px',
        position: 'absolute',
        top:'70px',
        left:'80px'
    });
    $yanshi_mot.css({
        border: '2px solid rgb(38, 159, 152)',
        height: '50px',
        width: '150px',
        position: 'absolute',
        bottom:'80px',
        left:'75px'
    });
    $yanshi_weel.css({
        border: '2px solid rgb(38, 159, 152)',
        height: '50px',
        width: '150px',
        position: 'absolute',
        bottom:'50px',
        left:'75px'
    });
    $yanshi_power.css({
        border: '2px solid rgb(38, 159, 152)',
        height: '100px',
        width: '100px',
        position: 'absolute',
        background:'white',
        bottom:'0px',
        right:'0px'
    });

//======================================================================================

    var $yulan = $('<div></div>'),//下方滑动撞在展示框的div
        $yulan_huadong = $('<div></div>'); //预览div

    //===================================================================================
    var $game = $('<div>开始游戏</div>'); //跳转框

    $game.css({
       'font-size':'50px',
        'font-weight':'700',
        height:'120px',
        width:'120px',
        position:'absolute',
        right:'0px'
    });
    $game.click(function(){ //跳转map界面
        fun('map');
    });
    this.$div.append($game);

//======================================================================================
    //返回按钮
    this.$back = $('<input type="button" name="back"/>');//返回按钮
    this.$div.append(this.$back);
    this.$back.css({
        background: 'url(src/imge/16.png) no-repeat center',
        width: '58px',
        height: '58px',
        border: '0px',
        position: 'absolute',
        top: '0px'
    });
    //返回点击事件
    this.$back.on('click',function(){
        fun('shop');
    });
    //=========================================================================================


    this.$div.append($yanshi);
    $yanshi.append($yanshi_play);
    $yanshi.append($yanshi_mot);
    $yanshi.append($yanshi_weel);
    $yanshi.append($yanshi_power);
    $yulan_huadong.append($yulan);
    this.$div.append($yulan_huadong);

//============================================================================
    this.$div.css({
        'background-image': "url('src/imge/Checkpoint.jpg')",
        width:'960px',
        height:'640px',
        position:'relative',
        margin: 'auto'
    });

    $yulan.css({
        height:'160px',
        position:'absolute',
        left:'0px',
        width:'1500px',
        background:'url(src/imge/2.png)'
    });
    $yulan_huadong.css({
        border: '2px solid rgb(38,159,152)',
        height: '180px',
        width: '600px',
        overflow:'auto',
        position:'absolute',
        bottom:'100px',
        left:'190px'
    });


//=============================================================================
    //预览效果
   function yulan(n,src){      //装备图片链接
       if(n == 'play'){
           $yanshi_play.css({"background":"url("+src+") no-repeat","background-size":"contain",border:'0px'});//变化背景图片
           $yanshi_play.html('');   //清空说明
       }else if(n == 'mot'){
           $yanshi_mot.css({"background":"url("+src+") no-repeat","background-size":"contain",border:'0px'});//变化背景图片
           $yanshi_mot.html('');   //清空说明
       }else if(n == 'weel'){
           $yanshi_weel.css({"background":"url("+src+") no-repeat","background-size":"contain",border:'0px'});//变化背景图片
           $yanshi_weel.html('');   //清空说明
       }else if(n == 'power'){
           $yanshi_power.css({"background":"url("+src+") no-repeat","background-size":"contain",border:'0px'});//变化背景图片
           $yanshi_power.html('');   //清空说明
       }


    }
//===========================================================================================
    function createShow(src,name,pro,eid,p,type){ //图片链接，装备名字，装备说明,装备id，是否已装备，装备类型

       var she = this;                                    //演示插入新的  装备演示图
        this.$dc = $('<div></div>');                                                                                //总体
        this.$dcPic = $('<div></div>');                                                                            //装备图片
        this.$dcMon = $('<div></div>');                                                                            //是否装备
        this.$dcShow = $('<div class="show"><p>'+name+'</p><p>'+pro+'</p></div>');                             //说明框


        this.$dc.append(this.$dcPic);
        this.$dc.append(this.$dcMon);
        this.$dc.append(this.$dcShow);

        if(p == 1){  //用户已装备
            this.$dcMon.html('已装备');
        }else{                           //用户未装备
            this.$dcMon.html('未装备');
        }



       this.$dc.css({
            border: '1px solid rgb(38,159,152)',
            display: 'inline-block',
            height: '118px',
            width: '126px',
           padding:'20px',
           position:'relative'
        });

        this.$dcPic.css({
            border: '2px solid rgb(38,159,152)',
            background: 'url('+src+') no-repeat center',      //装备图片
            'background-size':'contain',
            margin: '0px 5px',
            height: '90px'
        });
        this.$dcMon.css({
            border: '1px solid rgb(38,159,152)',
            margin: '2px 5px',
            height: '15px'
        });
        this.$dcShow.css({
            height:'80px',
            width:'150px',
            padding:'5px 2px',
            position:'absolute',
            top:'20px',
            left:'20px',
            display:'none',
            background:'url(src/imge/2.png) center'
        });


        this.$dc.hover(function(){                                  //说明书的hover效果
            $(this).children().eq(2).show();                       //将js对象转化为jq对象
        },function(){
            $(this).children().eq(2).hide();
        });

        $yulan.append(this.$dc);//插入展示框
        //挂上点击事件
        this.$dc.click(function(){ //添加装备 效果
            if(type == 1){                 //判断是否是play装备
                yulan('play',selecEquipImg(eid,uid,type));   //插入 
                updateEquip(eid,uid,type);//更新play装备
            }else if(type == 2){  //摩托
            	yulan('mot',selecEquipImg(eid,uid,type));   //插入 
                updateEquip(eid,uid,type);//更新play装备
            }else if(type == 3){     //车轮
            	yulan('weel',selecEquipImg(eid,uid,3));   //插入 
                updateEquip(eid,uid,3);//更新play装备
            }else{                   //引擎
            	yulan('power',selecEquipImg(eid,uid,type));   //插入 
                updateEquip(eid,uid,type);//更新play装备
            }
            //写入已装备
            she.$dcMon.html('已装备');
        });
    };
    function selecEquipImg(eid,$uid,type){
    	//查询装备2效果表
    	var url;
        $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip1&uid='+$uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
     			 if(Res == 0){
			         console.log('信息加载错误');
		         }else{
		        	 Res = eval('('+Res+')');
		        	 for(var i=0;i<Res.length;i++){ //打印车轮信息
		        		 if(Res[i]['type_id'] == type && Res[i]['equimg_to'] == 2 && Res[i]['equ_id'] == eid){
		        		      url = './'+Res[i]['equimg_url'];
		        		 }
		        	 }
		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
     		  });
        return url;
    }
    function updateEquip(eid,$uid,type){
    	//更新玩家仓库装备表
        $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=nowEquip&uid='+$uid +'&eid='+eid +'&type='+type,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('更新失败');
    		         }else{
    		        	 console.log('更新成功'); 
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
     		  });
    }
//===========================================================================================

    //演示框装备点击事件
    //骑手
   $yanshi_play.click(function(){           //下方预览栏变化
        //清空展示栏
        $yulan.html('');
        //查询玩家仓库信息，判断未装备
        $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip3&uid='+uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('信息加载错误');
    		         }else{
    		        	 Res = eval('('+Res+')');
    		        	 for(var i=0;i<Res.length;i++){ //打印骑手信息
    		        		 if(Res[i]['type_id'] == 1 && Res[i]['equimg_to'] == 1){
		    		        		 //添加到展示栏
		    		        	 createShow('./'+Res[i]['equimg_url'],Res[i]['equ_name'],Res[i]['equ_cri'],Res[i]['equ_id'],0,Res[i]['type_id']);   //图片链接，装备名字，装备说明,装备id，是否已装备，装备类型    
    		        		 }
    		        	 }   
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
     		  });
     		  //查询玩家仓库信息，判断已装备
     		   $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip4&uid='+uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('信息加载错误');
    		         }else{
    		        	 Res = eval('('+Res+')');
    		        	 for(var i=0;i<Res.length;i++){ //打印骑手信息
    		        		 if(Res[i]['type_id'] == 1 && Res[i]['equimg_to'] == 1){
		    		        		 //添加到展示栏
		    		        	 createShow('./'+Res[i]['equimg_url'],Res[i]['equ_name'],Res[i]['equ_cri'],Res[i]['equ_id'],1,Res[i]['type_id']);   //图片链接，装备名字，装备说明,装备id，是否已装备 ，装备类型   
    		        		 }
    		        	 }   
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
     		  });
    });

    //加载时自己触发效果
    $yanshi_play.trigger('click');

    //摩托
    $yanshi_mot.click(function(){           //下方预览栏变化
        //清空展示栏
        $yulan.html('');
      //查询玩家仓库信息，判断未装备
        $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip3&uid='+uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('信息加载错误');
    		         }else{
    		        	 Res = eval('('+Res+')');
    		        	 for(var i=0;i<Res.length;i++){ //打印摩托信息
    		        		 if(Res[i]['type_id'] == 2 && Res[i]['equimg_to'] == 1){
		    		        		 //添加到展示栏
		    		        	 createShow('./'+Res[i]['equimg_url'],Res[i]['equ_name'],Res[i]['equ_cri'],Res[i]['equ_id'],0,Res[i]['type_id']);   //图片链接，装备名字，装备说明,装备id，是否已装备，装备类型    
    		        		 }
    		        	 }   
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
     		  });
     		  //查询玩家仓库信息，判断已装备
     		   $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip4&uid='+uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('信息加载错误');
    		         }else{
    		        	 Res = eval('('+Res+')');
    		        	 for(var i=0;i<Res.length;i++){ //打印摩托信息
    		        		 if(Res[i]['type_id'] == 2 && Res[i]['equimg_to'] == 1){
		    		        		 //添加到展示栏
		    		        	 createShow('./'+Res[i]['equimg_url'],Res[i]['equ_name'],Res[i]['equ_cri'],Res[i]['equ_id'],1,Res[i]['type_id']);   //图片链接，装备名字，装备说明,装备id，是否已装备 ，装备类型   
    		        		 }
    		        	 }   
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
     		  });
    });
  //车轮
    $yanshi_weel.click(function(){           //下方预览栏变化
        //清空展示栏
        $yulan.html('');
      //查询玩家仓库信息，判断未装备
        $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip3&uid='+uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('信息加载错误');
    		         }else{
    		        	 Res = eval('('+Res+')');
    		        	 for(var i=0;i<Res.length;i++){ //打印车轮信息
    		        		 if(Res[i]['type_id'] == 3 && Res[i]['equimg_to'] == 1){
		    		        		 //添加到展示栏
		    		        	 createShow('./'+Res[i]['equimg_url'],Res[i]['equ_name'],Res[i]['equ_cri'],Res[i]['equ_id'],0,Res[i]['type_id']);   //图片链接，装备名字，装备说明,装备id，是否已装备，装备类型    
    		        		 }
    		        	 }   
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
     		  });
     		  //查询玩家仓库信息，判断已装备
     		   $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip4&uid='+uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('信息加载错误');
    		         }else{
    		        	 Res = eval('('+Res+')');
    		        	 for(var i=0;i<Res.length;i++){ //打印车轮信息
    		        		 if(Res[i]['type_id'] == 3 && Res[i]['equimg_to'] == 1){
		    		        		 //添加到展示栏
		    		        	 createShow('./'+Res[i]['equimg_url'],Res[i]['equ_name'],Res[i]['equ_cri'],Res[i]['equ_id'],1,Res[i]['type_id']);   //图片链接，装备名字，装备说明,装备id，是否已装备 ，装备类型   
    		        		 }
    		        	 }   
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
     		  });
    });
    //引擎
    $yanshi_power.click(function(){           //下方预览栏变化
        //清空展示栏
        $yulan.html('');
      //查询玩家仓库信息，判断未装备
        $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip3&uid='+uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('信息加载错误');
    		         }else{
    		        	 Res = eval('('+Res+')');
    		        	 for(var i=0;i<Res.length;i++){ //打印引擎信息
    		        		 if(Res[i]['type_id'] == 4 && Res[i]['equimg_to'] == 1){
		    		        		 //添加到展示栏
		    		        	 createShow('./'+Res[i]['equimg_url'],Res[i]['equ_name'],Res[i]['equ_cri'],Res[i]['equ_id'],0,Res[i]['type_id']);   //图片链接，装备名字，装备说明,装备id，是否已装备，装备类型    
    		        		 }
    		        	 }   
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
     		  });
     		  //查询玩家仓库信息，判断已装备
     		   $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip4&uid='+uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('信息加载错误');
    		         }else{
    		        	 Res = eval('('+Res+')');
    		        	 for(var i=0;i<Res.length;i++){ //打印引擎信息
    		        		 if(Res[i]['type_id'] == 4 && Res[i]['equimg_to'] == 1){
		    		        		 //添加到展示栏
		    		        	 createShow('./'+Res[i]['equimg_url'],Res[i]['equ_name'],Res[i]['equ_cri'],Res[i]['equ_id'],1,Res[i]['type_id']);   //图片链接，装备名字，装备说明,装备id，是否已装备 ，装备类型   
    		        		 }
    		        	 }   
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
     		  });
    });



    //===========================================================================================




};