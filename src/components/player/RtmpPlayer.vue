<template>
  <el-card>
    <div id="hls">
      <video id="video" controls muted style="width: 100%;height: auto"></video>
<!--      <video id="video"></video>-->
    </div>
  </el-card>
</template>
<script>
// import Las from '@kwai-video-team/las.js'

export default {
  name: 'hls-video',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    // 初始化video
    initVideo () {
      const video = document.getElementById('video')
      // eslint-disable-next-line no-undef
      if (Hls.isSupported()) {
        // eslint-disable-next-line no-undef
        const hls = new Hls()
        // 该hls地址为nginx配置中的地址
        hls.loadSource('http://localhost:8000/live.m3u8')
        hls.attachMedia(video)
        // eslint-disable-next-line no-undef
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play()
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'http://localhost:8000/live.m3u8'
        video.addEventListener('loadedmetadata', function () {
          video.play()
        })
      }
    }
    // initLasVideo () {
    //   if (Las.isSupported()) {
    //     const video = document.getElementById('video')
    //     const las = new Las()
    //     // 绑定video
    //     las.attachMedia(video)
    //     // 传入manifest object，开始加载视频
    //     // eslint-disable-next-line no-undef
    //     las.load('http://localhost:7002/live/live.m3u8')
    //     video.play()
    //   }
    // }
  },
  created () {
  },
  mounted () {
    this.initVideo()
  },
  computed: {
  },
  watch: {
  }
}
</script>
<style scoped>
</style>
