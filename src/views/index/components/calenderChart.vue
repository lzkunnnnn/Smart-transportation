<template>
  <div ref="calenderChart"></div>
</template>

<script>
import resize from '@/mixins/resize';
import echarts from 'echarts';

export default {
  name: 'calenderChart',
  mixins: [resize],
  data() {
    return {};
  },
  mounted() {
    this.initEchart();
  },
  methods: {
    initEchart() {
      this.myChart = echarts.init(this.$refs.calenderChart);
      const start = '2025-01-01';
      const end = '2025-12-31';
      const month = '2025-' + String(new Date().getMonth() + 1).padStart(2, '0');
      const dateList = this.generateDateList(start, end);
      const heatmapData = [];
      const dateData = []; // 用于显示日期的几号
      const today = new Date();
      const todayStr = this.formatDate(today);
      console.log('todayStr:', todayStr);

      dateList.forEach(date => {
        if (date <= todayStr) {
          heatmapData.push([date, Math.random() * 100]); // 示例数据，当前日期及之前使用随机值
        } else {
          heatmapData.push([date, 0]); // 未来日期事件数设置为 0
        }
        dateData.push([date, 1]); // 示例数据
      });

      const option = {
        tooltip: {
          formatter: function (params) {
            return `日期: ${params.value[0]}<br>事件数: ${params.value[1].toFixed(0)}`;
          }
        },
        visualMap: {
          show: false,
          min: 0,
          max: 100,
          inRange: {
            color: ['#deba57', 'rgb(220, 38, 38)']
          }
        },
        calendar: [
          {
            left: 'center',
            top: 'middle',
            cellSize: [38, 38], // 缩小单元格大小
            range: [month],
            //一二三四五六日
            dayLabel: {
              firstDay: 1,
              nameMap: 'cn',
              textStyle: {
                color: 'white'
              }
            },
            monthLabel: {
              show: false
            },
            yearLabel: { show: false },
            orient: 'vertical'
          }
        ],
        series: [
          {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: heatmapData,
            itemStyle: {
              color: function (params) {
                const dataDate = params.value[0];
                // console.log('Checking date:', dataDate); // 打印正在检查的日期，用于调试
                if (dataDate === todayStr) {
                  // console.log('Highlighting:', dataDate); // 打印高亮的日期，用于调试
                  return 'red'; // 高亮显示今天
                }
                return null; // 其他日期使用 visualMap 配置的颜色
              }
            }
          },
          {
            type: 'scatter',
            coordinateSystem: 'calendar',
            symbolSize: 1,
            label: {
              show: true,
              formatter: function (params) {
                const date = new Date(params.value[0]);
                return date.getDate(); // 显示几号
              },
              color: '#000',
              fontSize: 14 // 调整字体大小
            },
            data: dateData,
            silent: true
          }
        ]
      };
      this.myChart.setOption(option);
    },
    generateDateList(start, end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const dateList = [];
      while (startDate <= endDate) {
        dateList.push(this.formatDate(startDate));
        startDate.setDate(startDate.getDate() + 1);
      }
      return dateList;
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }
};
</script>
<style></style>
