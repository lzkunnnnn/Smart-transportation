<template>
  <div ref="progressChart"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'ProgressChart', // 修改组件名称，避免与 HTML 标签冲突
  props: ['progressList'],
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchart();
    });
  },
  watch: {
    progressList: {
      handler(newVal, oldVal) {
        if (this.myChart) {
          // 如果图表已经初始化，则更新数据
          this.myChart.setOption({
            series: [
              {
                data: newVal
              }
            ]
          });
        } else {
          // 如果图表未初始化，则初始化图表
          this.initEchart();
        }
      },
      deep: true // 深度监听，确保数组内部变化也能触发
    }
  },
  methods: {
    initEchart() {
      this.myChart = echarts.init(this.$refs.progressChart);
      this.myChart.setOption(
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow' // 阴影指示器
            }
          },
          legend: {
            show: false,
            textStyle: {
              color: 'white'
            }
          },
          grid: {
            left: '3%',
            right: '10%',
            bottom: '3%',
            top: '1%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            show: true, // 显示横坐标轴
            axisLabel: {
              color: 'white', // 横坐标轴标签颜色
              formatter: function (value) {
                return value + '%'; // 将数值转换为百分比
              }
            },
            axisLine: {
              lineStyle: {
                color: 'white' // 横坐标轴线颜色
              }
            },
            splitLine: {
              show: true, // 显示网格线
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.2)' // 网格线颜色
              }
            }
          },
          yAxis: {
            type: 'category',
            data: ['违停抓拍', '卡口摄像', '流量监控', '区间测速', '车道监测', '环境监测'],
            axisLabel: {
              textStyle: {
                color: 'white' // 纵坐标轴标签颜色
              }
            },
            axisLine: {
              show: true, // 显示纵坐标轴线
              lineStyle: {
                color: 'white' // 纵坐标轴线颜色
              }
            }
          },
          series: [
            {
              name: '事件占比',
              type: 'bar',
              stack: 'total',
              barWidth: '20',
              label: {
                show: true,
                position: 'right', // 标签显示在右侧
                color: 'white', // 标签颜色
                formatter: function (params) {
                  return params.value + '%'; // 将数值转换为百分比
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(67, 56, 202)' // 柱状图颜色
                }
              },
              emphasis: {
                focus: 'series'
              },
              data: this.progressList // 确保数据格式正确
            }
          ]
        },
        true
      );
    }
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.dispose(); // 销毁实例
    }
  }
};
</script>

<style lang="scss" scoped></style>
