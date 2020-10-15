<template>
  <section style="height:100%;">
    <!-- 顶部 -->
    <div class="index_top" v-if="showList" @click="goList">
      <img class="index_top_img" src="../assets/imgs/gy_dt_13.png" alt="">
    </div>
    <div class="change_daohang" v-if="!showtop">
      <div class="change_daohang_ul">
        <div class="top_active">步行</div>
        <div>骑行</div>
        <div>驾车</div>
      </div>
    </div>
    <div class="baidumap" id="mapContainer"></div>
      <footMap class="foot_map" @changeBottom="changeNav1" :index-id = indexId :wxInfor="wxInfor"></footMap>
    <!-- 右侧 -->
    <div class="index_right">
        <!-- <img class="index_right_img" src="../assets/imgs/gy_dt_5.png" alt="" @click="userSos"> -->
        <!-- <img class="index_right_img" src="../assets/imgs/浮动图标.png" alt=""> -->
        <!-- <img class="index_right_img" src="../assets/imgs/定位@2x.png" alt="" @click="locationNow"> -->
    </div>
      <!-- 停车场弹框 -->
      <div class="company_profile" v-if="showtc">
          <img class="loginBack" src="../assets/imgs/loginBack.png" alt="" @click="showtc=false">
          <div class="company_profile_cont_img"></div>
          <div class="company_profile_cont">
              <div class="company_profile_cont_top">
                <span style="color:#333333;font-size:14px;">{{showInfor.name}}</span>  
                <!-- <span>500m</span>   -->
              </div>
              <div style="color:#727272;font-size:12px;">单层停车场，共53个车位</div>
              <div style="color:#727272;font-size:12px;">开放时间：全天</div>
              <div class="company_profile_cont_bottom">
                <!-- <div class="company_profile_cont_bottom_btn">预约停车</div> -->
                <div class="company_profile_cont_bottom_btn" @click="goNavigationList">到这去</div>
              </div>
          </div>
      </div>
      <!-- 停车导航 -->
      <div class="company_profile" v-show="showdh">
          <div class="company_profile_top">
            <span>8分钟 500米</span>
          </div>
          <img class="loginBack" src="../assets/imgs/loginBack.png" alt="" @click="showdh=false,showtop =true,changeNav(indexId)">
          <div class="company_profile_cont2">
              <div class="company_profile_cont_bottom2">
                <div class="company_profile_cont_bottom_btn">AR导航</div>
                <div class="company_profile_cont_bottom_btn is_action_btn">开始导航</div>
              </div>
          </div>
      </div>
      <!-- 智能卫生间 -->
      <!-- <div class="company_profile" v-show="showwsj">
          <img class="loginBack" src="../assets/imgs/loginBack.png" alt="" @click="showwsj=false,changeNav(indexId)">
          <div class="company_profile_cont_img"></div>
          <div class="company_profile_cont">
              <div class="company_profile_cont_top">
                <span>智能卫生间</span>  
                <span>500m</span>  
              </div>
              <div>人流较拥挤，需要排队等待约5分钟</div>
              <div>车位查看及导航，预约停车，智能缴费</div>
              <div class="company_profile_cont_bottom">
                <div class="company_profile_cont_bottom_btn">预约</div>
                <div class="company_profile_cont_bottom_btn is_action_btn" @click="changeTC1">到这去</div>
              </div>
          </div>
      </div> -->
      <!-- <indexTem @indexid="indexid" @changeBottom1='changeBottom1'></indexTem> -->
  </section>
</template>

<script>
let _this
import footMap from './footMap'
// import indexTem from './index'
// import BaiduMap from '../../map.js'
import {userSos,classifyListtow,selectassets,planassets} from "../url/api"
import Tmap from '../assets/js/initMap'
export default {
  data(){
    _this = this
    return{ 
      aamap:'',
      showInfor:{},
      config:{
        headers: { Authorization:''}
      },
      indexId:100,
      pushInfor:{
        latitude:'',
        longitude:'',
        userId:''
      },
      classifyList:[],
      token:'',
      objInfor:{},
      starPlselect:{},
      endPlselect:{
        endId:'',
        endType:'',
      },
      paths:[],
      center:'',
      markerLayer:'',
      positionNum:0,
      styles:{},
      geometries:[],
      mapObj:'',
      parentId:0,
      wxInfor:{},//接受微信小程序的参数
      dinweiStatus:true,//判断是否为点击了定位
      geolocation:null,
      showtc:false,//停车场弹窗
      showdh:false,//停车导航
      showtop:true,//顶部显示切换
      showList:true,//列表
      showwsj:false//卫生间
    }
  },
  updated(){
      let obj =sessionStorage.getItem("choisedInfor")
      obj = JSON.parse(obj)
      console.log("更新成功："+obj)
      if(obj){
        this.starPlselect.startId=obj.startId
        this.starPlselect.startType=obj.startType
        this.endPlselect.endId=obj.endId
        this.endPlselect.endType=obj.endType
        this.planassets()
      }
      sessionStorage.clear("choisedInfor")

  },
  methods:{
    classifyListtow(indexId,config){////查询公园资产归类二级下拉列表
      let params = {
        parentId:indexId
      }
      console.log(params)
      classifyListtow(params,config).then((res)=>{
        console.log(res)
        if(res.data.code==200){
          this.classifyList = res.data.data
        }
      })
    },
    selectassets(parentId){//公园内设施列表
      this.geometries = []
      let obj1 = {}
      let params = {
          parentId:localStorage.getItem("isAction")||parentId
        }
      selectassets(params).then((res)=>{
        console.log(res)
        if(res.data.code==200){
          this.classifyList = res.data.data.filter(item=>{
            // item.uncheckImg=this.toBase64(item.uncheckImg)
            let obj = {
              "id": item.id,
              "styleId": 'map_'+item.id,
              "position": new TMap.LatLng(item.latitude,item.longitude),
              "properties": {
                  "name": item.name,
                  "id": item.id,
                  "type": item.type
              }
            }
            
            obj1[obj.styleId]= new TMap.MarkerStyle({
                  "width": 38,
                  "height": 43,
                  "src":item.uncheckImg
              }),
            _this.geometries.push(obj)
            return item
          })
          // console.log(obj1)
          _this.styles=obj1
        }
        _this.addMarkerinfoWindow()
      })
      
    },
    planassets(){//查询导航路线
      let plselected={
        "startId": this.starPlselect.startId,
        "startType": this.starPlselect.startType,
        "endId": this.endPlselect.endId,
        "endType": this.endPlselect.endType
      }
      planassets(plselected).then((res)=>{
        console.log(res)
        if(res.data.code==200){
          this.paths = res.data.data
          if(this.paths.length==0){
            alert("暂时还未规划路线")
          }
        }
      })
    },
    indexid(val){
      console.log(val)
      this.indexId = val
      // this.changeNav1(val)
    },
    changeBottom1(val){
      console.log(val)
      this.showtop = val
      this.changeNav1(1)
    },
    changeTC(){//停车场转态切换
      this.showtc =false
      this.showdh =true
      this.showtop =false
      let map  = this.aamap
      map.centerAndZoom(new BMap.Point(114.987516 ,22.842548), 15);
      var walking = new BMap.WalkingRoute(map, {renderOptions:{map: map, autoViewport: true}});
      var start = new BMap.Point(114.987 ,22.842548);
      var end = new BMap.Point(114.987516 ,22.84);
      walking.search(start, end);
    },
    // changeTC1(){//洗手间
    //   this.showwsj =false
    //   this.showdh =true
    //   this.showtop =false
    //   let map  = this.aamap
    //   map.centerAndZoom(new BMap.Point(114.987516 ,22.842548), 15);
    //   var walking = new BMap.WalkingRoute(map, {renderOptions:{map: map, autoViewport: true}});
    //   var start = new BMap.Point(115.00 ,22.8525);
    //   var end = new BMap.Point(114.987516 ,22.84);
    //   walking.search(start, end);
    // },
    changeNav1(val){
      console.log(val)
      this.indexId = val
      this.markerLayer.setGeometries([])
      if(val==100){
        this.selectassets(0)
      }else{
        this.selectassets(val)
      }
    },
    goBack(){
      this.$router.go(-1)
    },
    loadMap(){
      _this = this
      Tmap.init().then((Tmap)=>{
        var map = new TMap.Map('mapContainer', {
          zoom: 18,
          minZoom:15,
          pitch:0,  //设置俯仰角
          center: new TMap.LatLng(22.831779,114.980945),
        });
        _this.mapObj = map

        map.pitchTo(0)//平滑变化到指定俯仰角度
        map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM);
        map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION);
        //绑定点击事件
        // map.on("click",function(evt){
        //     var lat = evt.latLng.getLat().toFixed(6);
        //     var lng = evt.latLng.getLng().toFixed(6);
        //     console.log(lat + "," + lng)
        // })
        // _this.addMarkerinfoWindow()
        _this.selectassets(0)
        // _this.dinwei()
        // _this.playLine()
        TMap.ImageTileLayer.createCustomLayer({
          layerId: '5f6b13185922',
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
    showPosition(position) {//定位成功
        console.log(position)
        this.mapObj.setCenter(new TMap.LatLng(position.lat,position.lng));//设置地图的中心位置
        this.pushInfor.latitude = position.lat
        this.pushInfor.longitude = position.lng
        if(this.dinweiStatus){

        }else{
          this.userSos()
        }
    },
    showErr() {
      _this = this
      console.log("dinweishibai")
        this.positionNum ++;
        if(_this.positionNum<5){
          _this.geolocation.getIpLocation(_this.showPosition, _this.showErr)
        }else{
          this.$message("定位失败")
        }
        
    },
    addMarkerinfoWindow(){
      let _this = this
      let img =[
        require('../assets/imgs/gy_dt_7.png'),
        require('../assets/imgs/gy_dl_29.png'),
        require('../assets/imgs/gy_dl_30.png'),
        require('../assets/imgs/gy_dt_8.png'),
        require('../assets/imgs/gy_dt_9.png'),
        require('../assets/imgs/gy_dt_10.png'),
        require('../assets/imgs/gy_dt_11.png'),
        require('../assets/imgs/gy_dl_31.png'),
        require('../assets/imgs/gy_dt_21.png'),
        require('../assets/imgs/gy_dt_20.png'),
        ] 
        // this.geometries = [{
        //       "id": 'demo1',
        //       "styleId": 'marker',
        //       "position": new TMap.LatLng(22.834532,114.983737),
        //       "properties": {
        //           "name": "深汕LOGO"
        //       }
        //   }, {
        //       "id": 'demo2',
        //       "styleId": 'gy_dt_7',
        //       "position": new TMap.LatLng(22.831314,114.980954),
        //       "properties": {
        //           "name": "产业广场"
        //       },

        //   }, {
        //       "id": 'demo3',
        //       "styleId": 'gy_dl_29',
        //       "position": new TMap.LatLng(22.831533,114.9808591),
        //       "properties": {
        //           "name": "园林洗手间",
        //           "id": "园林洗手间",
        //           "type": "aaa",
        //       },

        //   }, {
        //       "id": 'demo4',
        //       "styleId": 'gy_dl_30',
        //       "position": new TMap.LatLng(22.831501,114.981098),
        //       "properties": {
        //           "name": "管理处"
        //       },

        //   }, {
        //       "id": 'demo4',
        //       "styleId": 'gy_dt_8',
        //       "position": new TMap.LatLng(22.831549,114.980988),
        //       "properties": {
        //           "name": "深汕石"
        //       },

        //   }, {
        //       "id": 'demo4',
        //       "styleId": 'gy_dt_9',
        //       "position": new TMap.LatLng(22.831941,114.980946),
        //       "properties": {
        //           "name": "荣耀径"
        //       },

        //   }, {
        //       "id": 'demo4',
        //       "styleId": 'gy_dt_10',
        //       "position": new TMap.LatLng(22.832426,114.980787),
        //       "properties": {
        //           "name": "企业荣耀馆"
        //       },
        //   }, {
        //       "id": 'demo4',
        //       "styleId": 'gy_dt_11',
        //       "position": new TMap.LatLng(22.832800,114.980359),
        //       "properties": {
        //           "name": "智慧驿站"
        //       },

        //   }, {
        //       "id": 'demo4',
        //       "styleId": 'gy_dl_31',
        //       "position": new TMap.LatLng(22.832744,114.981090),
        //       "properties": {
        //           "name": "东侧入口"
        //       },

        //   }
        //   ,{
        //       "id": 'tcc',
        //       "styleId": 'gy_dt_21',
        //       "position": new TMap.LatLng(22.833121,114.980804),
        //       "properties": {
        //           "name": "停车场"
        //       },
        //   }]
        // console.log(_this.geometries)
      //初始marker
      this.markerLayer = new TMap.MultiMarker({
          // id: Math.random(),
          map: _this.mapObj,
          styles: _this.styles,
          geometries: _this.geometries
      });
      //初始化infoWindow
      var infoWindow = new TMap.InfoWindow({
          map: _this.mapObj,
          content:'',
          position: new TMap.LatLng(22.834532,114.983737),
      });
      // infoWindow.close();//初始关闭信息窗关闭
      //监听标注点击事件
      this.markerLayer.on("click", function (evt) {
          //设置infoWindow
          infoWindow.open(); //打开信息窗
          infoWindow.setPosition(evt.geometry.position);//设置信息窗位置
          infoWindow.setContent(evt.geometry.properties.name);//设置信息窗内容
          _this.objInfor.id=evt.geometry.properties.id
          _this.objInfor.type=evt.geometry.properties.type
          _this.showtc= true
          _this.showInfor.name = evt.geometry.properties.name
          console.log(_this.objInfor)
      })
    },
    playLine(paths){//划线
      let pathsArr=[]
      if(paths){
        paths.forEach(item => {
          pathsArr.push(new TMap.LatLng(item.latitude,item.longitude))
        });
      }
     let polyline = new TMap.MultiPolyline({
          id: 'polyline-layer',
          map: _this.mapObj,
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
                  'paths': pathsArr, //折线的位置信息
                  'properties': { //折线的属性数据
                      'name': 'customStyle'
                  }
              },
          ]
      });
    },
    dinwei(){//加载腾讯地图定位组件
      _this = this
      var script = document.createElement("script");
      script.type = "text/javascript";
      // script.src = "https://map.qq.com/api/js?v=2.exp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&callback=onqqMapCallback";
      script.src = "https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js";
      document.body.appendChild(script);
      this.geolocation = new qq.maps.Geolocation("CGABZ-3AN3O-I77WS-SGE22-NM6YF-ATBPN&callback", "myapp");
      console.log(2)
      // this.geolocation.getIpLocation(_this.showPosition, _this.showErr)
    },
    weixin(){
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://res.wx.qq.com/open/js/jweixin-1.3.2.js";
      document.body.appendChild(script);
      console.log("微信js异步加载完成")
    },
    goNavigationList(){//选择路线
      let obj = this.objInfor
      obj.name = this.showInfor.name
      obj.indexId = this.indexId
      obj = JSON.stringify(obj)
      this.$router.push({
        path:'/navigationList',
        query:{
          endInfor:obj
        }
      })
    },
    goList(){//景点列表
      console.log('/pages/index/viewPoint/viewPoint')
      wx.miniProgram.postMessage({ data: 'foo3' })
      wx.miniProgram.navigateTo({url: '/pages/index/viewPoint/viewPoint'})
    },
    getQueryString(name){//接收小程序传来的参数
    console.log("接收小程序传来的参数"+name)
      console.log("地址："+window.location)
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      if(window.location.hash.indexOf("?") < 0){
              return null;
      }
      let r = window.location.hash.split("?")[1].match(reg); 　　
      if (r != null) return decodeURIComponent(r[2]); 
  　　    return null; 
      },
    getQueryString1(name){//接收小程序传来的参数
    console.log("接收小程序传来的参数1"+name)
      console.log("地址："+window.location)
        var query = window.location.hash.substring(4);
        // var query = window.location.search.substring(1);
        console.log(query)
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == name) {
                return pair[1];
            }
        }
        return (false);
      },
      userSos(){//报警功能pushInfor
        this.dinweiStatus = false
        userSos(this.pushInfor).then((res)=>{
          console.log(res)
          if(res.data.code==200){

          }
        })
      },
      toBase64(imgUrl) {
          // 一定要设置为let，不然图片不显示
          console.log(imgUrl)
          const image = new Image();
          // 解决跨域问题
          image.setAttribute('crossOrigin', 'anonymous');
          const imageUrl = imgUrl;
          
          image.src = imageUrl
          // image.onload为异步加载
          image.onload = () => {
              var canvas = document.createElement('canvas');
              canvas.width = image.width;
              canvas.height = image.height;
              var context = canvas.getContext('2d');
              context.drawImage(image, 0, 0, image.width, image.height);
              var quality = 0.8;
              // 这里的dataurl就是base64类型
              // 使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
              const dataurl = canvas.toDataURL('image/jpeg', quality);
              
              return dataurl
          }
      },
      locationNow(){//点击定位
        this.dinweiStatus = true
        this.geolocation.getIpLocation(_this.showPosition, _this.showErr)
      }
  },
  mounted(){
    // console.log(this.getQueryString("info"))
    
    this.wxInfor = JSON.parse(this.getQueryString("info"))
    // if(this.wxInfor){
    //   this.starPlselect.startId=this.wxInfor.startId
    //   this.starPlselect.startType=this.wxInfor.startType
    //   this.endPlselect.endId=this.wxInfor.endId
    //   this.endPlselect.endType=this.wxInfor.endType
    //   console.log(this.endPlselect)
    //   if(this.endPlselect.endId){
    //     this.planassets()
    //   }
    // }
    // this.config.headers.Authorization = this.wxInfor.Authorization||''
    this.weixin()
    this.loadMap()

    // this.classifyListtow()
    // this.selectassets(0)
    setTimeout(()=>{

        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
            wx.miniProgram.getEnv((res)=>{
              if (res.miniprogram) {
                  //  alert("在小程序里");
                  _this.showList = true
              } else {
                  //  alert("不在小程序里");
                  _this.showList = false
              }
            })
        }else{
        _this.showList = false
        // alert('不在微信里');
    }
    },1000)

  },
  components:{
    footMap,
    // indexTem
  }
}
</script>

<style scoped>
#mapContainer{
  z-index: 10;
}
.foot_map {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    overflow: hidden;
    border-top: 1px solid #efefef;
    z-index: 9999;
}

.change_daohang{
  position:fixed;
  top:110px;
  left:0;
  width:100%;
  overflow: hidden;
  z-index: 100;
}
.change_daohang_ul{
  display: flex;
  justify-content: center;
  background: #fff;
  border: 1px solid #999;
  border-radius:5px;
  margin:0 auto;
  font-size:14px;
  width:4rem;
}
.change_daohang_ul div{
  width:33.33%;
  box-sizing: content-box;
  text-align: center;
  padding:0.15rem 0;
}
.change_daohang_ul div:nth-child(2){
  border-left:1px solid #999;
  border-right:1px solid #999;
}
.top_active{
  background:#333;
  color:#fff;
}
.baidumap{
  width:100%;
  height:100%;
}
.index_right {
    position: fixed;
    bottom: 200px;
    right: 40px;
    width: 98px;
    z-index: 9999;
}
.index_right_img {
    width: 98px;
}
.index_top_left {
    position: absolute;
    top: 0.7rem;
    left: 10px;
    /* width: 30%; */
    display: flex;
    z-index: 1000;
    font-size:14px;
    padding:10px;
    color:rgba(0, 0, 0, 0);
    /* background: url(../assets/imgs/图层-3345.png)no-repeat center; */
    background-size:20px;
}
.company_profile {
    background:#fff;
    overflow: hidden;
    position: fixed;
    bottom:170px;
    left:0px;
    width:100%;
    box-sizing: border-box;
    padding:50px 20px;
    z-index: 10010;
    /* border:1px solid red; */
}

.company_profile_top {
    position:absolute;
    top:30px;
    left:24px;
    font-size: 30px;
    font-weight: 600;
}

.company_profile_cont {
    font-size: 14px;
    height: 200px;
    box-sizing: border-box;
    margin-left: 220px;
    overflow: hidden;
    position: relative;
}
.company_profile_cont2 {
    font-size: 14px;
    height: 2rem;
    box-sizing: border-box;
    margin-left: 0.2rem;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
}

.company_profile_cont_img {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 50px;
    left: 20px;
    background: url(../assets/imgs/图层-3345.png) no-repeat center;
    background-size: cover;
    margin-bottom:20px;
}

.company_profile_cont_bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width:100%;
    display: flex;
    flex-direction: row-reverse;
}
.company_profile_cont_bottom2 {
    width:100%;
    display: flex;
}
.company_profile_cont_bottom_btn{
    background: #de632a;
    line-height: 100%;
    border-radius: 25px;
    padding: 10px 45px;
    margin-right:20px;
    font-size: 28px;
    color:#fff;

}
.is_action_btn{
  background:rgb(74, 131, 247);
  color: #fff;
}
.company_profile_cont_top{
  position:relative;
  display: flex;
  justify-content: space-between;
  margin-top:5px;
  margin-bottom:10px;
}
.loginBack{
  position:absolute;
  top:0px;
  right:0px;
  width:24px;
  padding:22px 20px;
}
.index_top_img {
    width: 98px;
}
.index_top_div {
    width: 98px;
    height: 98px;
    background: #efefef;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.index_top {
    position: absolute;
    top: 60px;
    right: 40px;
    display: inline-block;
    z-index: 100;
}

</style>