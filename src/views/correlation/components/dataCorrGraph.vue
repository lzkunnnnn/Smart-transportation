<template>
  <div ref="dataCorrGraph" ></div>
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
  name: 'dataCorrGraph',
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
      this.myChart = echarts.init(this.$refs.dataCorrGraph);
      this.myChart.setOption(
        {
          tooltip: {
            show: false
          },
          series: [
            {
              type: 'graph',
              layout: 'force',
              force: {
                repulsion: 1600,
                edgeLength: 200
              },
              roam: true,
              draggable: true,
              symbolSize: 80,
              focusNodeAdjacency: true,
              edgeLabel: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 16
                  },
                  formatter(x) {
                    return x.data.relation.name;
                  }
                }
              },
              edgeSymbol: ['circle', 'arrow'],
              itemStyle: {
                shadowColor: 'rgba(133,203,247,0.75)',
                shadowBlur: 15,
                color: params => {
                  return colorList[Math.floor(Math.random() * colorList.length)];
                }
              },
              label: {
                normal: {
                  show: true
                }
              },
              autoCurveness: 0.01, //多条边的时候，自动计算曲率
              links: [
                {
                  source: "2",
                  target: "1",
                  relation: {
                    name: "node",
                    id: "1",
                  },
                },
                {
                  source: "1",
                  target: "3",
                  relation: {
                    name: "node",
                    id: "1",
                  },
                },
                {
                  source: "1",
                  target: "4",
                  relation: {
                    name: "",
                    id: "1",
                  },
                },
                {
                  source: "4",
                  target: "1",
                  relation: {
                    name: "",
                    id: "1",
                  },
                },
                {
                  source: "5",
                  target: "4",
                  relation: {
                    name: "node",
                    id: "1",
                  },
                },
                {
                  source: "3",
                  target: "5",
                  relation: {
                    name: "node",
                    id: "1",
                  },
                },
                {
                  source: "6",
                  target: "4",
                  relation: {
                    name: "node",
                    id: "1",
                  },
                },
                {
                  source: "7",
                  target: "4",
                  relation: {
                    name: "node",
                    id: "1",
                  },
                },
              ],
              data: [
                {
                  name: "烟雾传感",
                  id: "1",
                  symbolSize: 60,//节点大小
                  symbol:'circle',//节点形状，'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'也可'image://url'设置节点图片
                },
                {
                  name: "4439",
                  id: "2",
                  symbolSize: 30,
                },
                {
                  name: "6628",
                  id: "3",
                  symbolSize: 30,
                },
                {
                  name: "电气系统",
                  id: "4",
                  symbolSize: 60,
                },
                {
                  name: "0312",
                  id: "5",
                  symbolSize: 30,
                },
                {
                  name: "0329",
                  id: "6",
                  symbolSize: 30,
                },
                {
                  name: "0X5A",
                  id: "7",
                  symbolSize: 30,
                },
              ]
            }
          ],
          animationDurationUpdate: index => {
            return index * 100;
          },
          animationEasingUpdate: 'bounceIn',
        },
        true
      );
    }
  }
};
</script>
