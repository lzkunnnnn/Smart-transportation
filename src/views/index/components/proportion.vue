<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <div class="step">
      <!-- 左边100%的时候不显示斜边三角形，并且增加右边角 -->
      <div
        class="left"
        v-show="leftPercent"
        :class="[{ 'full-left': !rightPercent }, { 'tringle': rightPercent }]"
        :style="{ width: leftPercent+'%' }"
      >
        {{ leftPercent }}%
      </div>
      <div
        class="right"
        v-show="rightPercent"
        :class="[{ 'full-right': !leftPercent }]"
      >
        {{ rightPercent }}%
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "proportion",
  data() {
    return {
      totalNum: 1000,
      leftPercent: 60,
      leftBar: {
        isShowTip: false,
        delayOut: null
      },
      rightBar: {
        isShowTip: false,
        delayOut: null
      }
    };
  },
  methods: {
  },
  computed: {
    rightPercent: function(){
      return 100 - this.leftPercent;
    }
  }
};
</script>

<style lang="less" scoped>
.step {
  position: relative;
  display: flex;
  width: 100%;
  font-size: 0;
  .left {
    flex-grow: 0;
    position: relative;
    display: inline-block;
    background: #62c87f;
    color: #fff;
    text-align: center;
    font-weight: bold;
    width: 70%;
    font-size: 12px;
    line-height: 20px;
    height: 20px;
    min-width: 30px;
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

  .right {
    flex-grow: 1;
    position: relative;
    display: inline-block;
    /* width:30%; */
    background: #d0d4dc;
    color: #333;
    font-weight: bold;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    height: 20px;
    text-align: center;
    min-width: 35px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .full-left{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .full-right{
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }



}
</style>

