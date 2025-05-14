<template>
  <div class="main-board">
    <a-row class="board-title">事件信息展示板</a-row>
    <a-row class="board-item">事件编号ID: {{ eventBoardInfo.id }}</a-row>
    <a-row class="board-item"> 事件类型: {{ eventBoardInfo.type }}</a-row>

    <a-row class="board-item"> 位置: {{ eventBoardInfo.address }}</a-row>
    <a-row class="board-item"> 发生时间: {{ eventBoardInfo.createTime }}</a-row>
    <a-row class="board-item"> 处理情况: {{ stateTransfor(eventBoardInfo.state) }}</a-row>
    <a-row class="board-item"> 事件内容:<br> {{ eventBoardInfo.content }}</a-row>
  </div>
</template>

<script>
import { stateTransfor } from '@/api/transfor';
export default {
  name: 'eventBoard',
  props: ['eventBoardInfo'],
  data() {
    return {};
  },
  methods: {
    stateTransfor
  }
};
</script>

<style lang="scss" scoped>
.main-board {
  width: 100%;
  height: 100%;
  .board-title {
    text-align: center;
    font-size: 22px;
    margin-bottom: 20px;
  }
  .board-item {
    font-size: 15px;
    margin-bottom: 30px;
  }
}
</style>
