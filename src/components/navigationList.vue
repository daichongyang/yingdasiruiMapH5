<template>
<div>
  <div class="topdiv">
    <div class='changeInfo'>
      <div class='changeInfoName'>
        <text>起点</text>
        <input ref="input" type='text' placeholder='请选择起点' v-model='starName' @blur="starValue=true"/> 
      </div>
      <div class='changeInfoName'>
        <text>终点</text>
        <input type='text' placeholder='请选择终点' v-model='endName' @blur="starValue=false"/> 
      </div>
    </div>
    <button class='changeBtn' @click="goBack">确定</button>
  </div>

  <div class="addressdiv">
    <div v-for="(item,index) in address" :key="index" class="address_item" @click="getStartEnd(item)">
      <!-- <div class="address_imgdiv"><image class="address_img" src="{{item.coverImg}}" mode='scaleToFill'></image></div> -->
      <div class="address_name">{{item.name}}</div>
    </div>
  
  </div>

</div>

</template>
<script>
import {selectassets} from "../url/api"
export default {
  data(){
    return {
      address:[],
      endInfor:JSON.parse(this.$route.query.endInfor)||null,
      starValue:'',
      starName:'',
      endName:'',
      endValue:"",
      choisedInfor:{
        startId:"",
        startType:'',
        endId:'',
        endType:''
      }
    }
  },
  methods:{
    selectassets(){////查询公园资产归类二级下拉列表
      let params = {
        parentId:0
      }
      selectassets(params).then((res)=>{
        console.log(res)
        if(res.data.code==200){
          this.address = res.data.data.filter(item=>{
            return item
          })
        }
      })
    },
    getStartEnd(item){
      console.log(item)
      if(this.starValue){
        this.choisedInfor.startId = item.id
        this.choisedInfor.startType = item.type
        this.starName = item.name
      }else{
        this.choisedInfor.endId = item.id
        this.choisedInfor.endType = item.type
        this.endName = item.name
      }
      
    },
    goBack(){
      sessionStorage.setItem('choisedInfor',JSON.stringify(this.choisedInfor) )
      console.log(sessionStorage.getItem("choisedInfor"))
      this.$router.go(-1);
      
    }
  },
  mounted(){
  this.$nextTick(() => {
    this.$refs.input.focus()
  })
    console.log(JSON.parse(this.$route.query.endInfor))
    // console.log(this.$route.query.endInfor)
    this.choisedInfor.endId = this.endInfor.id
    this.choisedInfor.endType = this.endInfor.type
    this.endName = this.endInfor.name
    this.selectassets()
  }
}
</script>

<style scoped>
.topdiv {
  display: flex;
  flex-direction: row;
}

.changeInfo{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  margin: 50px auto;
  font-size: 30px;
}
.changeInfoName {
  position: relative;
  height: 100px;
  width: 90%;
  margin-bottom: 20px;
  margin-left: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
}

.changeInfoName text {
  width: 100px;
  background-color: white;
  color: gray;
  line-height: 100px;
}

.changeInfoName input {
  background-color: #f7f7f7;
  padding: 0px 20px;
  width: 100%;
  height:100%;
  border-radius: 10px;
}

.changeBtn {
  width: 200px;
  height: 80px;
  margin-right: 20px;
  margin-top: 180px;
  line-height: 80px;
  font-size: 28px;
  background-color: rgb(219, 99, 51);
  color: white;
  border:0px;
  border-radius: 5px;
}

.addressdiv {
  background-color: #f7f7f7;
  padding-top: 20px;
}

.address_item {
  display: flex;
  flex-direction: row;
  background-color: white;
  height: 100px;
  margin-top: 2px;
  padding: 0px 30px;
  align-items: center;
}

.address_imgdiv {
  width: 52px;
  height: 52px;

}

.address_img {
  width: 100%;
  height: 100%;
}

.address_name {
  font-size: 28px;
  color: #222222;
  line-height: 100px;
  /* margin-left: 24px; */
}

</style>