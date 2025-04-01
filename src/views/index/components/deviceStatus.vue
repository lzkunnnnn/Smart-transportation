<template>
  <div class="centerContainer">
    <a-row type="flex" justify="space-around" align="middle" class="rowBox">
      <a-col :span="10" class="gutter-box">
        <a-space :size="8" align="center">
          <svg-icon icon="monitor" :size="50" />

          <div class="textBox">
            <a-statistic
              :value="$store.state.deviceState.checkNum - $store.state.deviceState.checkNumAbnormal"
              :value-style="{ color: ' #42d756' }"
            >
              <template #suffix>
                <span style="color: #f69a3d"> / {{ $store.state.deviceState.checkNum }}</span>
              </template>
            </a-statistic>
            <p>卡口摄像</p>
          </div>
        </a-space>
      </a-col>
      <a-col :span="10" class="gutter-box">
        <a-space :size="8" align="center">
          <svg-icon icon="visit" :size="50" />
          <div class="textBox">
            <a-statistic
              :value="$store.state.deviceState.parkNum - $store.state.deviceState.parkNumAbnormal"
              :value-style="{ color: '#42d756' }"
            >
              <template #suffix>
                <span style="color: #f69a3d"> / {{ $store.state.deviceState.parkNum }}</span>
              </template>
            </a-statistic>
            <p>违停抓拍</p>
          </div>
        </a-space>
      </a-col>
    </a-row>

    <a-row type="flex" justify="space-around" align="middle" class="rowBox">
      <a-col :span="10" class="gutter-box">
        <a-space :size="8" align="center">

          <svg-icon icon="car-front" :size="50" />

          <div class="textBox">
            <a-statistic
              :value="$store.state.deviceState.flowNum - $store.state.deviceState.flowNumAbnormal"
              :value-style="{ color: '#42d756' }"
            >
              <template #suffix>
                <span style="color: #f69a3d"> / {{ $store.state.deviceState.flowNum }}</span>
              </template>
            </a-statistic>
            <p>流量监测</p>
          </div>
        </a-space>
      </a-col>
      <a-col :span="10" class="gutter-box">
        <a-space :size="8" align="center">
          <svg-icon icon="dashboard" :size="50" />
          <div class="textBox">
            <a-statistic
              :value="$store.state.deviceState.speedNum - $store.state.deviceState.speedNumAbnormal"
              :value-style="{ color: '#42d756' }"
            >
              <template #suffix>
                <span style="color: #f69a3d"> / {{ $store.state.deviceState.speedNum }}</span>
              </template>
            </a-statistic>
            <p>区间测速</p>
          </div>
        </a-space>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-around" align="middle" class="rowBox">
      <a-col :span="10" class="gutter-box">
        <a-space :size="8" align="center">
          <svg-icon icon="columns" :size="50" />
          <div class="textBox">
            <a-statistic
              :value="$store.state.deviceState.laneNum - $store.state.deviceState.laneNumAbnormal"
              :value-style="{ color: '#42d756' }"
            >
              <template #suffix>
                <span style="color: #f69a3d"> / {{ $store.state.deviceState.laneNum }}</span>
              </template>
            </a-statistic>
            <p>车道监测</p>
          </div>
        </a-space>
      </a-col>
      <a-col :span="10" class="gutter-box">
        <a-space :size="8" align="center">

          <svg-icon icon="sun-fill" :size="50" />

          <div class="textBox">
            <a-statistic
              :value="$store.state.deviceState.environmentNum - $store.state.deviceState.environmentNumAbnormal"
              :value-style="{ color: '#42d756' }"
            >
              <template #suffix>
                <span style="color: #f69a3d"> / {{ $store.state.deviceState.environmentNum }}</span>
              </template>
            </a-statistic>
            <p>环境监测</p>
          </div>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'deviceStatus',
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch('asyncGetDeviceState');
  }
};
</script>
<style lang="scss" scoped>
.centerContainer {
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  .rowBox {
    margin: 8px 3px;
    //border: 1px solid #40a9ff;
    padding: 4px;
    flex: none;
    .gutter-box {
      padding: 5px 0;
      .textBox {
        width: 100%;
        display: inline-block;
        padding-top: 1px;
        padding-left: 10px;
        .textStyle {
          color: #1afa29;
        }
      }
      .minBox {
        height: 75px;
        width: 100%;
      }
    }
  }
}

.gutter-example > .ant-row > div {
  background: transparent;
  border: 0;
}
</style>
