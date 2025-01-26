<template>
    <a-list :data="alarmCategoryList">
    <a-list-item v-for="item in alarmCategoryList">
      <span style="color: #82dc8d">{{ item.id }}</span>
      <span class="rowBox">{{ item.category }}</span>
      <span style="color: #fc8c73">{{ item.times }}次</span>
      <div class="step">
        <div
          class="left"
          v-show="item.leftPercent"
          :class="[{ 'full-left': !rightPercent }]"
          :style="{ width: item.leftPercent+'%' }"
        >
          {{ item.leftPercent }}%
        </div>
      </div>
    </a-list-item>
    </a-list>
</template>
<script>

export default {
  name: "alarmCategory",
  props:['alarmCategoryList'],
  data() {
    return {
      rightPercent:0,
    };

  },

};
</script>

<style lang="less" scoped>
  .rowBox {
    text-align:left;
    background-color: #727682;
  }

  .proCss {
    width: 200px;
  }


.step {
  position: relative;
  display: flex;
  width: 120px;
  font-size: 0;

  .left {
    flex-grow: 0;
    position: relative;
    display: inline-block;
    background: #e54f4f;
    color: #fff;
    text-align: center;
    font-weight: bold;
    width: 100%;
    font-size: 12px;
    line-height: 20px;
    height: 20px;
    min-width: 2px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  // 百分百的时候不显示该伪类
  .tringle::after {
    content: " ";
    position: absolute;
    top: 0;
    right: -8px;
    border-width: 20px 8px;
    border-style: solid;
    border-color: #62c87f transparent transparent transparent;
    z-index: 10;
  }


  .full-left {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

}
</style>