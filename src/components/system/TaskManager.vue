<template>
  <div>
    <div style="font-weight: bold; font-size: 90%; padding-bottom: 1%">
      待决策 / 已分配
    </div>
    <el-row>
      <el-col :span="11">
        <el-card class="box-card" v-if="this.userInfoData.length !== 0">
          <div v-for="(item, index) in this.userInfoData" :key="index" style="padding-bottom: 2%">
            <el-descriptions class="margin-top" title="待决策" :column="2" :size="size" border>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  用户Id
                </template>
                {{ item.user_id }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-mobile-phone"></i>
                  频道Id
                </template>
                {{ item.channel_id }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-location-outline"></i>
                  所在地经纬度
                </template>
                ( {{ item.location.latitude }}, {{ item.location.longitude }} )
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  请求清晰度
                </template>
                <el-tag size="small">{{ item.version }}</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
      </el-col>
      <el-col :span="11" :offset="2">
        <el-card class="box-card" v-if="this.solvedInfoData.length !== 0">
          <div v-for="(item, index) in this.solvedInfoData" :key="index" style="padding-bottom: 2%">
            <el-descriptions class="margin-top" title="已分配" :column="3" :size="size" border>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  用户Id
                </template>
                {{ item.user_info.user_id }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-mobile-phone"></i>
                  频道Id
                </template>
                {{ item.user_info.channel_id }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-location-outline"></i>
                  所在地经纬度
                </template>
                ( {{ item.user_info.location.latitude }}, {{ item.user_info.location.longitude }} )
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  请求清晰度
                </template>
                <el-tag size="small">{{ item.user_info.version }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-office-building"></i>
                  分配设备
                </template>
                {{ item.device_name }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'TaskManager',
  data () {
    return {
      size: '',
      userInfoData: [],
      solvedInfoData: []
    }
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
    GetTaskManager () {
      axios.get('http://localhost:5000/getTaskManager')
        .then(resp => {
          if (resp.status === 200) {
            console.log(resp)
            this.userInfoData = []
            this.solvedInfoData = []
            for (const id in resp.data.user_info) {
              const user = resp.data.user_info[id]
              this.userInfoData.push(user)
            }
            for (const id in resp.data.solved) {
              const solve = resp.data.solved[id]
              this.solvedInfoData.push(solve)
            }
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
    timer () {
      if (this.trainStatus) {
        this.GetTaskManager()
      }
    }
  },
  mounted () {
    this.GetTaskManager()
    this.$nextTick(() => {
      setInterval(this.timer, 1000)
    })
  }
}
</script>

<style scoped>

</style>
