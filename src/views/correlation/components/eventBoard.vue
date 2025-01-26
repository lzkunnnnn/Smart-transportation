<template>
  <div class="main-board">
    <a-row class="board-title">事件信息展示板</a-row>
    <a-row class="board-item">事件编号ID: {{eventBoardInfo.eventID}}</a-row>
    <a-row class="board-item"> 事件类型:  {{eventBoardInfo.eventType}}</a-row>
    <a-row class="board-item"> 事件内容:  {{eventBoardInfo.eventContent}}</a-row>
    <a-row class="board-item">   位置:   {{eventBoardInfo.eventLocation}}</a-row>
    <a-row class="board-item"> 发生时间:  {{eventBoardInfo.eventTime}}</a-row>
    <a-row class="board-item"> 额外信息:  {{eventBoardInfo.eventExtraInfo}}</a-row>
  </div>

</template>

<script>

export default {
  name: 'eventBoard',
  props:['eventBoardInfo'],
  data() {
    return {};
  },
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
