<template>
  <el-table
    :data="systemData"
    border
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="设备Id"
      width="120%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="name"
      label="设备名称"
      width="150%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="cpu_core"
      label="CPU核数"
      width="150%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="inbound"
      label="入带宽 (使用 / 上限 / 占比) (Mbps)"
      width="300%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="outbound"
      label="出带宽 (使用 / 上限 / 占比) (Mbps)"
      width="300%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="computation_usage"
      label="CPU占用"
      width="150%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="latency_to_upper"
      label="到cdn时延(s)"
      width="300%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="loc"
      label="地理位置 (经度, 纬度)"
      align="center">
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'SystemInfo',
  data () {
    return {
      systemData: []
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
    GetSystemDevices () {
      axios.get('http://localhost:5000/getSystemDevices')
        .then(resp => {
          console.log(resp)
          this.systemData = []
          if (resp.status === 200) {
            for (const name in resp.data) {
              const device = resp.data[name]
              // console.log(device)
              device.inbound = (device.bandwidth_info.inbound_bandwidth_usage / 1048576).toFixed(4) + ' / ' + device.bandwidth_info.inbound_bandwidth_limit / 1048576 +
                ' / ' + (device.bandwidth_info.inbound_bandwidth_usage / device.bandwidth_info.inbound_bandwidth_limit * 100).toFixed(2) + '%'
              device.outbound = (device.bandwidth_info.outbound_bandwidth_usage / 1048576).toFixed(4) + ' / ' + device.bandwidth_info.outbound_bandwidth_limit / 1048576 +
                ' / ' + (device.bandwidth_info.outbound_bandwidth_usage / device.bandwidth_info.outbound_bandwidth_limit * 100).toFixed(2) + '%'
              device.loc = '( ' + device.location.latitude + ', ' + device.location.longitude + ' )'
              device.computation_usage = (device.computation_usage / device.cpu_core).toFixed(2) + '%'
              this.systemData.push(device)
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
      return this.systemData
    },
    timer () {
      if (this.trainStatus) {
        this.GetSystemDevices()
      }
    }
  },
  mounted () {
    this.GetSystemDevices()
    this.$nextTick(() => {
      setInterval(this.timer, 1000)
    })
  }
}
</script>

<style scoped>

</style>
