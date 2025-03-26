<template>
  <div ref="eventBar"></div>
</template>

<script>
import resize from '@/mixins/resize';
import echarts from 'echarts';
export default {
  name: 'eventBar',
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
      this.myChart = echarts.init(this.$refs.eventBar);
      this.myChart.setOption(
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            padding: [5, 10]
          },
          grid: {
            left: 50,
            right: 20,
            bottom: 40,
            top: 30
          },
          legend: {
            show: true,
            itemWidth: 20,
            itemHeight: 16,
            textStyle: {
              // 设置字体样式
              color: 'white', // 字体颜色为红色
              fontSize: 16, // 字体大小（可选）
              fontWeight: 'normal' // 字体粗细（可选）
            }
          },
          xAxis: [
            {
              type: 'category',
              data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
              axisLine: {
                lineStyle: {
                  color: '#cecece'
                }
              },
              //x坐标轴的文字颜色
              axisLabel: {
                color: 'white'
              },
              axisTick: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#cecece'
                }
              },
              axisLabel: {
                color: 'white'
              },
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              name: '烟雾',
              type: 'bar',
              data: [20, 30, 40, 40, 45, 50, 30],
              barWidth: '8',
              barGap: '20%',
              type: 'bar',
              itemStyle: {
                normal: {
                  barBorderRadius: 10,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(249, 168, 212)'
                    },
                    {
                      offset: 0.5,
                      color: ' rgb(216, 180, 254)'
                    },
                    {
                      offset: 1,
                      color: ' rgb(129, 140, 248)'
                    }
                  ])
                }
              }
            },
            {
              name: '电气',
              type: 'bar',
              data: [30, 40, 50, 50, 55, 60, 40],
              barWidth: '8',
              barGap: '20%',
              type: 'bar',
              itemStyle: {
                normal: {
                  barBorderRadius: 10,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#5171fd'
                    },
                    {
                      offset: 1,
                      color: '#c97afd'
                    }
                  ])
                }
              }
            },
            {
              name: '消防',
              type: 'bar',
              data: [60, 60, 90, 90, 120, 120, 90],
              barWidth: '8',
              barGap: '20%',
              type: 'bar',
              itemStyle: {
                normal: {
                  barBorderRadius: 10,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(99, 102, 241)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(124, 58, 237)'
                    }
                  ])
                }
              }
            },
            {
              name: '气体',
              type: 'bar',
              data: [40, 40, 60, 60, 80, 80, 60],
              barWidth: '8',
              barGap: '20%',
              type: 'bar',
              itemStyle: {
                normal: {
                  barBorderRadius: 10,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#ea677c'
                    },
                    {
                      offset: 1,
                      color: '#ef9b5f'
                    }
                  ])
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
