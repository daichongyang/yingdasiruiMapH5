<template>
  <section>
    <div id="mapContainer"></div>
  </section>
</template>

<script>
import Tmap from '../assets/js/initMap'
export default {
  data(){
    return{
      center:[]
    }
  },
  methods:{
    loadMap(){
      let _this = this
      Tmap.init().then((Tmap)=>{
        var position = document.getElementById("position");
        var map = new TMap.Map('mapContainer', {
          zoom: 15,
          center: new TMap.LatLng(22.835117,114.980834)
        });
        //绑定点击事件
        map.on("click",function(evt){
            var lat = evt.latLng.getLat().toFixed(6);
            var lng = evt.latLng.getLng().toFixed(6);
            position.innerHTML = lat + "," + lng;
            console.log(lat + "," + lng)
        })
        _this.addMarkerinfoWindow(map)
        _this.playLine(map)
        TMap.ImageTileLayer.createCustomLayer({
          layerId: '5f5f2ad23757',
          map: map
        }).then(customLayer => {
          if (customLayer) {// 成功创建个性化图层
  
          } else {
            // 创建失败，请查看控制台错误信息
            console.log('fail');
          }
        });
      })
    },
    addMarkerinfoWindow(map){
      //初始marker
      var marker = new TMap.MultiMarker({
          id: 'marker-layer',
          map: map,
          styles: {
              "marker": new TMap.MarkerStyle({
                  "width": 24,
                  "height": 35,
                  "anchor": { x: 12, y: 35 },
                  "src": 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png'
              })
          },
          geometries: [{
              "id": 'demo1',
              "styleId": 'marker',
              "position": new TMap.LatLng(22.834532,114.983737),
              "properties": {
                  "title": "深汕LOGO"
              }
          }, {
              "id": 'demo2',
              "styleId": 'marker',
              "position": new TMap.LatLng(22.834668 ,114.983762),
              "properties": {
                  "title": "产业广场"
              },

          }, {
              "id": 'demo3',
              "styleId": 'marker',
              "position": new TMap.LatLng(22.834833, 114.983745),
              "properties": {
                  "title": "园林洗手间"
              },

          }, {
              "id": 'demo4',
              "styleId": 'marker',
              "position": new TMap.LatLng(22.834864, 114.983790),
              "properties": {
                  "title": "深汕石"
              },

          }, {
              "id": 'demo4',
              "styleId": 'marker',
              "position": new TMap.LatLng(22.835130, 114.983705),
              "properties": {
                  "title": "荣耀径"
              },

          }, {
              "id": 'demo4',
              "styleId": 'marker',
              "position": new TMap.LatLng(22.835419,114.983396),
              "properties": {
                  "title": "活动场地"
              },

          }, {
              "id": 'demo4',
              "styleId": 'marker',
              "position": new TMap.LatLng(22.835500, 114.983566),
              "properties": {
                  "title": "企业荣耀馆"
              },

          }, {
              "id": 'demo4',
              "styleId": 'marker',
              "position": new TMap.LatLng(22.836337,114.982636),
              "properties": {
                  "title": "智慧驿站"
              },

          }, {
              "id": 'demo4',
              "styleId": 'marker',
              "position": new TMap.LatLng(22.835726,114.983948),
              "properties": {
                  "title": "东侧入口"
              },

          }, {
              "id": 'demo4',
              "styleId": 'marker',
              "position": new TMap.LatLng(22.835981,114.983572),
              "properties": {
                  "title": "停车场"
              },

          }, {
              "id": 'demo4',
              "styleId": 'marker',
              "position": new TMap.LatLng(22.836219,114.983397),
              "properties": {
                  "title": "现状边坡线"
              },

          }]
      });
      //初始化infoWindow
      var infoWindow = new TMap.InfoWindow({
          map: map,
          content:'深汕LOGO',
          position: new TMap.LatLng(22.834532,114.983737),
          offset: { x: 0, y: -32 } //设置信息窗相对position偏移像素
      });
      // infoWindow.close();//初始关闭信息窗关闭
      //监听标注点击事件
      marker.on("click", function (evt) {
          //设置infoWindow
          infoWindow.open(); //打开信息窗
          infoWindow.setPosition(evt.geometry.position);//设置信息窗位置
          infoWindow.setContent(evt.geometry.properties.title);//设置信息窗内容
      })
    },
    playLine(map){//划线
     let polyline = new TMap.MultiPolyline({
            id: 'polyline-layer',
            map: map,
            styles: {
                'polyline': new TMap.PolylineStyle({
                    'color': '#00FF00', //线填充色
                    'width': 4, //折线宽度
                    'borderWidth': 5, //边线宽度
                    'borderColor': 'rgba(0,125,255,0.5)', //边线颜色
                    'lineCap': 'round' //线端头方式
                }),

            },
            geometries: [
                {
                    'id': 'polyline', //折线图形数据的标志信息
                    'styleId': 'polyline', //样式id
                    'paths': [new TMap.LatLng(22.834532,114.983737), new TMap.LatLng(22.835419,114.983396), new TMap.LatLng(22.835981,114.983572)], //折线的位置信息
                    'properties': { //折线的属性数据
                        'title': 'customStyle'
                    }
                },
            ]
        });
    // function setStyle(type) {
    //     switch (type) {
    //         case 'styleOne':
    //             polyline.setStyles({
    //                 'polyline': new TMap.PolylineStyle({
    //                     'color': '#00FF00', //线填充色
    //                     'width': 6, //折线宽度
    //                     'borderWidth': 5, //边线宽度
    //                     'borderColor': 'rgba(0,125,255,0.5)', //边线颜色
    //                     'lineCap': 'round' //线端头方式
    //                 })
    //             });
    //             break;
    //         case 'styleTwo':
    //             polyline.setStyles({
    //                 'polyline': new TMap.PolylineStyle({
    //                     'color': 'rgba(255,0,0,0.3)', //线填充色
    //                     'width': 10,//折线宽度
    //                     'borderWidth': 4, //边线宽度
    //                     'borderColor': '#999', //边线颜色
    //                     'lineCap': 'square' //线端头方式
    //                 })
    //             });
    //             break;
    //         default: ;
    //     }
    //   }
    }

    // loadMap(){
    //   let _this = this
    //   let mydom;
    //   Tmap.init().then((Tmap)=>{
    //     //自定义DOM覆盖物 - 继承DOMOverlay
    //     function myMarker(options) {
          
    //       TMap.DOMOverlay.call(this, options);
    //     }
    //     myMarker.prototype = new TMap.DOMOverlay();

    //     // 初始化
    //     myMarker.prototype.onInit = function (options) {
    //       this.position = options.position;
    //       this.type = options.type; // 当前marker的类型，是跳动或飞入
    //     }

    //     // 创建
    //     myMarker.prototype.createDOM = function () {
    //       mydom = document.createElement('img');  // 新建一个img的dom
    //       mydom.src = 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png';
    //       mydom.style.cssText = [
    //         'position: absolute;',
    //         'top:  0px;',
    //         'left: 0px;'
    //       ].join('');
    //       switch (this.type) {
    //         case 'bounce':
    //           mydom.setAttribute('class', 'markerBounce');  // 给新建的dom添加marker类，添加跳动效果
    //           break;
    //         case 'flash':
    //           mydom.setAttribute('class', 'markerFlash');		// 给新建的dom添加marker类，添加飞入效果
    //           break;
    //       }
    //       return mydom;
    //     }

    //     // 更新DOM元素，在地图移动/缩放后执行
    //     myMarker.prototype.updateDOM = function () {
    //       if (!this.map) {
    //         return;
    //       }
    //       let pixel = this.map.projectToContainer(this.position); // 经纬度坐标转容器像素坐标
    //       let left = pixel.getX() - this.dom.clientWidth / 2 + 'px';
    //       let top = pixel.getY() + 'px';
    //       // 使用top/left将DOM元素定位到指定位置
    //       this.dom.style.top = top;
    //       this.dom.style.left = left;
    //     }

    //     var map, markerBounce;
    //       map = new TMap.Map('mapContainer', {
    //       zoom: 15,
    //       center: new TMap.LatLng(22.835117,114.980834)
    //     });
    //     TMap.ImageTileLayer.createCustomLayer({
    //       layerId: '5f5f2ad23757',
    //       map: map
    //     }).then(customLayer => {
    //       if (customLayer) {// 成功创建个性化图层
    //         // 创建跳动的marker
    //           markerBounce = new myMarker({
    //           map,
    //           position: new TMap.LatLng(22.835117,114.980834),
    //           type: 'bounce'
    //         });

    //         setTimeout(() => {
    //           // 创建飞入的marker
    //           var markerFlash = new myMarker({
    //             map,
    //             position: new TMap.LatLng(22.8357,114.980834),
    //             type: 'flash'
    //           });
    //         markerFlash.on("click", function (evt) {
    //             console.log(evt)
    //             //设置infoWindow
    //             infoWindow.open(); //打开信息窗
    //             // infoWindow.setPosition(evt.geometry.position);//设置信息窗位置
    //             infoWindow.setContent('爱了');//设置信息窗内容
    //         })
    //         }, 2000);
    //       //初始化infoWindow
    //         var infoWindow = new TMap.InfoWindow({
    //             map: map,
    //             position: new TMap.LatLng(22.835117,114.980834),
    //             content:"My location",
    //             offset: { x: 0, y: 0} //设置信息窗相对position偏移像素
    //         });
    //         // infoWindow.close();//初始关闭信息窗关闭
    //         // //监听标注点击事件
    //         console.log(markerBounce)
    //         markerBounce.on("click", function (evt) {
    //             console.log(evt)
    //             //设置infoWindow
    //             infoWindow.open(); //打开信息窗
    //             // infoWindow.setPosition(evt.geometry.position);//设置信息窗位置
    //             infoWindow.setContent('爱了');//设置信息窗内容
    //         })
    //       } else {
    //         // 创建失败，请查看控制台错误信息
    //         console.log('fail');
    //       }
    //     });
    //   })
    // },
  },
  mounted(){
    this.loadMap()
  }
}
</script>

<style>
#mapContainer{
  height:100%;
  width:100%;
}
	/* marker跳动的动画 */
	.markerBounce {
		animation: bounce 0.5s infinite ease-in-out alternate;
	}

	/* marker飞入的动画 */
	.markerFlash {
		animation: flash 0.5s ease-in 1 normal forwards;
	}

	/* 跳动的动画 */
	@keyframes bounce {
		0% {
			transform: translate(0, 0);
		}

		100% {
			transform: translate(0, -10px);
		}
	}

	/* 飞入的动画 */
	@keyframes flash {
		0% {
			transform: translate(0, -200px);
		}

		100% {
			transform: translate(0, 0);
		}
	}
  #info{
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: 14px;
    background: #FFF;
    width: 270px;
    padding: 10px;
    border-radius: 3px;
  }
</style>