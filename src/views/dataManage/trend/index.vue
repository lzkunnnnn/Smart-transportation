<template>
  <div class="table-wrapper">{{list}}</div>
</template>

<script>
import sensorData from '@/api/data/multiData';
export default {
  data() {
    return{
      list: []
    }
  },
  created() {
    this.getAllData()
  },
  methods: {
    // 获取所有数据
    getAllData() {
      sensorData.getPhmList().then(res => {
        this.list = res.data.items
      })
    }
  }
}
</script>
