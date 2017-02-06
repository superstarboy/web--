<?php 
    if(empty($_SESSION['user']))
    {
        header("location:./index.php"); 
    }
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<link rel="stylesheet" type="text/css" href="./css/HF160730.css"/>
		<link rel="stylesheet" href="./css/buycha.css" type="text/css"/>
		<script src="./js/jquery-3.1.0.min.js"></script>
		<script src="./js/echarts.min.js"></script>
		<script type="text/javascript">
        $.ajax({
			type:'get',
			url:'index.php?c=Game&a=fenxi',					
			dataType:'json',
			success:function(res){	
				var myChart = echarts.init(document.getElementById('buyfx'));
			    var dataAxis=[];
			    var data = [];
				for(i=0;i<res.length;i++)
				{
					dataAxis.push(res[i]['rec_time']);
					data.push(res[i]['rec_money']);
				}												
				var yMax = 500;
		        var dataShadow = [];
		        for (var i = 0; i < data.length; i++) {
		            dataShadow.push(yMax);
		        }
		        option = {
		                title: {
		                    text: '渣渣游戏收入分析图',
		                    //subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
		                },
		                xAxis: {
		                    data: dataAxis,
		                    axisLabel: {
		                        inside: true,
		                        textStyle: {
		                            color: '#fff'
		                        }
		                    },
		                    axisTick: {
		                        show: false
		                    },
		                    axisLine: {
		                        show: false
		                    },
		                    z: 10
		                },
		                yAxis: {
		                    axisLine: {
		                        show: false
		                    },
		                    axisTick: {
		                        show: false
		                    },
		                    axisLabel: {
		                        textStyle: {
		                            color: '#999'
		                        }
		                    }
		                },
		                dataZoom: [
		                    {
		                        type: 'inside'
		                    }
		                ],
		                series: [
		                    { // For shadow
		                        type: 'bar',
		                        itemStyle: {
		                            normal: {color: 'rgba(0,0,0,0.05)'}
		                        },
		                        barGap:'-100%',
		                        barCategoryGap:'40%',
		                        data: dataShadow,
		                        animation: false
		                    },
		                    {
		                        type: 'bar',
		                        itemStyle: {
		                            normal: {
		                                color: new echarts.graphic.LinearGradient(
		                                    0, 0, 0, 1,
		                                    [
		                                        {offset: 0, color: '#83bff6'},
		                                        {offset: 0.5, color: '#188df0'},
		                                        {offset: 1, color: '#188df0'}
		                                    ]
		                                )
		                            },
		                            emphasis: {
		                                color: new echarts.graphic.LinearGradient(
		                                    0, 0, 0, 1,
		                                    [
		                                        {offset: 0, color: '#2378f7'},
		                                        {offset: 0.7, color: '#2378f7'},
		                                        {offset: 1, color: '#83bff6'}
		                                    ]
		                                )
		                            }
		                        },
		                        data: data
		                    }
		                ]
		            };

		            // Enable data zoom when user click bar.
		            var zoomSize = 6;
		            myChart.on('click', function (params) {
		                console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
		                myChart.dispatchAction({
		                    type: 'dataZoom',
		                    startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
		                    endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
		                });
		            });

		            // 使用刚指定的配置项和数据显示图表。
		            myChart.setOption(option);								
			},
			error:function(){alert("error");}
			})
    </script>
	</head>
	<body>
	<div id="buyfx" style="width: 800px;height:400px;"></div>
	</body>
</html>