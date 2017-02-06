/**
 * Created by Administrator on 2016/10/13.
 */
function CutScene(fun){
    this.$div = $('<div></div>');
    this.$load = $('<div></div>');
    this.$grow = $('<div><img src="src/imge/18.png" style="margin-top:20px;"/></div>');
    this.$mod = $('<img src="src/imge/17.png"/>');


    //建立宽度变量
    var load = 22;
    var mod = 200;



    var self = this;

    //添加样式
    this.$div.css({
        'background-image': "url('src/imge/loading.jpg')",
        width:'1022px',
        height:'640px',
        position:'relative',
        margin:'auto'
    });
    //this.$load.css({                                 //发现太丑不要了
    //    background: 'rgb(85,199,194)',
    //    position: 'absolute',
    //    bottom: '200px',
    //    left: '200px',
    //    width: '622px',
    //    height: '39px',
    //    'border-radius':'20%'
    //});
    this.$grow.css({
        background:'rgb(38,159,152)',
        position: 'absolute',
        bottom: '200px',
        left: '200px',
        height:'39px',
        width:'22px',
        'border-radius':'20px'
    });
    this.$mod.css({
       position:'absolute',
       bottom:'200px',
        left:'200px'
    });

    //组合配件
    this.$div.append(this.$load);
    this.$div.append(this.$mod);
    this.$load.append(this.$grow);



    //定时器的前期清除
    clearInterval(a);
    //设置定时器

    var a = setInterval(function(){
        load += 10;
        mod += 8.85;
        self.$grow[0].style.width=load+'px';
        self.$mod[0].style.left=mod+'px';

        if(load>=570){
            clearInterval(a);
        }
    },50);
    $.ajax({
 		  type:'get',
 		  url:'index.php?c=Cut&a=load',
 		  dataType:'text',
 		  //async:false,               //同步
 		  success:function(Res){
 			         console.log(Res);
 			  		 clearInterval(a);
 		        	 self.$grow[0].style.width='622px';
 		             self.$mod[0].style.left='622px';
 		        	 fun('main');
 				},
 		  error:function(){
 			    console.log('发送错误');
 			  }	  
 		  })
}