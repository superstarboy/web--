/**
 * Created by Administrator on 2016/10/12.
 */
function myMap($div,map,mapx,mapy){

    this.distan = 0; //鼠标速度
    this.disv = 0;//实时速度
    this.dis=0;     //当前的值 一开始地图开始的位置为0
    mapx = (mapx==undefined)?0:mapx;
    mapy = (mapy==undefined)?0:mapy;
    map=(map==undefined)?'img/map2.jpg':map;
    this.$me = $("<div></div>");//放置地图


    this.createUI=function(){
        this.$me.css({
            'width': '14400px',
            'height':'100%',
            'backgroundImage':'url("'+map+'")',
            'z-index':'-1',
            'position': 'absolute'
        });
        this.$me.prependTo($div);
    };

    this.setPosition= function(){
        this.$me.css({
            top:mapx+"px",
            left:mapy+"px"
        });
    };
    this.setPosition();
////回调函数
//    this.Rock = function(event,fn){
//        self.$me.on(event,fn);
//    };



    this.move= function(mapmovex){//偏移量
        this.distan = (mapmovex == undefined)?this.distan:mapmovex;

        //console.log('鼠标传入'+this.distan);
        //人物缓慢加速
        if(this.distan > 0){
            this.disv += 0.1;
        }else if(this.distan < 0){
            this.disv -= 1;
        }else{
            this.disv -= 0.5;
            if(this.disv <= 0){
                this.disv = 0;
            }
        }
        //console.log(this.disv);
        //console.log(this.distan);


        if(this.disv < 0){
            this.disv = 0;
        }else if(this.disv > 20){
            this.disv = 20;
        }


        this.dis -= this.disv;
        if(this.dis > 1){                                      //判断地图距离,不能退出地图边界
            this.dis = 0;
        }else if(this.dis < -12400){
            this.dis = -12400;
        }

        this.$me.css({
            left:this.dis+"px"
        });

        //self.$me.trigger('myspeed',[self.disv]);
    };
    this.createUI();
}