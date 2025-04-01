<template>
  <div ref="levelRank"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'levelRank',
  props: ['handleList'],
  data() {
    return {
      /*  handleListData: {
        handledLevelOne: 0,
        handledLevelTwo: 0,
        handledLevelThree: 0,
        handledLevelFour: 0,
        unHandledLevelOne: 0,
        unHandledLevelTwo: 0,
        unHandledLevelThree: 0,
        unHandledLevelFour: 0
      } */
    };
  },
  mounted() {
    /*  axios.get('event/getHandleDTO').then(res => {
      this.handleListData = res.data.data; // 更新数据 */
    this.$nextTick(() => {
      // 确保 DOM 更新完成后初始化 ECharts
      this.initEchart();
    });
    /*     }); */
  },
  watch: {
    // 监听 handleList 的变化，当数据更新时重新初始化图表
    handleList: {
      deep: true,
      handler() {
        this.initEchart();
      }
    }
  },
  methods: {
    initEchart() {
      this.myChart = echarts.init(this.$refs.levelRank);
      const handledArray = [
        this.handleList.handledLevelFour,
        this.handleList.handledLevelThree,
        this.handleList.handledLevelTwo,
        this.handleList.handledLevelOne
      ];
      const unHandledArray = [
        this.handleList.unHandledLevelFour,
        this.handleList.unHandledLevelThree,
        this.handleList.unHandledLevelTwo,
        this.handleList.unHandledLevelOne
      ];
      console.log(handledArray);
      this.myChart.setOption(
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend: {
            show: true,
            textStyle: {
              color: 'white'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            show: false
          },
          yAxis: {
            type: 'category',
            data: ['四级警报', '三级警报', '二级警报', '一级警报'],
            axisLabel: {
              textStyle: {
                color: 'white'
              }
            }
          },
          series: [
            {
              name: '已完成',
              type: 'bar',
              stack: 'total',
              barWidth: '20',
              label: {
                show: true
              },
              itemStyle: {
                normal: {
                  color: 'rgb(98, 198, 190)'
                }
                // borderColor: '#fff'
              },
              emphasis: {
                focus: 'series'
              },
              data: handledArray
            },
            {
              name: '待处理',
              type: 'bar',
              stack: 'total',
              barWidth: '20',
              label: {
                show: true
              },
              itemStyle: {
                color: ' rgb(244, 63, 94)'
                // borderColor: '#fff'
              },
              emphasis: {
                focus: 'series'
              },
              data: unHandledArray
            }
          ]
        },
        true
      );
    }
  }
};
</script>
<style lang="scss" scoped></style>
