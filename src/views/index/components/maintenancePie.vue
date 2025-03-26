<template>
  <div ref="maintenancePie"></div>
</template>

<script>
import resize from '@/mixins/resize';
import echarts from 'echarts';
//右侧转盘颜色，顺时针
const colorLost = ['#131386', '#FFC935', '#767BFB', 'rgb(248,70,102)'];

export default {
  name: 'maintenancePie',
  mixins: [resize],
  data() {
    return {
      pieXY: [
        {
          name: '未开始',
          value: 256
        },
        {
          name: '运行中',
          value: 124
        },
        {
          name: '已完成',
          value: 99
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchart();
    });
  },
  methods: {
    initEchart() {
      this.myChart = echarts.init(this.$refs.maintenancePie);
      this.myChart.setOption(
        {
          color: colorLost,
          tooltip: {
            trigger: 'item'
          },
          title: [
            {
              //圆环中间的标题
              text: '维保任务',
              textStyle: {
                color: '#131386',
                fontSize: 13
              },
              top: '25%',
              left: 'center'
            }
          ],
          legend: {
            align: 'left',
            orient: 'vertical',
            x: 'center', //可设定图例在左、右、居中
            y: 'bottom', //可设定图例在上、下、居中
            padding: [0, 0, 30, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
            textStyle: {
              //圆环下边字体的颜色
              color: '#131386'
            },
            data: [
              {
                name: this.pieXY[0].name
              },
              {
                name: this.pieXY[1].name
              },
              {
                name: this.pieXY[2].name
              }
            ],
            formatter: params => {
              //格式化数据的函数
              console.log('我的参数', params); //打印出来的数据（营业，网络，房屋，tgtn,g）
              for (let a = 0; a < this.pieXY.length; a++) {
                // this.pieXY  这个数据中有名称和次数
                if (this.pieXY[a].name == params) {
                  //两个名称进行对比，取出对应的次数
                  return params + '   ｜   ' + this.pieXY[a].value + '单'; //然后return你需要的legend格式即可
                }
              }
            }
          },

          //内有圆环颜色，名字设置
          series: [
            {
              name: '维修任务',
              type: 'pie',
              icon: 'circle',
              radius: ['35%', '55%'],
              center: ['50%', '28%'],
              itemStyle: {
                normal: {
                  borderColor: '#fff', //圆环的border颜色
                  borderWidth: 1
                }
              },
              data: this.pieXY,
              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
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
