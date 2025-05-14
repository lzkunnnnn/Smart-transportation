<template>
  <!--   <div>{{ links }}</div> -->
  <div ref="relationChart"></div>
</template>
<script>
import resize from '@/mixins/resize';
import echarts from 'echarts';
export default {
  name: 'relationChart',
  mixins: [resize],
  props: ['links', 'data'],
  data() {
    return {
      center: {}
    };
  },
  watch: {
    links: {
      deep: true,
      handler() {
        this.initEchart();
      }
    },
    data: {
      deep: true,
      handler() {
        this.initEchart();
      }
    }
  },
  methods: {
    initEchart() {
      this.myChart = echarts.init(this.$refs.relationChart);
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
                repulsion: 2000,
                edgeLength: 200
              },
              roam: true,
              draggable: true,
              symbolSize: 40,
              focusNodeAdjacency: true,
              edgeLabel: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 16
                  },
                  formatter(x) {
                    return x.data.name;
                  }
                }
              },
              edgeSymbol: ['', 'arrow'],
              label: {
                normal: {
                  show: true, // 确保 label 始终显示
                  textStyle: {
                    fontSize: 14,
                    color: 'white' // 设置文字颜色
                  }
                }
              },
              itemStyle: {
                normal: {
                  shadowColor: 'rgba(133,203,247,0.75)',
                  shadowBlur: 15
                }
              },
              links: this.links,
              data: this.data
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
