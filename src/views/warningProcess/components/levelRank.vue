<template>
<!--    <div :data="rankData" :class-option="classOption" :key="num">-->
<!--      <div class="shop-item flex" v-for="(item, index) in rankData" :key="index">-->
<!--        <div style="width:130px">-->
<!--          <span class="rankIndex inline-block">-->
<!--            <svg-icon :icon="rankIndex[index + 1]" :size="25" v-if="index <= 4" />-->
<!--            <span v-else> {{ index + 1 }}</span>-->
<!--          </span>-->

<!--          <span style="margin-left:10px">{{ item.area }}</span>-->
<!--        </div>-->
<!--&lt;!&ndash;        <a-progress&ndash;&gt;-->
<!--&lt;!&ndash;          :stroke-color="{&ndash;&gt;-->
<!--&lt;!&ndash;            from: '#3dadf6',&ndash;&gt;-->
<!--&lt;!&ndash;            to: '#737bfc'&ndash;&gt;-->
<!--&lt;!&ndash;          }"&ndash;&gt;-->
<!--&lt;!&ndash;          :percent="filterValue(item.value)"&ndash;&gt;-->
<!--&lt;!&ndash;          class="flex-sub"&ndash;&gt;-->
<!--&lt;!&ndash;          :showInfo="false"&ndash;&gt;-->
<!--&lt;!&ndash;        />&ndash;&gt;-->
<!--&lt;!&ndash;        <div style="margin-left:10px">{{ item.value }}</div>&ndash;&gt;-->
<!--      </div>-->
<!--    </div>-->
  <div ref="levelRank"></div>

</template>

<script>

import echarts from "echarts";

export default {
  name: "levelRank",
  // props: {
  //   rankData: Array
  // },
  data() {
    return {
      rankIndex: {
        1: "level1",
        2: "level2",
        3: "level3",
        4: "level4",
      },
      rankData: [
        { "area": "一级警报", "value": 8 },
        { "area": "二级警报", "value": 12 },
        { "area": "三级警报", "value": 34 },
        { "area": "四级警报", "value": 27 }
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchart();
    });

  },
  methods: {
    initEchart() {
      this.myChart = echarts.init(this.$refs.levelRank);
      this.myChart.setOption(
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // Use axis to trigger tooltip
              type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend: {
            show: true,
            textStyle: {
              color: '#000000'
            },
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
            data: ['四级警报', '三级警报', '二级警报', '一级警报',],
            axisLabel: {
              textStyle: {
                color: "#000000",
              },
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
                  color: '#3dadf6',
                }

                // borderColor: '#fff'
              },
              emphasis: {
                focus: 'series'
              },
              data: [189, 202, 124, 97,]
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
                color: 'rgb(249,129,159)',
                // borderColor: '#fff'
              },
              emphasis: {
                focus: 'series'
              },
              data: [63, 73, 89, 56,]
            },

          ]
        },
        true
      );
    },
  }
  // computed: {
  //   max() {
  //     if (this.rankData.length === 0) return 0;
  //     return this.rankData[0].value;
  //   }
  // },
  //
  // methods: {
  //   filterValue(val) {
  //     if (!val || this.max === 0) {
  //       return 0;
  //     }
  //     return parseInt((val / 81)*100);
  //   }
  // }
};
</script>
<style lang="scss" scoped>
.shop-item {
  margin-bottom: 16px;
  font-size: 1rem;

  .rankIndex {
    width: 30px;
    height: 30px;
    text-align: center;
    vertical-align: middle;
  }
}
</style>
