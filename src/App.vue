<template>
  <div id="app">
      
      <!-- <div>
        <div class="avatar"><img src="./assets/qin.jpg" width="80" alt="Qin"></div>
      </div> -->
      
      <transition :name="transformName">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
      
      <footer class="footer" :class="transformBarName">
        <div class="tabbar">
          <router-link tag="span" to="/"><i class="iconfont icon-shouye"></i>首页</router-link>
          <router-link tag="span" to="/search"><i class="iconfont icon-sousuo"></i>发现</router-link>
          <router-link tag="span" to="/task"><i class="iconfont icon-wodedingdan"></i>任务</router-link>
          <router-link tag="span" to="/user"><i class="iconfont icon-wodejuhuasuan"></i>我的</router-link>
        </div>
      </footer>
      <div id="playBar" :class="transformPlayBarName">
        <audio 
          ref="music" 
          :src="dataUrl" 
          @ended="endedHandle"
          autoplay
        >
        </audio>
        <div class="playBarImg">
          <img :src="avatar()" :class="playing ? 'running' : 'paused'" width="80" alt="Qin">
        </div>
        <div class="playBarText">
          <h3>{{songName}}</h3>
          <p>{{songSinger}}</p>
        </div>
        <div class="playOperation">
          <div>
            <i class="iconfont icon-music-prev" @click="playPrevNext('prev')"></i>
            <i class="iconfont playBtn" :class="playing ? iconPause : iconPlay" @click="hanldePlay"></i>
            <i class="iconfont icon-music-next" @click="playPrevNext('next')"></i>
          </div>
          <span class="iconfont icon-music-list playListIcon"></span>
        </div>
      </div>
  </div>
</template>

<script>
import {Tabbar,TabbarItem} from 'vux';
import Bodys from './components/index/Bodys';
import {mapMutations, mapState, mapGetters} from 'vuex'





export default {
  name: 'App',
  props: ['id'],
  components: {
    Tabbar,
    TabbarItem,
    Bodys,
  },
  methods:{
    hanldePlay(event){
      // 播放、暂停
      event.preventDefault()
      if(this.playList.length){
        this.playing ? this.pause() : this.play()
      }
      /*var d = this.$refs.music.duration;
      var dur = parseInt(d / 60) + ':' + (Array(2).join(0) + (d % 60)).slice(-2);
      console.log(dur)*/
    },
    playPrevNext(has){
      if(this.playList.length){
        let lastItem = this.playList.length-1;
        var index = this.index;
        if(has == 'prev'){
          index = index != 0 ? --index : lastItem;
        }else{
          index = index != lastItem ? ++index : 0;
        }

        this.$store.commit('setCurPlayText',this.playList[index])
        this.$store.commit('setPlayList',{
          list: this.playList,
          index: index,
          mid: this.playList[index].mid
        })
        this.play();
      }
    },
    endedHandle (){
      // 监听歌曲是否播放完毕
      if(this.playList){
        // 获取当前播放的索引
        let index = this.index;
        index = index != this.playList.length-1 ? ++index : 0;

        // 获取当前播放的数据
        let item = this.playList.song 
        ? this.playList.song.itemlist[index] 
        : this.playList[index];

        this.$store.commit('setCurPlayText',item)
        this.$store.commit('setPlayList',{
          list: this.playList,
          index: index,
          mid: item.mid
        })
      }
    },
    ...mapMutations([
      'play', 'pause'
    ])
  },
  watch: {
    '$route' (to, from){
      // this.tabActive=to.path
      if(from.name){
        this.transformName = from.meta.activeNumber > to.meta.activeNumber ? 'slide-right' : 'slide-left';
      }
      this.transformBarName = (to.path == '/search' || to.path == '/user') ? 'leave' : ''
      this.transformPlayBarName = to.path == '/user' ? '' : 'leave'
    },
    playing(val) {
      val
      ? this.$refs.music.play()
      : this.$refs.music.pause();
    }
  },
  mounted(){
    
  },
  computed:{
    ...mapState({
      dataUrl (state){
        return 'https://dl.stream.qqmusic.qq.com/C100' + state.PlayService.mid + '.m4a?fromtag=46'
      },
      index: state => state.PlayService.index,
      playList: state => state.PlayService.playList,
      playing: state => state.PlayService.playing,
      songName: state => state.PlayService.songName,
      songSinger: state => state.PlayService.songSinger,
    })
  },
  data(){
    return {
      avatar: () => require('./assets/qin.jpg'),
      iconPlay:'icon-music-play',
      iconPause:'icon-music-stop',
      transformName:'',
      transformBarName: '',
      transformPlayBarName: ''
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './assets/font/iconfont.css';

html,body{
  margin:0;
  width:100%;
  height:100%;
  overflow:hidden;
  font-size:100%;
  position: relative;
  font-family: "microsoft yahei", "HanHei SC","PingHei","PingFang SC","STHeitiSC-Light","Helvetica Neue","Helvetica","Arial",sans-serif
}
ul,ol{list-style: none;}
.scroll-box-x{
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
}
#app {
  height: 100%;
  
}
img{
  vertical-align:middle;
  width: 100%;
}
.avatar{
  position:absolute;
  top:50%;
  left:50%;
  margin-top:-25px;
  transform:translate(-50%,-50%);
  width:80px;
  height:80px;
  border-radius:50%;
  overflow: hidden;
}

.footer,#playBar{
  position: absolute;
  bottom:0;
  left:0;
  right:0;
  height:50px;
  background: #fff;
  transition:all 0.4s cubic-bezier(.55,0,.1,1);
  -webkit-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);
  box-shadow: 0 3px 14px 2px rgba(0,0,0,.12);
  z-index:3;
}
#playBar{
  height: 55px;
}
.tabbar{
  display:flex;
  display: -webkit-flex;
  display: -ms-flex;
  height:100%;
  span{
    flex:1;
    text-align:center;
    height:100%;
    color:#999;
    font-size:13px;
    align-items:center;
    i{
      font-size:20px;
      display: block;
      width:22px;
      height:22px;
      line-height:22px;
      margin:5px auto 0 auto;
    }
    &.exactActive{
      color:#09BB07;
    }
  }
}

.footer.leave{
  transform: translate3d(0,100%,0)
}
#playBar.leave{
  transform: translate3d(0,120%,0)
}
.playBarImg{
  width: 55px;
  height:55px;
  position: absolute;
  top: -8px;
  left: 5px;
  box-shadow: 0 0 3px 2px #928e8e;
  border-radius: 50%;
  overflow: hidden;
}
.playBarImg img.running{
  animation-play-state:running;
}
.playBarImg img.paused{
  animation-play-state:paused;
}
.playBarImg img{
  animation: rotation 10s linear infinite;
}
@-webkit-keyframes rotation{
  from {-webkit-transform: rotate(0deg);transform: rotate(0deg);
  }
  to {-webkit-transform: rotate(360deg);transform: rotate(360deg);
  }
}
@keyframes rotation{
  from {-webkit-transform: rotate(0deg);transform: rotate(0deg);
  }
  to {-webkit-transform: rotate(360deg);transform: rotate(360deg);
  }
}
.playBarText{
  padding:3px 40% 0 70px;
  h3,p{
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    word-wrap: break-word;
    word-break: break-all;
  }
  p{
    font-size: 13px;
    color: #999;
  }
}
.playOperation{
  position: absolute;
  right: 0;
  bottom:10px;
  width:40%;
  height: 30px;
  > div{
    width: 65%;
    height: 100%;
    position: absolute;
  }
  i{
    font-size: 20px;
    color:#333;
    position: absolute;
    &:active{
      color:#f00;
    }
    &:first-child{
      left: 0;
    }
    &:last-child{
      right: 0;
    }
  }
  .playBtn{
    font-size:24px;
    left: 53%;
    top: -3px;
    transform:translateX(-50%);
    &.icon-music-stop{
      left: 51%;
    }
  }
  .playListIcon{
    position: absolute;
    top: -3px;
    right:6px;
    font-size: 24px;
    color:#333;
  }
}

.fade-enter-active, .fade-leave-active{
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-left-enter{
  -webkit-transform: translate3d(100%,0,0);
  transform: translate3d(100%,0,0)
}
.slide-right-enter{
  -webkit-transform: translate3d(-100%,0,0);
  transform: translate3d(-100%,0,0)
}

.slide-right-leave-active{
  -webkit-transform: translate3d(100%,0,0);
  transform: translate3d(100%,0,0)
}
.slide-left-leave-active{
  -webkit-transform: translate3d(-100%,0,0);
  transform: translate3d(-100%,0,0)
}



</style>
