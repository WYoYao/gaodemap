
/**
 * 地铁地图加载
 * 
 * 
 */

window.cbk = function () {
    var mysubway = subway("mysubway", {
        adcode: 1100
        // easy: 1
    });
    // 规划线路数据
    var route_data = {
        start: "",
        end: ""
    }
    // 验证规划线路数据 规划线路
    var route_way = function () {
        if (route_data.start && route_data.end) {
            mysubway.route(route_data.start, route_data.end, { closeBtn: true });
            document.querySelector(".route_close_btn").onclick = function () {
                mysubway.clearRoute();
            }
        }
    }

    var addClickEvent = function (StationId) {
        mysubway.addInfoWindow(StationId);
        // console.log(mysubway.getStCenter(StationId));
        mysubway.setCenter(mysubway.getStCenter(StationId));
        // console.log(document.getElementById("tip_name").innerText);
        document.querySelector("[data-type=start]").onclick = function () {
            mysubway.setStart(StationId);
            route_data.start = StationId;
            route_way();
            mysubway.clearInfoWindow();
        };
        document.querySelector("[data-type=end]").onclick = function () {
            mysubway.setEnd(StationId);
            route_data.end = StationId;
            route_way();
            mysubway.clearInfoWindow();
        }
    }

    // 地图加载完成
    mysubway.event.on("subway.complete", function () {
        var StationId = mysubway.getNearStation({ lnglat: '116.539805,39.772915' });

        // mysubway.stationSearch(StationId, function(){
        //     console.log(arguments);
        // })

        /**
         * 设置起点的事件
         */
        mysubway.event.on("startStation.touch", function (argu, data) {
            console.log(arguments);
        })

        mysubway.event.on("endStation.touch", function (argu, data) {
            console.log(arguments);
        })

        // 默认选中最近的地铁站
        addClickEvent(StationId);


        // mysubway.setStart(StationId, { content: '<div class="tip_wrap"> <div class="tip_bady"> <div class="tip_name_detail"> <span class="tip_name" id="tip_name">同济南路</span>  </div> <div class="tip_route"> <div class="tip_route_btn tip_route_start ust" data-type="start">设为起点</div> <div class="tip_route_btn tip_route_end ust" data-type="end">设为终点</div> </div> </div> <div class="tip_footer"> </div> </div>'})

        // mysubway.setStart(StationId, { x: 0, y: 0 });
        // mysubway.getStCenter(StationId) 



        /**
         * 站点点击事件
         */
        mysubway.event.on("stationName.touch", function (argu, data) {
            addClickEvent(data.id);
            console.log(data);
        })

        mysubway.event.on("station.touch", function (argu, data) {
            addClickEvent(data.id);

            console.log(data);
        })

        // mysubway.event.on("subway.touch", function (argu, data) {
        //     console.log(data);
        // })
        /**
         * 规划线路
         * 
         */
        // mysubway.event.on("subway.routeComplete", function (argu, data) {
        //     console.log(data);
        // })

        // mysubway.route('110100023102005', '110100023102004' ,{
        //     closeBtn: true
        // });


    })


    /////////
      /**
 * 地图加载
 * 
 * 
 */
    var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 10,
        center: [116.480983, 40.0958]
    });

    map.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
    //解析定位结果
    function onComplete(data) {
        // var str = ['定位成功'];
        // str.push('经度：' + data.position.getLng());
        // str.push('纬度：' + data.position.getLat());
        // str.push('精度：' + data.accuracy + ' 米');
        // str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        // document.getElementById('tip').innerHTML = str.join('<br>');

        // console.log({ lnglat: data.position.getLng() + "," + data.position.getLat() });
        var StationId = mysubway.getNearStation({ lnglat: data.position.getLng() + "," + data.position.getLat() });
        addClickEvent(StationId);


        // mysubway.addInfoWindow (StationId, {x:0,y:0});
    }
    //解析定位错误信息
    function onError(data) {
        console.error(data);
    }

    //////////
    

}





