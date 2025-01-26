<template>
  <div ref="thingCorrGraph" ></div>
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
  name: 'thingCorrGraph',
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
      this.myChart = echarts.init(this.$refs.thingCorrGraph);
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
                    fontSize: 12
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
                  source: "3",
                  target: "1",
                  relation: {
                    name: "警报",
                    id: "1",
                  },
                },
                {
                  source: "4",
                  target: "3",
                  relation: {
                    name: "检测值异常",
                    id: "1",
                  },
                },
                {
                  source: "5",
                  target: "3",
                  relation: {
                    name: "检测值异常",
                    id: "1",
                  },
                },
                {
                  source: "6",
                  target: "3",
                  relation: {
                    name: "电流不稳",
                    id: "1",
                  },
                },
                {
                  source: "1",
                  target: "7",
                  relation: {
                    name: "相似事件",
                    id: "1",
                  },
                },
                {
                  source: "2",
                  target: "4",
                  relation: {
                    name: "巡检",
                    id: "1",
                  },
                },
                {
                  source: "2",
                  target: "5",
                  relation: {
                    name: "巡检",
                    id: "1",
                  },
                },
                {
                  source: "1",
                  target: "8",
                  relation: {
                    name: "处理人",
                    id: "1",
                  },
                },

              ],
              data: [
                {
                  name: "事件0254",
                  id: "1",
                  symbolSize: 80,//节点大小
                  symbol:'circle',//节点形状，'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'也可'image://url'设置节点图片
                },
                {
                  name: "陈某某",
                  id: "2",
                  symbolSize: 30,
                },
                {
                  name: "一级警报",
                  id: "3",
                  symbolSize: 60,
                },
                {
                  name: "烟感3954",
                  id: "4",
                  symbolSize: 30,
                },
                {
                  name: "烟感0329",
                  id: "5",
                  symbolSize: 30,
                },
                {
                  name: "电压传感0X5A",
                  id: "6",
                  symbolSize: 30,
                },
                {
                  name: "事件0086",
                  id: "7",
                  symbolSize: 80,
                },
                {
                  name: "王某某",
                  id: "8",
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
