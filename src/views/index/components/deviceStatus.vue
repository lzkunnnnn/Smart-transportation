<template>
  <div class="centerContainer">
    <a-row type="flex" justify="space-around" align="middle" class="rowBox">
      <a-col :span="10" class="gutter-box">
        <a-space :size="8" align="center">
          <svg-icon icon="waterSystem" :size="50" />

          <div class="textBox">
            <a-statistic
              :value="$store.state.deviceState.waterNum - $store.state.deviceState.waterNumAbnormal"
              :value-style="{ color: ' #42d756' }"
            >
              <template #suffix>
                <span style="color: #f69a3d"> / {{ $store.state.deviceState.waterNum }}</span>
              </template>
            </a-statistic>
            <p>水系统</p>
          </div>
        </a-space>
      </a-col>
      <a-col :span="10" class="gutter-box">
        <a-space :size="8" align="center">
          <svg-icon icon="smokeSystem" :size="50" />
          <div class="textBox">
            <a-statistic
              :value="$store.state.deviceState.smogNum - $store.state.deviceState.smogNumAbnormal"
              :value-style="{ color: '#42d756' }"
            >
              <template #suffix>
                <span style="color: #f69a3d"> / {{ $store.state.deviceState.smogNum }}</span>
              </template>
            </a-statistic>
            <p>烟雾</p>
          </div>
        </a-space>
      </a-col>
    </a-row>

    <a-row type="flex" justify="space-around" align="middle" class="rowBox">
      <a-col :span="10" class="gutter-box">
        <a-space :size="8" align="center">
          <svg-icon icon="electronicSystem" :size="50" />
          <div class="textBox">
            <a-statistic
              :value="$store.state.deviceState.elecNum - $store.state.deviceState.elecNumAbnormal"
              :value-style="{ color: '#42d756' }"
            >
              <template #suffix>
                <span style="color: #f69a3d"> / {{ $store.state.deviceState.elecNum }}</span>
              </template>
            </a-statistic>
            <p>电气火灾</p>
          </div>
        </a-space>
      </a-col>
      <a-col :span="10" class="gutter-box">
        <a-space :size="8" align="center">
          <svg-icon icon="gasSystem" :size="50" />
          <div class="textBox">
            <a-statistic
              :value="$store.state.deviceState.gasNum - $store.state.deviceState.gasNumAbnormal"
              :value-style="{ color: '#42d756' }"
            >
              <template #suffix>
                <span style="color: #f69a3d"> / {{ $store.state.deviceState.gasNum }}</span>
              </template>
            </a-statistic>
            <p>可燃气体</p>
          </div>
        </a-space>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-around" align="middle" class="rowBox">
      <a-col :span="10" class="gutter-box">
        <a-space :size="8" align="center">
          <svg-icon icon="electronicSystem" :size="50" />
          <div class="textBox">
            <a-statistic
              :value="$store.state.deviceState.elecNum - $store.state.deviceState.elecNumAbnormal"
              :value-style="{ color: '#42d756' }"
            >
              <template #suffix>
                <span style="color: #f69a3d"> / {{ $store.state.deviceState.elecNum }}</span>
              </template>
            </a-statistic>
            <p>设备5</p>
          </div>
        </a-space>
      </a-col>
      <a-col :span="10" class="gutter-box">
        <a-space :size="8" align="center">
          <svg-icon icon="gasSystem" :size="50" />
          <div class="textBox">
            <a-statistic
              :value="$store.state.deviceState.gasNum - $store.state.deviceState.gasNumAbnormal"
              :value-style="{ color: '#42d756' }"
            >
              <template #suffix>
                <span style="color: #f69a3d"> / {{ $store.state.deviceState.gasNum }}</span>
              </template>
            </a-statistic>
            <p>设备6</p>
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
