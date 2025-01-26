<template>
  <div ref="mychart" id="myDiv"></div>
</template>
<script>
import echarts from 'echarts';
export default {
  mounted() {
    let myEcharts = echarts.init(this.$refs.mychart);
    myEcharts.setOption({
      title: {
        text: 'ECharts 入门示例',
        x: 'center',
        subtext:'dsaud',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bolder',
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'item',
        axisPointer:{
          type:'cross',
        },
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        show: true,
        data: ['销量']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    })
  }
};
</script>

<style>
#myDiv{
  width: 500px;
  height: 500px;
  border: 1px solid red;
}
</style>
