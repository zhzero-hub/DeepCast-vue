<template>
  <div>
    <el-result icon="info" :title='"当前时间: " + this.t.toString()' :subTitle='"总时间: " + this.maxT.toString()'>
      <template slot="extra">
        <el-button @click="this.StartTrain" type="primary">开始训练</el-button>
        <el-button @click="this.SuspendTrain" type="primary">暂停训练</el-button>
      </template>
    </el-result>
    <div style="padding-top: 3%">
      <el-divider>
        <div style="font-size: 200%; padding-bottom: 10%">
          系统设备状态
        </div>
      </el-divider>
    </div>
    <SystemInfo></SystemInfo>
    <div style="padding: 1%">
      <el-divider>
        <div style="font-size: 200%; padding-bottom: 10%">
          系统运行进程
        </div>
      </el-divider>
    </div>
    <TaskManager></TaskManager>
  </div>
</template>

<script>
import axios from 'axios'
import TaskManager from '@/components/system/TaskManager'
import SystemInfo from '@/components/system/SystemInfo'
import { mapState } from 'vuex'

export default {
  name: 'SystemController',
  data () {
    return {
      t: -1,
      maxT: 0
    }
  },
  components: {
    TaskManager,
    SystemInfo
  },
  computed: {
    ...mapState(['trainStatus']),
    trainStatus: {
      get () {
        return this.$store.state.trainStatus
      },
      set (_status) {
        this.$store.state.trainStatus = _status
      }
    }
  },
  methods: {
    SendTrainStatus (status) {
      axios({
        method: 'post',
        url: 'http://localhost:5000/setTrainStatus',
        data: {
          status: status
        }
      })
        .then(resp => {
          if (resp.status === 200) {
            let msg = '训练'
            if (status) {
              msg += '开始'
            } else {
              msg += '暂停 / 结束'
            }
            this.$notify.success({
              title: '请求成功',
              message: msg
            })
          } else {
            this.$notify.error({
              title: '请求失败',
              message: '发送后端请求失败'
            })
          }
        })
        .catch(err => {
          this.$notify.error({
            title: '请求失败',
            message: err.toString()
          })
        })
    },
    StartTrain () {
      this.trainStatus = true
      this.SendTrainStatus(true)
    },
    SuspendTrain () {
      this.trainStatus = false
      this.SendTrainStatus(false)
    },
    GetCurrentTime () {
      axios({
        method: 'get',
        url: 'http://localhost:5000/getBackground'
      })
        .then(resp => {
          if (resp.status === 200) {
            this.t = resp.data.time
            this.maxT = resp.data.maxTime
          } else {
            this.$notify.error({
              title: '请求失败',
              message: '发送后端请求失败'
            })
          }
        })
        .catch(err => {
          this.$notify.error({
            title: '请求失败',
            message: err.toString()
          })
        })
    }
  },
  mounted () {
    this.GetCurrentTime()
  }
}
</script>

<style scoped>
.cardInside {
  font-weight: bold;
  padding-bottom: 3%;
}

</style>
