<template>
  <vue-seamless-scroll :data="taskPushList" class="seamless-warp">
    <a-list-item v-for="item in taskPushList">
      <span v-text="item.id"></span>
      <span v-text="item.site"></span>
      <span v-text="item.title"></span>
      <span v-text="item.date"></span>
    </a-list-item>
  </vue-seamless-scroll>


  <!--  <a-table :dataSource="listData">-->
  <!--      <a-table-column prop="id" title="状态"/>-->
  <!--      <a-table-column prop="title" title="事件"/>-->
  <!--      <a-table-column prop="date" title="日期"/>-->
  <!--  </a-table>-->
  <!--  <vue-seamless-scroll :data="listData" class="seamless-warp">-->
  <!--    <ul class="item">-->
  <!--      <li v-for="item in listData">-->
  <!--        <span class="title" v-text="item.id"></span>-->
  <!--        <span class="title" v-text="item.title"></span>-->
  <!--        <span class="date" v-text="item.date"></span>-->
  <!--      </li>-->
  <!--    </ul>-->
  <!--  </vue-seamless-scroll>-->
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";

export default {
  name: "thingsPush",
  components: {
    vueSeamlessScroll
  },
  props:['taskPushList'],
  data() {
    return {


    };
  },
  computed: {
    classOption() {
      return {
        step: 0.4, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 43, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
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
