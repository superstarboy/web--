/**
 * Created by Administrator on 2016/10/18.
 */
function ShopScene(fun){
    this.$div = $('<div></div>');
    this.$shop_yshow = $('<div></div>');          //展示框
    //获取local信息查询数据库插入节点
    this.uid = JSON.parse(localStorage.uid);      //获取uid
    var self = this;

    //商店创建
    this.$shop = $('<div></div>');
    this.$shop1 = $('<img src="src/imge/store/55.png"/>');
    this.$shop_k = $('<div></div>');                //切换按钮
    this.$shop_y = $('<div></div>');                //具体选单


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
        fun('main');
    });




    this.$shop_yshowh = $('<div></div>');         //hidden框
    this.$shop_ychange = $('<div></div>');        //换页按钮
    this.$shop_y.append(this.$shop_yshowh);
    this.$shop_yshowh.append(this.$shop_yshow);
    this.$shop_y.append(this.$shop_ychange);




    //样式
    this.$div.css({
            'background-image': "url('src/imge/Checkpoint.jpg')",
            width:'960px',
            height:'640px',
            position:'relative',
            margin: 'auto'
        });
    //==============================================

    //侧边预览栏
    this.$yulan = $('<div></div>');
    this.$yulan1 = $('<img src="src/imge/store/54.png"/>');
    this.$yulan_username = $('<div></div>');                        //用户名显示位置
    this.$yulan_y = $('<div></div>');                                //预览装备位置
    this.$yulan_k = $('<div><div style="border: 1px solid rgb(38,159,152);height: 25px;width: 240px;text-align: center;margin: 7px;font-weight: 700;padding: 5px 0px;">'
                            +'<span style="font-size: 20px;font-weight: 700;color: cornflowerblue;">我的金币:</span><span class="gold"></span></div><img src="src/imge/store/3.png" style="margin: 7px 0px 0px 55px;"/>'
                            +'<img src="src/imge/store/4.png" style="margin: 7px 0px 0px 55px;"/></div>');
                           //切换商店车库按钮
    this.$yulan_k_chongzhi = $('<div  style="width: 200px;height: 90px;position:absolute;top:-200px;background:yellow;padding: 30px 50px;">' +
        '<input type="text" style="height:20px;width: 200px;"placeholder="请输入充值金额"/>' +
        '<input type="button" value="确定" style="border-radius:10px;height: 50px;width: 100px;margin: 20px 0px 0px 50px;"/></div>');



    this.$yulan.append(this.$yulan1);
    this.$yulan.append(this.$yulan_username);
    this.$yulan.append(this.$yulan_y);
    this.$yulan.append(this.$yulan_k);
    this.$yulan_k.append(this.$yulan_k_chongzhi);

    //预览效果
    function yulan(src){      //装备图片链接
        self.$yulan_y.css({'background':'url('+src+') no-repeat','background-size':'contain'});//变化背景图片
    }

    //充值效果
    this.$yulan_k.children().eq(1).click(function(){   //点击显示充值框
        self.$yulan_k_chongzhi.css('top','400px');      //改变top值
    });
    this.$yulan_k_chongzhi.children().eq(1).click(function(){      //点击确定实现充值
        var i = self.$yulan_k_chongzhi.children().eq(0).val();
        i = parseInt(i);
        var uid = self.uid;
        if(i){                                             //判断用户是否输入充值金额
        	$.ajax({
      		  type:'get',
      		  url:'index.php?c=Menu&a=rechange&uid='+uid + '&money=' + i,
      		  dataType:'text',
      		  async:false,               //同步
      		  success:function(Res){
 		        	 console.log(Res);
 		        	updateGold();                             //刷新金币显示
 		        	self.$yulan_k_chongzhi.children().eq(0).val('');
 		        	self.$yulan_k_chongzhi.css('top','-200px'); 
      		  },
      		  error:function(){
      			    console.log('发送错误');
      			  }	  
    		  })
        }else{
            alert('请输入金额');
        }
    });
    //我的仓库点击事件
    this.$yulan_k.children().eq(2).on('click',function(){
        fun('car');
    });


    //侧边栏样式
    this.$yulan.css({
        border: '2px solid black',
        height: '500px',
        width: '256px',
        float: 'left',
        'margin-left': '50px',
        'margin-top': '50px',
        'border-top': '0px',
        'border-right': '0px',
        background: 'white'
    });
    this.$yulan_username.css({
        border: '1px solid rgb(38,159,152)',
        'text-align': 'center',
        height: '20px',
        'font-weight': '700',
        padding: '5px 0px',
        width: '240px',
        margin: '7px'
    });
    this.$yulan_y.css({
        border: '1px solid rgb(38,159,152)',
        height: '200px',
        width: '240px',
        margin: '7px'
    });



    //=========================================


    this.$shop.append(this.$shop1);
    this.$shop.append(this.$shop_k);
    this.$shop.append(this.$shop_y);

    //商店样式
    this.$shop.css({
        width: '590px',
        float: 'right',
        margin: '50px 50px 0px 0px',
        background: 'white',
        height: '500px'
    });
    this.$shop_k.css({
        float: 'left',
        margin: '56px 0px 0px 10px'
    });
    this.$shop_y.css({
        float: 'right',
        border: '2px solid rgb(38,159,152)',
        height: '400px',
        width: '450px',
        padding: '10px',
        'margin-right': '10px'
    });


    //===========================================
    //切换按钮
    this.$shop_k.html('<div style="width: 72px;"><img src="src/imge/store/5.png"/><img src="src/imge/store/6.png"/></div>'              //人物
                        +'<div style="width: 91px;"><img src="src/imge/store/8.png"/><img src="src/imge/store/9.png"/></div>'           //摩托
                        +'<div style="width: 72px;"><img src="src/imge/store/11.png"/><img src="src/imge/store/12.png"/></div>'         //车轮
                        +'<div style="width: 72px;"><img src="src/imge/store/50.png"/><img src="src/imge/store/51.png"/></div>');       //引擎
    //挂载点击事件
    //骑手
    this.$shop_k.children().eq(0).click(function(){
        self.$shop_k.children().eq(0).addClass('cli').children().eq(0).attr('src','src/imge/store/5.png');
        self.$shop_k.children().eq(1).removeClass('cli').children().eq(0).attr('src','src/imge/store/10.png');                //样式处理
        self.$shop_k.children().eq(2).removeClass('cli').children().eq(0).attr('src','src/imge/store/13.png');
        self.$shop_k.children().eq(3).removeClass('cli');

        //清空展示栏
        self.$shop_yshow.html('');
      //用户拥有装备
        var uid = self.uid;
        $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip1&uid='+uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('信息加载错误');
    		         }else{
    		        	 Res = eval('('+Res+')');
    		        	 for(var i=0;i<Res.length;i++){ //打印骑手信息
    		        		 if(Res[i]['type_id'] == 1 && Res[i]['equimg_to'] == 1){  //图片链接，装备价格，装备名字，装备说明,装备id，是否已购买,所需经验，所需vip
    		        		 createShow('./'+Res[i]['equimg_url'],Res[i]['equ_money'],Res[i]['equ_name'],Res[i]['equ_cri'],Res[i]['equ_id'], 1,Res[i]['need_exp'],Res[i]['vr_lev'])//添加到展示栏
    		        		 }
    		        	 }
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
     		  })
        //用户没拥有装备
        $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip2&uid='+uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('信息加载错误');
    		         }else{
    		        	 Res = eval('('+Res+')');
    		        	 for(var i=0;i<Res.length;i++){ //打印骑手信息
    		        		 if(Res[i]['type_id'] == 1 && Res[i]['equimg_to'] == 1){  //图片链接，装备价格，装备名字，装备说明,装备id，是否已购买,所需经验，所需vip
    		        		 createShow('./'+Res[i]['equimg_url'],Res[i]['equ_money'],Res[i]['equ_name'],Res[i]['equ_cri'],Res[i]['equ_id'],0,Res[i]['need_exp'],Res[i]['vr_lev'],Res[i]['need_exp'],Res[i]['vr_limit'])//添加到展示栏
    		        		 }
    		        	 }
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
   		  })
    });

    //加载时自己触发效果
    this.$shop_k.children().eq(0).trigger('click');

    //摩托
    this.$shop_k.children().eq(1).click(function(){
        self.$shop_k.children().eq(1).addClass('cli').children().eq(0).attr('src','src/imge/store/8.png');
        self.$shop_k.children().eq(0).removeClass('cli').children().eq(0).attr('src','src/imge/store/7.png');                //样式处理
        self.$shop_k.children().eq(2).removeClass('cli').children().eq(0).attr('src','src/imge/store/13.png');
        self.$shop_k.children().eq(3).removeClass('cli');

        //清空展示栏
        self.$shop_yshow.html('');
        //用户拥有装备
        var uid = self.uid;
        $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip1&uid='+uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('信息加载错误');
    		         }else{
    		        	 Res = eval('('+Res+')');
    		        	 for(var i=0;i<Res.length;i++){ //打印摩托信息
    		        		 if(Res[i]['type_id'] == 2 && Res[i]['equimg_to'] == 1){  //图片链接，装备价格，装备名字，装备说明,装备id，是否已购买,所需经验，所需vip
    		        		 createShow('./'+Res[i]['equimg_url'],Res[i]['equ_money'],Res[i]['equ_name'],Res[i]['equ_cri'],Res[i]['equ_id'], 1,Res[i]['need_exp'],Res[i]['vr_lev'])//添加到展示栏
    		        		 }
    		        	 }
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
     		  })
        //用户没拥有装备
        $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip2&uid='+uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('信息加载错误');
    		         }else{
    		        	 Res = eval('('+Res+')');
    		        	 for(var i=0;i<Res.length;i++){ //打印摩托信息
    		        		 if(Res[i]['type_id'] == 2 && Res[i]['equimg_to'] == 1){  //图片链接，装备价格，装备名字，装备说明,装备id，是否已购买,所需经验，所需vip
    		        		 createShow('./'+Res[i]['equimg_url'],Res[i]['equ_money'],Res[i]['equ_name'],Res[i]['equ_cri'],Res[i]['equ_id'],0,Res[i]['need_exp'],Res[i]['vr_lev'],Res[i]['need_exp'],Res[i]['vr_limit'])//添加到展示栏
    		        		 }
    		        	 }
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
   		  })
    });
    //车轮
    this.$shop_k.children().eq(2).click(function(){
        self.$shop_k.children().eq(0).removeClass('cli').children().eq(0).attr('src','src/imge/store/7.png');
        self.$shop_k.children().eq(1).removeClass('cli').children().eq(0).attr('src','src/imge/store/10.png');                //样式处理
        self.$shop_k.children().eq(2).addClass('cli').children().eq(0).attr('src','src/imge/store/11.png');
        self.$shop_k.children().eq(3).removeClass('cli');

        //清空展示栏
        self.$shop_yshow.html('');
        //用户拥有装备
        var uid = self.uid;
        $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip1&uid='+uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('信息加载错误');
    		         }else{
    		        	 Res = eval('('+Res+')');
    		        	 for(var i=0;i<Res.length;i++){ //打印车轮信息
    		        		 if(Res[i]['type_id'] == 3 && Res[i]['equimg_to'] == 1){  //图片链接，装备价格，装备名字，装备说明,装备id，是否已购买,所需经验，所需vip
    		        		 createShow('./'+Res[i]['equimg_url'],Res[i]['equ_money'],Res[i]['equ_name'],Res[i]['equ_cri'],Res[i]['equ_id'], 1,Res[i]['need_exp'],Res[i]['vr_lev'])//添加到展示栏
    		        		 }
    		        	 }
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
     		  })
        //用户没拥有装备
        $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip2&uid='+uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('信息加载错误');
    		         }else{
    		        	 Res = eval('('+Res+')');
    		        	 for(var i=0;i<Res.length;i++){ //打印车轮信息
    		        		 if(Res[i]['type_id'] == 3 && Res[i]['equimg_to'] == 1){  //图片链接，装备价格，装备名字，装备说明,装备id，是否已购买,所需经验，所需vip
    		        		 createShow('./'+Res[i]['equimg_url'],Res[i]['equ_money'],Res[i]['equ_name'],Res[i]['equ_cri'],Res[i]['equ_id'],0,Res[i]['need_exp'],Res[i]['vr_lev'],Res[i]['need_exp'],Res[i]['vr_limit'])//添加到展示栏
    		        		 }
    		        	 }
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
   		  })
    });
    //引擎
    this.$shop_k.children().eq(3).click(function(){
        self.$shop_k.children().eq(0).removeClass('cli').children().eq(0).attr('src','src/imge/store/7.png');
        self.$shop_k.children().eq(1).removeClass('cli').children().eq(0).attr('src','src/imge/store/10.png');                //样式处理
        self.$shop_k.children().eq(2).removeClass('cli').children().eq(0).attr('src','src/imge/store/13.png');
        self.$shop_k.children().eq(3).addClass('cli');

        //清空展示栏
        self.$shop_yshow.html('');
        //用户拥有装备
        var uid = self.uid;
        $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip1&uid='+uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('信息加载错误');
    		         }else{
    		        	 Res = eval('('+Res+')');
    		        	 for(var i=0;i<Res.length;i++){ //打印引擎信息
    		        		 if(Res[i]['type_id'] == 4 && Res[i]['equimg_to'] == 1){  //图片链接，装备价格，装备名字，装备说明,装备id，是否已购买,所需经验，所需vip
    		        		 createShow('./'+Res[i]['equimg_url'],Res[i]['equ_money'],Res[i]['equ_name'],Res[i]['equ_cri'],Res[i]['equ_id'], 1,Res[i]['need_exp'],Res[i]['vr_lev'])//添加到展示栏
    		        		 }
    		        	 }
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
     		  })
        //用户没拥有装备
        $.ajax({
     		  type:'get',
     		  url:'index.php?c=Menu&a=equip2&uid='+uid,
     		  dataType:'text',
     		  async:false,               //同步
     		  success:function(Res){
    		         if(Res == 0){
    			         console.log('信息加载错误');
    		         }else{
    		        	 Res = eval('('+Res+')');
    		        	 for(var i=0;i<Res.length;i++){ //打印引擎信息
    		        		 if(Res[i]['type_id'] == 4 && Res[i]['equimg_to'] == 1){  //图片链接，装备价格，装备名字，装备说明,装备id，是否已购买,所需经验，所需vip，exp需要经验,vip需要等级
    		        		 createShow('./'+Res[i]['equimg_url'],Res[i]['equ_money'],Res[i]['equ_name'],Res[i]['equ_cri'],Res[i]['equ_id'],0,Res[i]['need_exp'],Res[i]['vr_lev'],Res[i]['need_exp'],Res[i]['vr_limit'])//添加到展示栏
    		        		 }
    		        	 }
    		         } 
     		  },
     		  error:function(){
     			    console.log('发送错误');
     			  }	  
   		  })
    });













    //===========================================
    //商品购买具体条目具体选单


    this.$shop_yshowh.css({
        border: '2px solid rgb(38,159,152)',
        height: '350px',
        width: '450px',
        overflow:'auto',
        position:'relative'
    });
    this.$shop_yshow.css({
        width: '450px',
        position:'absolute',
        top:'0px'
    });

    this.$shop_ychange.css({
        height: '23px',
        width: '360px',
        position: 'relative',
        left: '150px',
        top: '5px'
    });
    function createShow(src,gold,name,pro,eid,fun,exp,vip,$exp,$vip){ //图片链接，装备价格，装备名字，装备说明,装备id，是否已购买,所需经验，所需vip ，exp需要经验,vip需要等级

        var she = this;
        //演示插入新的  装备演示图
        this.$dc = $('<div></div>');                                                                                //总体
        this.$dcName = $('<div></div>');                                                                           //装备名
        this.$dcPic = $('<div></div>');                                                                            //装备图片
        this.$dcMon = $('<div></div>');                                                                            //装备价格
        this.$dcImg1 = $('<img src="src/imge/store/16.png" style="float:left;margin-left:10px;"/>');      //购买
        this.$dcImg2 = $('<img src="src/imge/store/18.png" style="float:right;margin-right:10px;"/>');   //预览
        this.$dcShow = $('<div class="show"><p style="font-size: 12px;">'+name+' <span>vip:'+vip+'</span></p><p>'+pro+'</p></div>');                                            //说明框


        this.$dc.append(this.$dcName);
        this.$dc.append(this.$dcPic);
        this.$dc.append(this.$dcMon);
        this.$dc.append(this.$dcImg2);
        this.$dc.append(this.$dcShow);

        if(fun == 1){                     //用户已购买
            this.$dcMon.html('已购买');

        }else{                           //用户未购买

            this.$dc.append(this.$dcImg1);
            this.$dcMon.html('价格：'+gold+' '+'exp:'+exp);
        }



        this.$dc.css({
            border: '1px solid rgb(38,159,152)',
            display: 'inline-block',
            margin: '10px',
            height: '160px',
            width: '126px',
            position:'relative'
        });
        this.$dcName.css({
            border: '1px solid rgb(38,159,152)',
            margin: '5px 5px 2px',
            height: '10px'
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
            height: '15px',
            'font-size': '12px'
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
        //装备价格


       this.$dc.hover(function(){                                  //说明书的hover效果
           $(this).children().eq(4).show();                       //将js对象转化为jq对象
       },function(){
           $(this).children().eq(4).hide();
       });

        self.$shop_yshow.append(this.$dc);//插入展示框
        //挂上点击事件
        this.$dcImg1.click(function(){ //购买效果
        	var uid = self.uid;
        	//查询用户购买资格
            $.ajax({
         		  type:'get',
         		  url:'index.php?c=Menu&a=userMes&uid='+uid,
         		  dataType:'text',
         		  async:false,               //同步
         		  success:function(Res){
        		         if(Res == 0){
        		        	 console.log('用户信息查询失败');
        		         }else{
        		        	 console.log(Res);
        		        	 Res = eval('('+Res+')');
        		        	 console.log(Res[0]['u_money']+";"+Res[0]['vr_limit']+";"+gold+";"+$vip+";"+Res[0]['need_exp']+";"+$exp);
        		        	 var mo = parseInt(Res[0]['u_money']),
        		        	 li = parseInt(Res[0]['vr_limit']),
        		        	 ex = parseInt(Res[0]['need_exp']);
        		        	 gold = parseInt(gold);
        		        	 $vip = parseInt($vip);
        		        	 $exp = parseInt($exp);
        		        	 console.log(typeof mo+typeof li+typeof ex+typeof gold+typeof $vip+typeof $exp);
        		        	 console.log(li);
        		        	 console.log($vip);
        		        	 console.log(mo >= gold);
        		        	 console.log(li >= $vip);
        		        	 console.log(ex >= $exp);
        		        	 if(mo >= gold && li >= $vip && ex >= $exp){
        		        		 //购买执行
		        		        	 var core = mo - gold;//金币剩余
		        		             $.ajax({
		        		          		  type:'get',
		        		          		  url:'index.php?c=Menu&a=equipShop&money='+core+'&uid='+uid+'&eid='+eid,
		        		          		  dataType:'text',
		        		          		  async:false,               //同步
		        		          		  success:function(Res){
		        		         		         if(Res == 0){
		        		         			         console.log('玩家信息更新错误');
		        		         		         }else{
		        		         		        	self.$shop_k.children().eq(0).trigger('click');         //刷新
		        		         		        	alert('已购买');
		        		         		        	updateGold();                             //刷新金币显示
		        		         		         } 
		        		          		  },
		        		          		  error:function(){
		        		          			    console.log('发送错误');
		        		          			  }	  
		        		        		  })	 
        		        	 }else{
        		        		 alert('资质不足！');
        		        	 } 	
        		         } 
         		  },
         		  error:function(){
         			    console.log('发送错误');
         			  }	  
       		  })
        })

        this.$dcImg2.click(function() {   //预览效果
            yulan(src);
        });


    };




    //==================================================================================

    //更新右边玩家金币
    function updateGold(){
        //查询数据库
    	var uid = self.uid;
    	$.ajax({
    		  type:'get',
    		  url:'index.php?c=Menu&a=userMes&uid='+uid,
    		  dataType:'text',
    		  async:false,               //同步
    		  success:function(Res){
   		         if(Res == 0){
   			         console.log('玩家信息查询错误');
   		         }else{
   		        	Res = eval('('+Res+')');
   		        	self.$yulan_username.html(Res[0]['u_nik']+" vip:"+Res[0]['vr_lev']+" exp:"+Res[0]['need_exp']);                       //用户名信息
   	                self.$yulan_k.find('.gold').html(Res[0]['u_money']);             //金币数
   		         } 
    		  },
    		  error:function(){
    			    console.log('发送错误');
    			  }	  
  		  })
    };
    //加载运行
    updateGold();


    //查询装备信息

//摩托







    //=====================================================================================插如页面

    this.$div.append(this.$yulan);
    this.$div.append(this.$shop);

}