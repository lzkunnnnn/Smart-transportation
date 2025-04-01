<template>
  <!-- 没用上 -->
  <div>
    <div class="wrapper" v-for="progress in animatedProgressList" :key="progress.title">
      <div class="title">{{ progress.title }}</div>
      <a-progress
        class="percentage"
        :percent="progress.animatedValue"
        :status="progress.status"
        :stroke-color="progress.strokeColor"
      ></a-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Percentage',
  props: ['progressList'],
  data() {
    return {
      animatedProgressList: [] // 用于存储带动画效果的进度条数据
    };
  },
  mounted() {
    // 初始化 animatedProgressList
    this.animatedProgressList = this.progressList.map(progress => ({
      ...progress,
      animatedValue: 0 // 初始值为 0
    }));

    // 为每个进度条启动动画
    this.animatedProgressList.forEach((progress, index) => {
      this.startAnimation(progress, index);
    });
  },
  methods: {
    startAnimation(progress, index) {
      const targetValue = progress.value; // 目标值
      const duration = 1500; // 动画持续时间（2秒）
      const interval = 10; // 更新间隔（10ms）
      const step = (targetValue / duration) * interval; // 每次更新的步长

      const timer = setInterval(() => {
        if (progress.animatedValue < targetValue) {
          progress.animatedValue += step;
        } else {
          progress.animatedValue = targetValue; // 确保最终值准确
          clearInterval(timer); // 停止动画
        }
      }, interval);
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  height: 30px;

  .title {
    text-align: center;
    font-size: 18px;
    flex-basis: 100px;
  }
  .percentage {
    width: 360px;
  }
  ::v-deep .ant-progress-text {
    color: white !important;
  }
}
</style>
