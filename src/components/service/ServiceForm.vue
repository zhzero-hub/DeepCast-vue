<template>
  <el-row>
    <el-col :span="16" :offset="4">
      <el-card class="box-card">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户Id">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="观看频道">
            <el-select v-model="form.channelId" placeholder="请选择活动区域">
              <el-option v-for="i in 50" :key="i" :label='"频道" + i' :value=i></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="观看时间">
            <el-col :span="8" :offset="3">
              <el-time-picker type="date" placeholder="选择时间" v-model="form.startTime" style="width: 100%;"></el-time-picker>
            </el-col>
            <el-col class="line" :span="2">—</el-col>
            <el-col :span="8">
              <el-time-picker placeholder="选择时间" v-model="form.endTime" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="是否加密">
            <el-switch v-model="form.encrypt"></el-switch>
          </el-form-item>
          <el-form-item label="当前位置">
            {{ this.form.lat }}{{ this.form.dot }}{{ this.form.long }}
            <el-button type="primary" size="small" @click="GetLocationInfo">获取位置</el-button>
          </el-form-item>
          <el-form-item label="请求清晰度">
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
              <el-radio label="优先清晰度"></el-radio>
              <el-radio label="一般"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">创建请求</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ServiceForm',
  data () {
    return {
      form: {
        id: '',
        channelId: '',
        startTime: '',
        endTime: '',
        version: '',
        encrypt: false,
        lat: '',
        long: '',
        dot: '',
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    GetLocationInfo () {
      axios({
        method: 'get',
        url: 'http://localhost:5000/getBackground?type=location'
      })
        .then(resp => {
          if (resp.status === 200) {
            this.form.lat = resp.data.location.lat
            this.form.long = resp.data.location.long
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
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>

</style>
