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
            itemWidth: 20,
            itemHeight: 16,
            data: ['smog', 'gas', 'water', 'elec', 'xxx', 'xxxx'],
            textStyle: {
              // 设置字体样式
              color: 'white', // 字体颜色为红色
              fontSize: 16, // 字体大小（可选）
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
                  name: 'smog',
                  value: this.$store.state.handleList.smogNum
                },
                {
                  name: 'gas',
                  value: this.$store.state.handleList.gasNum
                },
                {
                  name: 'water',
                  value: this.$store.state.handleList.waterNum
                },
                {
                  name: 'elec',
                  value: this.$store.state.handleList.elecNum
                },
                {
                  name: 'xxx',
                  value: 2
                },
                {
                  name: 'xxxx',
                  value: 3
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
