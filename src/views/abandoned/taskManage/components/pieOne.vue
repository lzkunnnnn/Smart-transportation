<template>
  <div ref="pieOne"></div>
</template>

<script>
import resize from '@/mixins/resize';
import echarts from 'echarts';

const colorLost = ['#4FD8FF', '#C15FFF', '#FF5F55', '#FFC935', '#767BFB', 'rgb(248,70,102)'];
export default {
  name: 'pieOne',
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
      this.myChart = echarts.init(this.$refs.pieOne);
      this.myChart.setOption(
        {
          color: colorLost,
          title: [
            {
              text: '85%',
              textStyle: {
                color: '#5171fd',
                fontSize: 25
              },
              top: 'center',
              left: 'center'
            }
          ],
          tooltip: {
            trigger: 'item',
            formatter: params => {
              return params.marker + ' ' + params.name + '：' + params.value + ' (' + params.percent + '%)';
            }
          },
          legend: {
            textStyle: {
              color: '#fff',
              fontSize: 12
            },
            show: true,
            left: '15',
            top: 0,
            type: 'scroll',
            itemWidth: 18,
            itemHeight: 11,
            data: ['烟感', '电气', '消防']
          },
          series: [
            {
              name: '报警类型',
              type: 'pie',
              icon: 'circle',
              radius: ['35%', '55%'],
              center: ['50%', '50%'],
              itemStyle: {
                normal: {
                  borderColor: '#fff',
                  borderWidth: 1
                }
              },
              data: [
                {
                  name: '烟感',
                  value: 18
                },
                {
                  name: '电气',
                  value: 35
                },
                {
                  name: '消防',
                  value: 37
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
