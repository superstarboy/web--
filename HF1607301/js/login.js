/**
 * Created by Administrator on 2016/10/13.
 */
//=====================================登陆校验

    //$("input[name='login']").click(
    //    function(){
    //        if($("form").valid()){
    //            alert("success");
    //        }else{
    //            alert("fail");
    //        }
    //    }
    //)

    $.validator.addMethod(   //添加一个系统没有的验证
        "myrule",function(value,element,params){//形式参数  params[]
            if(value.length>=params[0] && value.length <= params[1] ){
                return true;
            }else{
                return false;
            }
        }," 输入长度大于 {0}，小于{1}"
    )
    $.validator.addMethod("nickname",function(value,element){
            var regu="^[0-9a-zA-Z\_]+$";  //正则校验,只能输入数字、字母下划线
            var re=new RegExp(regu);
            if(re.test(value))
                return true;
            else
                return false;
        },
        '只能数字字母下划线'
    );


    //$("form").validate({
    //    rules:{
    //        username:{
    //            required:true,            //必填字段
    //            digits:true,               //只能为数字
    //            myrule:[8,10]              //输入字符串长度大于8小于10
    //        },
    //        pwd1:{
    //
    //        },
    //        pwd2:{
    //            equalTo:"#pwd1"
    //        }
    //    },
    //    messages:{
    //        userName:{
    //
    //        },
    //        pwd1:{
    //
    //        },
    //        pwd2:{
    //            equalTo:"密码不同"
    //        }
    //    }
    //});
