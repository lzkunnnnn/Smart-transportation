<template>
  <div class="centerContainer">
    <div class="containerLeft">
      <check-pie class="chart-line" />
    </div>

    <div class="containerRight">
      <maintenance-pie class="chart-line" />
    </div>
    
  </div>
</template>

<script>
import CheckPie from '@/views/index/components/checkPie';
import MaintenancePie from '@/views/index/components/maintenancePie';

export default {
  name: 'checkMaintenance',
  components: { MaintenancePie, CheckPie }
};
</script>

<style lang="less" scoped>
.centerContainer {
  display: flex;
  width: 480px;
  .containerLeft {
    margin-right: 5px;
    width: 235px;
    .chart-line {
      width: 200px;
      height: 250px;
    }
  }
  .containerRight {
    width: 235px;
    .chart-line {
      width: 200px;
      height: 250px;
    }
  }
}
</style>
