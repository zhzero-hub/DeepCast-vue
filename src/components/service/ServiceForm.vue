<template>
  <div>
    <el-row>
      <el-col :span="16" :offset="4">
        <el-card class="box-card">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户Id">
              <el-input v-model="form.userId"></el-input>
            </el-form-item>
            <el-form-item label="观看频道">
              <el-select v-model="form.channelId" placeholder="请选择收看频道">
                <el-option v-for="i in 50" :key="i" :label='"频道" + i' :value=i></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="观看时间">
              <el-col :span="8" :offset="3">
                <el-time-picker type="date" placeholder="选择时间" v-model="form.startTime" value-format="timestamp" style="width: 100%;"></el-time-picker>
              </el-col>
              <el-col class="line" :span="2">—</el-col>
              <el-col :span="8">
                <el-time-picker placeholder="选择时间" v-model="form.endTime" value-format="timestamp" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="是否加密">
              <el-switch v-model="form.encrypt"></el-switch>
            </el-form-item>
            <el-form-item label="当前位置">
              <el-row>
                <el-col :span="2" :offset="11">
                  <i class="el-icon-location" v-if="this.form.showLocation">
                    {{ this.form.lat }}{{ this.form.dot }}{{ this.form.long }}
                  </i>
                </el-col>
                <el-col :span="1" :offset='this.form.showLocation? 1: 11'>
                  <el-button type="primary" size="small" @click="GetLocationInfo">获取位置</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="清晰度">
              <el-radio-group v-model="form.version">
                <el-radio label="240p"></el-radio>
                <el-radio label="360p"></el-radio>
                <el-radio label="480p"></el-radio>
                <el-radio label="720p"></el-radio>
                <el-radio label="1080p"></el-radio>
                <el-radio label="1440p"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="优先级">
              <el-radio-group v-model="form.resource">
                <el-radio label="优先延时"></el-radio>
                <el-radio label="优先流畅"></el-radio>
                <el-radio label="优先清晰度"></el-radio>
                <el-radio label="一般"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="CreateService">创建请求</el-button>
              <el-button @click="CleanForm">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-result icon="success" title="请求成功" subTitle="最终分配请求到:" v-if="device_id !== ''">
      <template slot="extra">
        <h1 v-if="device_id < 10">Edge{{ this.device_id }}</h1>
        <h1 v-else>Cdn{{ this.device_id }}</h1>
      </template>
    </el-result>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-descriptions class="margin-top" title="附: 分配到各个设备的概率" :column="6" :size="size" border v-if="device_id !== ''">
          <el-descriptions-item v-for="(v, i) in this.possibilities" :key="i">
            <template slot="label">
              <i class="el-icon-location"></i>
              设备{{ i }}
            </template>
            {{ v.toFixed(6) }}
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
<!--    <el-row v-if="this.device_id !== ''">-->
<!--      <el-col :offset="1" :span="1"></el-col>-->
<!--      <el-col v-for="(v, i) in this.possibilities" :span="2" :key="i">-->
<!--        分配到设备{{ i }}的概率: {{ v.toFixed(6) }}-->
<!--      </el-col>-->
<!--    </el-row>-->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ServiceForm',
  data () {
    return {
      form: {
        userId: '',
        channelId: '',
        startTime: '',
        endTime: '',
        version: '',
        encrypt: false,
        lat: '',
        long: '',
        dot: '',
        showLocation: false,
        resource: '',
        desc: ''
      },
      possibilities: [],
      device_id: '',
      size: ''
    }
  },
  methods: {
    CleanForm () {
      this.form.userId = ''
      this.form.channelId = ''
      this.form.startTime = ''
      this.form.endTime = ''
      this.form.version = ''
      this.form.encrypt = ''
      this.form.showLocation = false
      this.form.resource = ''
      this.form.desc = ''
      this.device_id = ''
      this.possibilities = []
    },
    GetLocationInfo () {
      axios({
        method: 'get',
        url: 'http://localhost:5000/getBackground?type=location'
      })
        .then(resp => {
          if (resp.status === 200) {
            this.form.lat = resp.data.location.lat.toFixed(2)
            this.form.long = resp.data.location.long.toFixed(2)
            this.form.dot = ', '
            this.form.showLocation = true
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
    CreateService () {
      axios({
        method: 'post',
        url: 'http://localhost:5000/service',
        data: {
          form: this.form
        }
      })
        .then(resp => {
          if (resp.status === 200) {
            console.log(resp.data)
            this.device_id = resp.data.device_id
            this.possibilities = resp.data.result
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
      console.log(this.form)
    }
  }
}
</script>

<style scoped>

</style>
