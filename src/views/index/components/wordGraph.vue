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
              sizeRange: [20, 40],
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
                  name: '摄像头故障',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '十字路口堵塞',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '车流高峰期预警',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '违规停车',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '红绿灯故障',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '车辆超载',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '交通拥堵',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '追尾',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '车祸',
                  value: Math.random(0.1, 1) * 70
                },
                {
                  name: '超速',
                  value: Math.random(0.1, 1) * 70
                }
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
