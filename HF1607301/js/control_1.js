/**
 * Created by Administrator on 2016/10/9.
 */
function control_1(div,wid,R,bottom,left) {
    //创建遥感
    bottom = (bottom==undefined)?10:bottom;
    left = (left==undefined)?50:left;
    this.$canva=$('<canvas id="mycv" width="'+wid+'px" height="'+wid+'px"></canvas>')
    div.append(this.$canva);
    var self = this;
    this.$canva.css({
        'position':'absolute',
        'bottom':bottom+'px',
        'left':left+'px'
    })
    var mouseX,mouseY,ctx,cirCenX,cirCenY,subX,subY,ml,nx,ny;
    //绘制外边框园
    ctx = this.$canva[0].getContext('2d');

//回调
    this.RockPosition=function(event,fn){
        self.$canva.on(event,fn);         //回调前面的div与trigger一样
    };

    //画圆
    function myPaint(X, Y) {
        ctx.beginPath();
        ctx.clearRect(0, 0, wid, wid);
        ctx.arc(wid/2,wid/2,wid/2, 0, 2 * Math.PI);
        ctx.strokeStyle = "aqua";
        ctx.stroke();
        ctx.closePath();


        ctx.beginPath();
        ctx.fillStyle = "aqua"
        ctx.arc(X + wid/2, Y + wid/2,R, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        //传出移动参数
        self.$canva.trigger('myposition',[X,Y]);
    }
    //判断遥感落点
    function ConPosition(pX,pY){
        cirCenX =  self.$canva.offset().left + wid / 2;
        cirCenY =  self.$canva.offset().top + wid/ 2;

        subX = pX - cirCenX;
        subY = pY - cirCenY;
        ml = Math.sqrt(subX * subX + subY * subY);//Math.pow(subX,2)

        if (ml+R > wid / 2) {//园外
            //nx/subX = (75-30)/ml;
            nx = (wid/2 - R) * subX / ml;
            ny = (wid/2- R) * subY / ml;
        } else {//园内的时候
            nx = subX;
            ny = subY;
        }
        myPaint(nx, ny);
    }
    myPaint(0, 0);
    //摇杆运动
    var bol = false;
    this.$canva.on("mousedown", function (e) {
        e.preventDefault();
        //点击时移动
        mouseX = e.clientX;
        mouseY = e.clientY;

        ConPosition(mouseX,mouseY);
        bol = true;
    })

    $(document).on("mousemove", function (e) {
        e.preventDefault();
        if (bol) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            ConPosition(mouseX,mouseY);
        }
    })
    $(document).on("mouseup", function (e) {
        e.preventDefault();
        bol = false;
        myPaint(0,0);
    })
}