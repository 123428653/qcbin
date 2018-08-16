<template>
  <div class="user">
    <div class="headWrap">
      <div class="maskImg">
        <img src="../../assets/qin.jpg">
      </div>
      <div class="headMask"></div>
      <div class="headMain">
        <div class="userPic"><img :src="avatar()"></div>
        <div class="userInfo">
          <h3>Qin</h3>
          <p>Web前端</p>
        </div>
        <div>
          <h4>{{city}} <span style="margin:0 10px;">{{week}}</span><span>{{temperature}}℃</span></h4>
          <div><span>{{low}}</span>~<span>{{high}}</span></div>
        </div>
      </div>
      <a href="javascript:;" class="backBtn" @click="back"><i class="iconfont icon-left backIcon"></i></a>
    </div>
    <div class="list">
      <h2>我的单曲</h2>
      <div class="noList" v-if="playList.length == 0">
        暂无单曲，去搜索添加单曲吧~
      </div>
      <div v-else>
        <ul>
          <li v-for="(item, index) in playList">
            <p @click="play(item,index)">
              <span class="name">{{item.name}}</span> - <span class="singer">{{item.singer}}</span> 
              <span class="opreation">
                <!-- <i class="iconfont icon-play"></i> -->
                <i class="iconfont icon-del" @click.stop="delItem(item)"></i>
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import Mock from 'mockjs';
  import axios from 'axios';
  import {mapMutations, mapState, mapGetters} from 'vuex'

  export default {
    name:'User',
    data(){
      return {
        avatar: () => require('../../assets/qin.jpg'),
        city:'',
        week: '',
        today: '',
        high: '',
        low: '',
        temperature: ''
      }
    },
    computed:{
      ...mapState({
        playList: state => state.PlayService.playList
      })
    },
    watch:{
      playList(){
        window.localStorage.setItem('addPlayList', JSON.stringify(this.playList))
      }
    },
    mounted(){
      this.getMap();
    },
    methods:{
      ...mapMutations([
        'play'
      ]),
      back(){
        this.$router.go(-1)
      },
      play(item,index){
        // console.log(this.playList)
        var addPlayList=JSON.parse(window.localStorage.getItem('addPlayList'));
        this.$store.commit('setPlayList',{
          list:addPlayList,
          index: index,
          mid: item.mid
        });
        
        this.$store.commit('setCurPlayText',item);
      },
      delItem(item) {
        var index=this.playList.indexOf(item);
        this.playList.splice(index,1);
      },
      getMap(){
        var myCity = new BMap.LocalCity();
        
        myCity.get(res => {
          axios.post('https://www.apiopen.top/weatherApi?city='+res.name)
          .then(response => {
            if(response.data.code == 200){
              this.city = response.data.data.city;
              this.temperature = response.data.data.wendu;
              var newArr=response.data.data.forecast.map((el, index) => {
                if(index === 0){
                  this.high = el.high
                  this.low = el.low
                  this.week = el.date.split('日')[1]
                }
              })
            }
          });
        })
        
      }
    }
  };
</script>
<style lang="scss" scoped>
  .user{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:55px;
    transition: transform .4s;
    font-size:14px;
  }
  .backBtn{
    position: absolute;
    left:10px;
    top: 10px;
    i{
      font-size:22px;
      color:#fff;
      font-weight:bold;
    }
  }
  .headWrap{
    color:#e4e1e1;
    height: 160px;
    position:relative;
    background:rgba(0,0,0,.65);
    .maskImg{
      position: absolute;
      top:0;
      height:100%;
      overflow: hidden;
      img{
        height:100%;
        width:100%;
        filter: blur(40px);
      }
    }
    .headMask{
      background:rgba(0,0,0,.65);
      position: absolute;
      height:100%;
      width:100%;
    }
    .headMain{
      display:flex;
      align-items:center;
      height:100%;
      position: relative;
    }
    .userPic{
      width: 75px;
      // height: 75px;
      overflow: hidden;
      margin:0 10px 0 20px;
      border-radius: 50%;
    }
    .userInfo{
      margin-right:20px;
    }
  }
  .list{
    padding:0 15px;
    position: absolute;
    top:160px;
    bottom: 0;
    left: 0;
    right:0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    h2{
      margin:10px 0 5px 0;
    }
    li{
      margin-bottom:5px;
      p{
        padding: 10px 0;
        line-height:20px;
        font-size:14px;
        position: relative;
        &:after{
          content:'';
          width:100%;
          height:1px;
          background-color:#ddd;
          transform:scaleY(0.5);
          position: absolute;
          left:0;
          bottom:-1px;
        }
        &:active{
          background-color:#ececec;
        }
      }
      .singer{color:#929292;}
      .opreation{
        position: absolute;
        right:0;
        i{
          color:#999;
          font-size:20px;
          margin-right:10px;
          &:last-child{margin-right:0;}
        }
      }
    }
  }
  .noList{
    position: absolute;
    top: 50%;
    transform:translateY(-50%);
    font-size: 18px;
    left: 0;
    right: 0;
    text-align:center;
  }
</style>