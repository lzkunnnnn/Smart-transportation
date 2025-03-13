<template>
  <div ref="alarmPie"></div>
</template>

<script>
import resize from '@/mixins/resize';
import echarts from 'echarts';

const colorLost = ['#4FD8FF', '#C15FFF', '#FF5F55', '#FFC935', '#767BFB', 'rgb(248,70,102)'];

export default {
  name: 'alarmPie',
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
    async initEchart() {
      await this.$store.dispatch('asyncGetHandleList');
      this.myChart = echarts.init(this.$refs.alarmPie);
      this.myChart.setOption(
        {
          color: colorLost,
          tooltip: {
            trigger: 'item',
            formatter: params => {
              return params.marker + ' ' + params.name + '：' + params.value + ' (' + params.percent + '%)';
            }
          },
          legend: {
            show: true,
            left: 40,
            top: 0,
            type: 'scroll',
            //上方小方格大小
            itemWidth: 16,
            itemHeight: 12,
            data: ['违停', '速度', '卡口', '流量', '车道', '环境'],
            textStyle: {
              // 设置字体样式
              color: 'white', // 字体颜色为红色
              fontSize: 14, // 字体大小（可选）
              fontWeight: 'normal' // 字体粗细（可选）
            }
          },
          series: [
            {
              name: '技术占比',
              type: 'pie',
              icon: 'circle',
              radius: ['35%', '55%'],
              center: ['48%', '55%'],
              roseType: 'radius',
              data: [
                {
                  name: '违停',
                  value: this.$store.state.handleList.parkNum
                },
                {
                  name: '速度',
                  value: this.$store.state.handleList.speedNum
                },
                {
                  name: '卡口',
                  value: this.$store.state.handleList.checkNum
                },
                {
                  name: '流量',
                  value: this.$store.state.handleList.flowNum
                },
                {
                  name: '车道',
                  value: this.$store.state.handleList.laneNum
                },
                {
                  name: '环境',
                  value: this.$store.state.handleList.environmentNum
                }
              ],
              label: {},
              labelLine: {
                normal: {
                  show: true
                }
              }
            }
          ]
        },
        true
      );
    }
  }
};
</script>
