<template>
  <div>
    <div class="grid-container header">
      <span class="b">位置</span>
      <span class="c">状态</span>
      <span class="d">标题</span>
    </div>
    <vue-seamless-scroll :data="$store.state.alarmEvents" class="seamless-warp" :class-option="classOption">
      <div class="grid-container" v-for="item in $store.state.alarmEvents" :key="item.id">
        <span class="b">{{ item.address }}</span>
        <span class="c">{{ item.alarmType }}</span>
        <span class="d">{{ item.title }}</span>
      </div>
    </vue-seamless-scroll>
  </div>
</template>

<script>
/* import axios from '@/store/axios.js'; */
import vueSeamlessScroll from 'vue-seamless-scroll';

export default {
  name: 'thingsPush',
  components: {
    vueSeamlessScroll
  },
  data() {
    return {
      taskPushList: {}
    };
  },
  async mounted() {
    try {
      await this.$store.dispatch('asyncGetAlarmEvents');
      this.taskPushList = this.$store.state.alarmEvents;
      this.taskPushList.forEach(t => {
        t.updateTime = t.updateTime.replace('T', ' ').replace(/-/g, '/');
      });
    } catch (e) {
      console.log('error');
    }
  },
  computed: {
    classOption() {
      return {
        step: 2, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 40, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 3000 // 单步运动停止的时间(默认值1000ms)
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  background-color: #182030;
  border-bottom: 2px solid #222d44;
}
.seamless-warp {
  height: 600px;
  overflow: hidden;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(10, 10%);
  grid-template-areas: 'b b b b c c c d d d';
  border-bottom: 2px solid #111825;
  width: 100%;
  height: 40px;
  .a {
    grid-area: a;
  }
  .b {
    grid-area: b;
  }
  .c {
    grid-area: c;
  }
  .d {
    grid-area: d;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.grid-container:not(.header):hover {
  background-color: #3b4d75;
}
</style>
