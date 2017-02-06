/**
 * Created by Administrator on 2016/10/12.
 */
function player(div,img,playY){

    this.playerX=0;
    this.playerY=0;
    this.playX=0;
    this.playY=(playY==undefined)?210:playY+210;
    this.disX=0;
    this.disvX = 0;//x轴速度
    this.disY=210;

    var self = this;

    var weel = img[2];

    //生成玩家
    var player1=$('<div></div>');
    player1.css({
       'background': 'url("'+img[0]+'") no-repeat',
        "background-size":"contain",
        'position':'absolute',
        'height': '93px',
        'width': '72px',
        'left':'8px',
        'z-index':1
    });
    var player2=$('<div></div>');
    player2.css({
        'background': 'url("'+img[1]+'") no-repeat',
        "background-size":"contain",
        'position':'absolute',
        'height': '36px',
        'width': '88px',
        'bottom':'20px'
    });
    var player3=$('<div></div>');
    player3.css({
        'background': 'url("'+weel+'") no-repeat',
        "background-size":"contain",
        'position':'absolute',
        'height': '35px',
        'width': '35px',
        'bottom':'0px'
    });
    var player4=$('<div></div>');
    player4.css({
        'background': 'url("'+weel+'") no-repeat',
        "background-size":"contain",
        'position':'absolute',
        'height': '35px',
        'width': '35px',
        'bottom':'0px',
        'right':'0px'
    });
    //=================轮子转
    player3.addClass('wheel');
    player4.addClass('wheel')
    //=========================
    //也可以这么写
    //play4=play3.clone();
    //play4.css("right","0px");
    this.playerBlock=$('<div></div>');
    this.playerBlock.css({
        'position': 'absolute',
        'height': '115px',
        'width': '100px',
        'left':this.playX+'px',
        'top':this.playY+'px',
        'z-index':'1'
    });
    this.playerBlock.append(player1);
    this.playerBlock.append(player2);
    this.playerBlock.append(player3);
    this.playerBlock.append(player4);
    if(div == 'ui'){

    }else{
        this.playerBlock.append($('<div style="font-size: 18px;color: yellow;position: absolute;top: -20px;left:15px;">玩家</div>'));
        div.append(this.playerBlock);
    }
//玩家移动方法
    this.move = function(speedx,speedy){
        self.playerX = (speedx != undefined)?speedx:self.playerX;
        self.playerY = (speedy!= undefined)?speedy:self.playerY;


        if(div != 'ui'){
            //人物缓慢加速
            if(this.playerX > 0){
                this.disvX += 0.1;
            }else if(this.playerX < 0){
                this.disvX -= 1;
            }else{
                this.disvX -= 0.5;
                if(this.disvX <= 0){
                    this.disvX = 0;
                }
            }
            if(this.disvX < 0){
                this.disvX = 0;
            }else if(this.disvX > 20){
                this.disvX = 20;
            }
            this.disX += this.disvX;
            //判断选手不能超出地图边界
            if(this.disX > 320){
                this.disX = 320;
            }
            self.disY += self.playerY/10;
            //判断选手不能超出地图边界
            if(self.disY > 500){
                self.disY = 500;
            }else if(self.disY < 210){
                self.disY = 210;
            }
            this.playerBlock.css({
                'top':self.disY+'px'
            })

        }else{
            this.disX += self.playerX;
            if(this.disX > 12720){
                this.disX = 12720;
            }
        }

        this.playerBlock.css({
            left:this.disX+"px"
        });
    }

}