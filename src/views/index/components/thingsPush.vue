<template>
  <vue-seamless-scroll :data="$store.state.alarmEvents" class="seamless-warp" :class-option="classOption">
    <a-list-item v-for="item in $store.state.alarmEvents">
      <span v-text="item.id"></span>
      <span v-text="item.address"></span>
      <span v-text="item.alarmType"></span>
      <span v-text="item.updateTime"></span>
    </a-list-item>
  </vue-seamless-scroll>
  <!--   <vue-seamless-scroll :data="taskPushList" class="seamless-warp" :class-option="classOption">
    <a-list-item v-for="item in taskPushList">
      <span v-text="item.id"></span>
      <span v-text="item.site"></span>
      <span v-text="item.title"></span>
      <span v-text="item.date"></span>
    </a-list-item>
  </vue-seamless-scroll> -->
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
        t.updateTime = t.updateTime.replace('T', ' ');
      });
    } catch (e) {}

    /*   this.getThingsPush(); */
    /*     this.taskPushList = [
      { id: 1, title: 'ww', date: '123', site: '123' },
      { id: 2, title: 'ww', date: '123', site: '123' },
      { id: 3, title: 'ww', date: '123', site: '123' },
      { id: 4, title: 'ww', date: '123', site: '123' },
      { id: 5, title: 'ww', date: '123', site: '123' }
    ]; */
  },
  methods: {
    /*     getThingsPush() {
      axios.get('thingspush/getThings').then(res => {
        this.taskPushList = res.data.data;
        this.taskPushList.forEach(t => {
          t.date = t.date.replace('T', ' ');
        });
      });
    } */
  },
  computed: {
    classOption() {
      return {
        step: 2, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 42, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 2000 // 单步运动停止的时间(默认值1000ms)
      };
    }
  }
};
</script>

<style>
.seamless-warp {
  height: 200px;
  overflow: hidden;
}
</style>
