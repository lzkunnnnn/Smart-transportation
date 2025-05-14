<template>
  <div class="main-board">
    <a-button type="primary" @click="close()" class="close">关闭</a-button>
    <a-row class="board-title"><b>事件信息展示板</b></a-row>
    <div class="grid-container">
      <div class="grid-item a">
        <a-row class="board-item"><b>事件编号ID:</b> {{ eventBoardInfo.id }}</a-row>
        <a-row class="board-item"> <b>事件类型:</b> {{ typeTransfor(eventBoardInfo.type) }}</a-row>
        <a-row class="board-item"> <b>处理状态:</b> {{ stateTransfor(eventBoardInfo.state) }}</a-row>
        <a-row class="board-item"> <b>位置</b> {{ eventBoardInfo.address }}</a-row>
      </div>
      <div class="grid-item b">
        <a-row class="board-item">
          <b>发生时间:</b> {{ eventBoardInfo.createTime.replace('T', ' ').replace(/-/g, '/') }}</a-row
        >
        <a-row class="board-item"> <b>事件来源: </b> {{ eventBoardInfo.source }}</a-row>
        <a-row class="board-item"> <b>上报人: </b> {{ eventBoardInfo.reportPerson }}</a-row>
        <a-row class="board-item"> <b>处理人: </b> {{ eventBoardInfo.handlePerson }}</a-row>
      </div>
      <div class="grid-item c"></div>
      <div class="grid-item d"></div>
      <div class="grid-item e">
        <a-row class="event-top"><b>事件内容:</b> </a-row>
        <a-row class="text event-bottom"> {{ eventBoardInfo.content }} </a-row>
      </div>
    </div>
  <div style="display: grid; justify-content: center;"> 
    <a-button type="primary" @click="goToMonitor()" class="close">查看监控</a-button>
  </div>
  </div>
</template>

<script>
import { typeTransfor, stateTransfor } from '@/api/transfor';
export default {
  name: 'eventBoard',
  props: ['eventBoardInfo'],
  data() {
    return {};
  },
  methods: {
    typeTransfor,
    stateTransfor,
    close() {
      this.$emit('close');
    },

    goToMonitor() {
      this.$router.push('/accident-detection');
    }

  }
};
</script>

<style lang="scss" scoped>
.main-board {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .close {
    margin-left: auto;
  }
  .board-title {
    text-align: center;
    font-size: 22px;
    margin-bottom: 20px;
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-areas: 'a b   ' 'a b  ' 'e e  ';
    width: 100%;
    height: 100%;
    .board-item {
      font-size: 15px;
      margin-bottom: 5px;
      width: 100%;
      b {
        display: inline-block;
        font-size: 18px;
        width: 30%;
      }
    }
    .event-top {
      font-size: 20px;
    }
    .event-bottom {
      font-size: 16px;
      height: 80%;
    }
    .text {
      padding: 20px;
      overflow-y: scroll;
      width: 100%;
    }
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
    .e {
      grid-area: e;
    }
  }
}
</style>
