/**
 * Created by Administrator on 2016/10/18.
 */
function MapScene(fun){
    this.$div = $('<div></div>');
  //获取赛事信息
    var map_mes;
    $.ajax({
 		  type:'get',
 		  url:'index.php?c=Game&a=saishi',
 		  dataType:'text',
 		  async:false,               //同步
 		  success:function(Res){
		         if(Res == 0){
			         console.log('地图信息加载错误');
		         }else{
		        	 Res = eval('('+Res+')');
		        	 map_mes = "<ul>";
		        	 for(var i=0;i<Res.length;i++){
		        		 map_mes += "<li ><img src='./" + Res[i]['game_img'] + "' title='"+Res[i]['game_id']+"' alt="+ Res[i]['game_name']+"/></li>";//地图信息写出
		        	 }
		        	 map_mes += "</ul>"; 
		         } 
 		  },
 		  error:function(){
 			    console.log('发送错误');
 			  }	  
 		  })

    var $div = $('<div id="featured-area"></div>'); //旋转照片div
    this.$ul = $(map_mes);                                 //旋转照片


    this.$div.append($div);
    $div.append(this.$ul);


    this.$div.css({
        'background':'url(src/imge/1.png) no-repeat',
        'background-size':'contain',
        width:'960px',
        height:'640px',
        position:'relative',
        margin: 'auto'
    });

    $div.css({
        height:'337px',
        width:'950px',
        position:'absolute',
        left:'-300px'
    });
    this.$ul.css({
        'list-style': 'none',
        width: '500px',
        height: '300px',
        margin: '0px auto',
        left: '250px',
    	top: '100px'
    });
    //页面跳转链接
    this.$ul.children().each(function(){
    	$(this).dblclick(function(){
    		localStorage.saishi = JSON.stringify($(this).children().eq(0).attr('title'));
    		fun('boss');
    	});
    });
}