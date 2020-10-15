<template>
  <div class="floott">
      <div class="floott_box">
        <span class="floott_span" :class="{floott_span_active:isAction==100}" @click="goamapOptions(100)" >全部</span>
        <span class="floott_span" v-for="item in classifyList" :key="item.id" :class="{floott_span_active:isAction==item.id}" @click="goamapOptions(item.id)" >{{item.name}}</span>
      </div>
      <!-- <div class="floott_box">
        <span class="floott_span" :class="{floott_span_active:isAction==100}" @click="goamapOptions(100)" >全部</span>
        <span class="floott_span" :class="{floott_span_active:isAction==2}" @click="goamapOptions(2)">休闲娱乐</span>
        <span class="floott_span" :class="{floott_span_active:isAction==3}" @click="goamapOptions(3)">智慧停车</span>
        <span class="floott_span" :class="{floott_span_active:isAction==4}" @click="goamapOptions(4)">洗手间</span>
        <span class="floott_span" :class="{floott_span_active:isAction==5}" @click="goamapOptions(5)">游客服务</span>
        <span class="floott_span" :class="{floott_span_active:isAction==6}" @click="goamapOptions(6)">出入口</span>
        <span class="floott_span" :class="{floott_span_active:isAction==7}" @click="goamapOptions(7)">智慧管控</span>
        <span class="floott_span"></span>
      </div> -->

  </div>
</template>
<script>
import {classifyListtow,classifyListone} from "../url/api"

export default {
  data () {
    return {
      isAction:100,
      Authorization:'',
      classifyList:[]
    }
  },
  props:['indexId',"wxInfor"],
  watch:{
    indexId(val){//地图传过来的值
      this.isAction = val
      // sessionStorage.setItem("isAction",this.isAction)
    },
    wxInfor(val){
      console.log(val)
      // this.Authorization  = val.Authorization
      this.classifyListone()
    }
  },
  methods:{
    classifyListone(){////查询公园资产归类一级下拉列表
      let params = {
      }
      // console.log(config)
      classifyListone(params).then((res)=>{
        console.log(res)
        if(res.data.code==200){
          this.classifyList = res.data.data
        }
      })
    },
    goamapOptions(index){
      if(index == 100){
        localStorage.setItem("isAction",0)
      }else{
        localStorage.setItem("isAction",index)
      }
      this.$nextTick(()=>{
        this.isAction = index
      })
      this.$emit('changeBottom',index)
      // this.$router.push({
      //   path:"./"
      // })
    }
  },
  mounted(){
    this.isAction =Number(localStorage.getItem("isAction"))||100
    // this.classifyListone()
  }
}
</script>

<style scoped>
.is_active{
  color:rgb(63, 200, 170);
}
.floott {
    background: #fff;
    width: 100%;
    height:170px;
}
.floott_box{
    color: #de632a;
    font-size: 28px;
    display: flex;
    overflow: hidden;
    overflow-x: auto;
    margin-top:30px;
    margin-left:24px;
    margin-right:30px;
    padding-bottom:100px;
}
.floott_box::-webkit-scrollbar {
    display: none
}
.floott_span{
  display: block;
  padding:8px 28px;
  flex:0 0 auto;
  /* min-width: 100px; */
  box-sizing: border-box;
  line-height: 100%;
  margin-right:5px;
}
.floott_span_active{
  border:1px solid #f7941d;
  font-weight: 600;
  border-radius: 40px;
}
.floott_p{
  margin-right:0.2rem;
}

.floott_p span {
    display: block;
    text-align: center;
    min-width:110px;
}

.floott img {
    display: block;
    margin: 0 auto;
    width:50px;
    height:50px;
    margin-bottom:10px;
}

</style>
