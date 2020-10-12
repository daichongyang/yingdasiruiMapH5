<template>
  <section>
aaaa
<button @click="goIndex">去首页</button>
  </section>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{

    goIndex(){
        let aa= {
            Authorization:'ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKMWFXUWlPaUpwYm5SbGJHeHRZVzVoWjJWeWRXbGtJaXdpYzNWaUlqb2llMXdpZFhObGNrbGtYQ0k2WENJeE1qWmNJbjBpTENKMWMyVnlYMjVoYldVaU9pSnBiblJsYkd4dFlXNWhaMlZ5ZFhObGNtNWhiV1VpTENKdWFXTnJYMjVoYldVaU9pSllMV2x1ZEdWc2JHMWhibUZuWlhJaUxDSnBjM01pT2lKcGJuUmxiR3h0WVc1aFoyVnlJaXdpWlhod0lqb3hOakF5TWpNMk5ESXhMQ0pwWVhRaU9qRTJNREl5TWpreU1qRXNJbXAwYVNJNklqazROamszWWpObUxXVm1ZVGd0TkdRNE1pMWlZVEptTFRZeU9HTTBOMkV4WWpkbE5TSjkuNVhqTGE3b1dwUWYzWDRzeEVYVTVHNGdZTi1fNHp4enhVd3JOMEo5T01Vdw=='
          }
        
      this.$router.push({
        path:'/',
        query:{
          // point:"dasdhaks112s",
          info:JSON.stringify(aa)
        }
      })
    }
  },
  mounted(){

    console.log(11)
    // window.location.href="https://mp.weixin.qq.com/s/i80QBtFrQBcIukEyq3C_lg"
  }
}
</script>

<style>

</style>