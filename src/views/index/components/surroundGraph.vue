<template>
  <div ref="surroundGraph"></div>
</template>

<script>
import resize from '@/mixins/resize';
import echarts from 'echarts';
const colorList = [
  '#28CAD8',
  '#E5A214',
  '#F69F73',
  '#ff7f50',
  '#87cefa',
  '#da70d6',
  '#32cd32',
  '#6495ed',
  '#ff69b4',
  '#cd5c5c',
  '#1e90ff',
  '#ff6347',
  '#7b68ee',
  '#6b8e23',
  '#4ea397',
  '#b8860b',
  '#7bd9a5'
];
export default {
  name: 'surroundGraph',
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
      this.myChart = echarts.init(this.$refs.surroundGraph);
      this.myChart.setOption(
        {
          tooltip: {},
          series: [
            {
              type: 'graph',
              layout: 'force',
              force: {
                repulsion: 100,
                edgeLength: [20, 300],
                gravity: 0.1
              },
              roam: true,
              draggable: true,
              symbolSize: params => {
                return params;
              },
              itemStyle: {
                normal: {
                  shadowColor: 'rgba(133,203,247,0.75)',
                  shadowBlur: 15,
                  color: params => {
                    return colorList[Math.floor(Math.random() * colorList.length)];
                  }
                }
              },
              label: {
                normal: {
                  show: true
                }
              },
              data: [
                { name: '电梯', value: 50, x: 100, y: 100 },
                { name: '烟雾传感器报警', value: 68, x: 200, y: 100 },
                { name: '商铺明火', value: 46, x: 300, y: 150 },
                { name: '电压不稳', value: 50, x: 400, y: 130 },
                { name: '燃气泄漏', value: 60, x: 500, y: 140 },
                { name: '水压不稳', value: 45, x: 600, y: 180 },
                { name: '电流过载', value: 55, x: 700, y: 90 },
                { name: '传感器故障', value: 65, x: 800, y: 70 },
                { name: '烟雾浓度', value: 67, x: 480, y: 60 },
                { name: '交通拥堵', value: 56, x: 400, y: 210 },
                { name: '追尾', value: 58, x: 200, y: 200 },
                { name: '车祸', value: 48, x: 300, y: 200 }
              ]
            }
          ],
          animationDurationUpdate: index => {
            return index * 100;
          },
          animationEasingUpdate: 'bounceIn'
        },
        true
      );
    }
  }
};
</script>
