<template>
  <div ref="wordGraph"></div>
</template>

<script>
import resize from '@/mixins/resize';
import echarts from 'echarts';
require('echarts-wordcloud');
const colorList = ['#4FD8FF', '#C15FFF', '#FF5F55', '#FFC935', '#767BFB'];

export default {
  name: 'wordGraph',
  mixins: [resize],
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchart();
    });
  },
  methods: {
    initEchart() {
      this.myChart = echarts.init(this.$refs.wordGraph);
      this.myChart.setOption(
        {
          tooltip: {},
          series: [
            {
              type: 'wordCloud',
              sizeRange: [12, 35],
              rotationRange: [0, 0],
              width: '100%',
              shape: 'cardioid',
              gridSize: 11,
              top: 0,
              textStyle: {
                normal: {
                  fontFamily: 'sans-serif',
                  color: () => {
                    return colorList[Math.floor(Math.random() * colorList.length)];
                  }
                }
              },
              data: [
                {
                  name: '电梯',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '烟雾传感器报警',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '商铺明火',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '电压不稳',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '燃气泄漏',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '水压不稳',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '电流过载',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '传感器故障',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '烟雾浓度',
                  value: Math.random(0.1, 1) * 70
                },
              ]
            }
          ]
        },
        true
      );
      this.myChart.off('click');
      this.myChart.on('click', params => {
        this.$message.success('点击了' + params.name);
      });
    }
  },
  watch: {
    chartData: {
      handler(nl, ol) {
        this.initEchart();
      },
      deep: true
    }
  }
};
</script>
