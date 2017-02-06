/**
 * Created by Administrator on 2016/10/13.
 */
//======================
//强调导演最后引入
//======================
function director($div){
    this.$div=$div;
    this.runScene=function(scene){
        this.$div.empty();//清空内容
        this.$div.append(scene);//加入内容
    }
};

//================判断跳转页面
$(function(){
    function JudgeScene(messa){
        if(messa=='login'){//登陆页面
            var login = new LoginScene(JudgeScene);          //跳转时没有new导致点击事件失效
            dir.runScene(login.$div);
        }else if(messa=='game'){//游戏页面
            var game = new GameScene(JudgeScene);
            dir.runScene(game.$div);
        }else if(messa=='cut'){//读条跳转页面
            var cut = new CutScene(JudgeScene);
            dir.runScene(cut.$div);
        }else if(messa=='zhuce'){//注册
            var zhuce = new ZhuceScene(JudgeScene);
            dir.runScene(zhuce.$div);
        }else if(messa=='main'){//菜单页面
            var main = new MainScene(JudgeScene);
            dir.runScene(main.$div);
        }else if(messa=='shop'){//商店
            var shop = new ShopScene(JudgeScene);
            dir.runScene(shop.$div);
        }else if(messa=='map'){//地图选择
            var map = new MapScene(JudgeScene);
            dir.runScene(map.$div);
            //旋转代码
            map.$ul.roundabout({          //地图特效函数
                easing:'easeOutInCire',
                duration:600
            });
        }else if(messa=='boss'){//地图关卡选择
            var boss = new BossScene(JudgeScene);
            dir.runScene(boss.$div);
        }else if(messa=='car'){                  //仓库
            var car = new CarScene(JudgeScene);
            dir.runScene(car.$div);
        }else if(messa == 'clear'){
            var clear1 = new ClearScene(JudgeScene);
            dir.runScene(clear1.$div);
        }
    }





 //================新建导演格式

    var dir= new director($("body"));                                    //创建初始化登陆界面
    var login = new LoginScene(JudgeScene);          //跳转时没有new导致点击事件失效
    dir.runScene(login.$div);
});
