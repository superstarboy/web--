/**
 * Created by Administrator on 2016/10/8.
 */
//======================================================================
//计时器
function colstime(fun){
    //建立按键和表
    this.$div = $("<div>00:00:00</div>");
    var m= 0,s= 0,ms= 0,self=this,Times;
    //-------------------
    //计时
    this.colsTime=function(){
        ms++;
        if(ms==100){
            s+=1;
            ms=0;
        }
        if(s==60){
            m+=1;
            s=0;
        }
        self.$div.html(m+':'+s+':'+ms);
    }

    this.start=function(){
        clearInterval(Times);
        Times=setInterval(function(){
            self.colsTime();},10);
    }
    this.pause=function(){
        clearInterval(Times);
    }
    this.end=function(){
        clearInterval(Times);
        self.$div.html('00:00:00');
        m=0;
        s=0;
        ms=0;
    }
    //--------------------------------------
    //记录
    this.record=function(){
        localStorage.time = JSON.stringify(m+':'+s+':'+ms);
    }
    fun();
}


//===========================================================================================
//倒计时

function fcolstime(fun){
    //新建倒计时样式
    this.$div = $('<div></div>');
    this.$img = $('<img src="./src/imge/play/mc3.png"/>');
    this.$div.css({
       position:'fixed',
        height:'100%',
        width:'100%',
        'z-index':'5'
    });
    this.$img.css({
        position:'absolute',
        top:'40%',
        left:'35%'
    });
    this.$div.append(this.$img);
    //====================================
    var self = this,
        times = 3;
    var  Times;

    this.fcolsTimes=function(){
        times --;
        if(times == 2){
            self.$img.attr('src','./src/imge/play/mc2.png');
        }else if(times == 1){
            self.$img.attr('src','./src/imge/play/mc1.png');
        }else if(times == 0){
            self.$img.attr('src','./src/imge/play/startlabel.png');
            self.$img.css({
                height:'133px',
                width:'141px'
            });
            fun("结束");
            //self.end();
        }else{
            self.$div.after().hide();
            clearInterval(Times);
        }
    };
    this.start=function(){
        //clearInterval(Times);
        console.log('倒计时开始')
        Times=setInterval(function(){
            self.fcolsTimes()},1000);
    };
    //===================================================
    //结束效果
    this.start();
}

//=======================================================
//速度计     外部父div     长度变化方法
function speedMeter($div){
    this.$div = $('<div></div>');

    var self = this;
    this.$div.css({
       height:'23px',
        width:'1px',
        background:'url(src/imge/play/load.png)'
    });
    $div.append(this.$div);

    //触发速度变化方法
   this.change = function(l){
       self.$div.css({
          width:l+'px'
       });
   };
};