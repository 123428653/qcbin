<template>
  <div class="search">
    <div class="searchHead">
      <a href="javascript:;" @click="back"><i class="iconfont icon-left backIcon"></i></a>
      <div href="javascript:;" class="searchInput">
        <input type="text" v-model="key" placeholder="搜索歌曲" ref="searchInput" @keydown.enter="send(key)">
      </div>
      <a href="javascript:;" @click="send(key)"><i class="iconfont icon-sousuo searchBtn"></i></a>
    </div>
    <div class="searchBody">
      <div class="til">热门搜索</div>
      <div class="banner"><img :src="bannerSrc"></div>
      <div class="tags">
        <a href="javascript:;" v-for="keyword in keywords">{{keyword}}</a>
      </div>
      <div class="songList" v-if="searchRes">
        <div class="siongTil">单曲</div>
        <ul>
          <li v-for="(item, index) in searchRes.song.itemlist">
            <p>
              <span class="name">{{item.name}}</span> - <span class="singer">{{item.singer}}</span> 
              <i class="iconfont icon-play" @click="play(item)"></i>
              <i class="iconfont icon-add addLsit" @click="addPlayHandle(item)"></i>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import Mock from 'mockjs';
  import { mapState , mapMutations} from 'vuex';
  const Keywords = [];

  for (let i = 0; i < 8; i++) {
    Keywords.push(Mock.mock('@cword(2, 6)'));
  }

  export default {
    name: 'Search',
    data(){
      return {
        key:'',
        total:0,
        addPlayList:JSON.parse(window.localStorage.getItem('addPlayList')) || [],
        searchRes:null,
        bannerSrc: Mock.Random.image('1080x300', Mock.mock('@color'), 'Banner'),
        keywords: Keywords
      }
    },
    mounted(){
      // console.log(JSON.parse(window.localStorage.getItem('addPlayList')))
    },
    computed:{
      ...mapState({
        playing: state => state.PlayService.playing
      })
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      play(item){
        this.$store.commit('setPlayList',{
          list: this.addPlayList,
          index: 0,
          mid: item.mid
        })

        this.$store.commit('setCurPlayText',item)
        
      },
      addPlayHandle(item){
        let hasItem=this.addPlayList.some(function(listItem){
          return listItem.id == item.id
        });

        if(!hasItem){
          this.addPlayList.push(item);
          window.localStorage.setItem('addPlayList', JSON.stringify(this.addPlayList))
          this.$store.commit('setPlayList',{
            list: this.addPlayList,
            index: 0,
            mid: null
          })
          alert('添加成功');
        }else{
          alert('列表中已有该歌曲');
        }
      },
      send(key){
        var api = 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg';
        this.$http.jsonp(
          api,
          {
            params: {
              is_xml: 0,
              format: 'jsonp',
              key: key,
              g_tk: 5381,
              loginUin: 0,
              hostUin: 0,
              inCharset: 'utf8',
              outCharset: 'utf-8',
              notice: 0,
              platform: 'yqq',
              needNewCode: 0
            },
            jsonp: 'jsonpCallback'
          }
        ).then(json => {
          this.searchRes = json.data.data;
          this.total = json.data.data.song.itemlist.length;
          this.$refs.searchInput.blur();
        }).catch(err => {
          console.log(err)
        })
      }
    }
  };
</script>
<style lang="scss">
  @import '../../assets/scss/base';
  @mixin flex-box() {
    display:-webkit-box;
    display:-ms-box;
    display:-webkit-flex;
    display:flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .search{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom: 0;
    transition: transform .4s;
    .backIcon{
      font-size:22px;
    }
    .searchBtn{
      font-size:19px;
    }
  }
  .searchHead {
    @include flex-box();
    position:fixed;
    top:0;
    left:0;
    right:0;
    height:50px;
    background-color: #f2f2f2;
    a {
      display:block;
      padding:0 10px;
    }
    .searchInput{
      width:100%;
      margin:0;
      padding:0 10px;
      border:1px solid #e5e5e5;
      border-radius:2px;
      background-color:#fff;
      input{
        border:none;
        width:100%;
        padding:5px 0;
      }
    }
  }
  .searchBody{
    overflow-y:auto;
    position: absolute;
    top:50px;
    bottom:0;
    .til{
      padding:5px 0 5px 10px;
      font-size:14px;
    }
    .banner{margin-bottom:10px;}
    .tags{
      margin:0 10px;
      a{
        display:inline-block;
        background: hsla(12,99%,71%,.05);
        padding:5px 8px;
        margin:5px 2px;
        border:1px solid #ddd;
        font-size:12px;
        line-height:1;
      }
    }
  }
  .songList{
    .siongTil{font-size:18px;font-weight:bold;}
    padding:0 15px;
    margin-top:20px;
    li{
      margin-bottom:5px;
      border-bottom: 1px solid #eee;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      p{
        line-height:20px;
        padding:10px 0;
        font-size:14px;
        position: relative;
      }
      .singer{
        color:#929292;
      }
      .addLsit{
        font-weight: bold;
        font-size:22px;
        right:0;
      }
      i{
        font-size:20px;
        color:#929292;
        position: absolute;
        right:30px;
      }
    }
  }
</style>