<template>
  <div ref="anomalyLine"></div>
</template>

<script>
import resize from '@/mixins/resize';
import echarts from 'echarts';
export default {
  name: 'anomalyLine',
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
      const myChart = echarts.init(this.$refs.anomalyLine);
      //
      const time = (function () {
        // 立即执行函数
        let now = new Date(); // 获得当前的时间
        let res = []; // 存放时间的数组
        let len = 8; // 要存几个时间？
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          now = new Date(+now - 2000); // 延迟几秒存储一次？
        }
        return res;
      })();
      const dataOne = (function () {
        // 5个随机数，大家可随意定义
        let res = [];
        let len = 8;
        while (len--) {
          res.push((Math.random() * (3.8 - 2.9) + 2.9).toFixed(3));
        }
        return res;
      })();
      const dataTwo = (function () {
        // 5个随机数
        let res = [];
        let len = 8;
        while (len--) {
          res.push((Math.random() * (30 - 25) + 25).toFixed(3));
        }
        return res;
      })();
      let threshold2Top = (Math.random() * (32 - 29.6) + 29.6).toFixed(3);
      let threshold2Bottom = (Math.random() * (26.7 - 25.4) + 25.4).toFixed(3);

      let threshold1Top = (Math.random() * (6 - 5) + 5).toFixed(3);
      let threshold1Bottom = (Math.random() * (3 - 1) + 1).toFixed(3);
      let options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          show: true,
          textStyle: {
            color: '#000000'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          axisLabel: {
            //x轴文字的配置
            show: true,
            fontStyle: 'normal',
            textStyle: {
              color: '#000000'
            },
            interval: 0,
            rotate: 30
          },
          axisTick: {
            show: false
          },
          axisPointer: {
            snap: true
          },
          axisLine: {
            lineStyle: {
              color: '#cecece'
            }
          },
          // prettier-ignore
          data: time
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            fontStyle: 'normal',
            textStyle: {
              color: '#fff'
            },
            formatter: '{value}'
          },
          axisLine: {
            lineStyle: {
              color: '#cecece'
            }
          },
          splitLine: {
            show: false
          },
          axisPointer: {
            snap: true
          }
        },
        visualMap: {
          show: false,
          dimension: 1,
          pieces: [
            {
              gte: 0.5,
              //lte设置一个不可能的值
              lte: 0.8,
              color: 'red'
            }
          ],
          outOfRange: {
            color: 'green'
          }
        },
        series: [
          {
            name: '工业传感器1',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            //showSymbol: false,
            // prettier-ignore
            data: dataOne,
            markPoint: {
              itemStyle: {
                color: '#5171fd'
                // borderColor: '#fff',
              },
              data: [
                //{ name: '未来1分钟预测', value: "预测", xAxis: time[time.length - 2],  yAxis: dataOne[dataOne.length - 2]},
                //{ name: '未来30分钟预测', value: "预测", xAxis: time[time.length - 1],  yAxis: dataOne[dataOne.length - 1]},
              ]
            },
            markArea: {
              itemStyle: {
                //114	118	130
                color: 'rgba(114, 118, 130, 0.7)'
              },
              data: [
                [
                  {
                    xAxis: time[time.length - 3]
                  },
                  {
                    xAxis: time[-1]
                  }
                ]
              ]
            },
            markLine: {
              symbol: 'none',
              data: [
                { name: '阈值上界', value: threshold1Top, yAxis: threshold1Top },
                { name: '阈值下界', value: threshold1Bottom, yAxis: threshold1Bottom }
              ]
            },
            lineStyle: {
              normal: {
                color: '#5171fd' // 线条颜色
              }
            },
            itemStyle: {
              color: '#5171fd',
              borderColor: '#fff'
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#5171fd'
                    },
                    {
                      offset: 0.5,
                      color: '#5171fd'
                    },
                    {
                      offset: 1,
                      color: 'rgba(127,153,255,0.1)'
                    }
                  ],
                  false
                )
              }
            }
          },
          {
            name: '工业传感器2',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            showSymbol: false,
            // prettier-ignore
            data: dataTwo,
            lineStyle: {
              normal: {
                color: '#ff874b' // 线条颜色
              }
            },
            itemStyle: {
              color: '#ff874b',
              borderColor: '#fff'
            },
            markPoint: {
              itemStyle: {
                color: '#ff874b'
                // borderColor: '#fff'
              },
              data: [
                //{ name: '未来1分钟预测', value: "预测", xAxis: time[time - 2],  yAxis: dataTwo[dataTwo.length - 2] },
                //{ name: '未来30分钟预测', value: "预测", xAxis: time[time.length - 1],  yAxis: dataTwo[dataTwo.length - 1]  },
              ]
            },
            markLine: {
              symbol: 'none',
              data: [
                { name: '阈值上界', value: threshold2Top, yAxis: threshold2Top },
                { name: '阈值下界', value: threshold2Bottom, yAxis: threshold2Bottom }
              ]
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#ff874b'
                    },
                    {
                      offset: 0.5,
                      color: '#ff874b'
                    },
                    {
                      offset: 1,
                      color: 'rgba(255,135,75,0.1)'
                    }
                  ],
                  false
                )
              }
            }
          }
        ]
      };
      setInterval(function () {
        let nowTime = new Date().toLocaleTimeString().replace(/^\D*/, '');
        time.shift();
        time.push(nowTime);
        //time.push('+10');

        dataOne.shift();
        dataOne.push((Math.random() * (3.8 - 2.9) + 2.9).toFixed(3));
        dataOne.push((Math.random() * (3.8 - 2.9) + 2.9).toFixed(3));

        dataTwo.shift();
        dataTwo.push((Math.random() * (30 - 25) + 25).toFixed(3));
        dataTwo.push((Math.random() * (30 - 25) + 25).toFixed(3));

        threshold2Top = (Math.random() * (32 - 29.6) + 29.6).toFixed(3);
        threshold2Bottom = (Math.random() * (26.7 - 25.4) + 25.4).toFixed(3);

        threshold1Top = (Math.random() * (6 - 5) + 5).toFixed(3);
        threshold1Bottom = (Math.random() * (3 - 1) + 1).toFixed(3);
        console.log(dataOne);
        //接后端接口,把数据替换下来既可以了
        // axios.get('你的url').then(res => {
        //   console.log(res)
        // })
        myChart.setOption({
          xAxis: [
            {
              data: time
            }
          ],
          series: [
            {
              data: dataOne,
              markLine: {
                symbol: 'none',
                data: [
                  { name: '阈值上界', value: threshold1Top, yAxis: threshold1Top },
                  { name: '阈值下界', value: threshold1Bottom, yAxis: threshold1Bottom }
                ]
              },
              markPoint: {
                itemStyle: {
                  color: '#5171fd'
                  // borderColor: '#fff',
                },
                data: [
                  //{ name: '未来1分钟预测', value: "预测", xAxis: time[time.length - 2],  yAxis: dataOne[dataOne.length - 2]},
                  //{ name: '未来30分钟预测', value: "预测", xAxis: time[time.length - 1],  yAxis: dataOne[dataOne.length - 1]},
                ]
              }
            },
            {
              data: dataTwo,
              markLine: {
                symbol: 'none',
                data: [
                  { name: '阈值上界', value: threshold2Top, yAxis: threshold2Top },
                  { name: '阈值下界', value: threshold2Bottom, yAxis: threshold2Bottom }
                ]
              },
              markPoint: {
                itemStyle: {
                  color: '#ff874b'
                  // borderColor: '#fff'
                },
                data: [
                  //{ name: '未来1分钟预测', value: "预测", xAxis: time[time.length - 2],  yAxis: dataTwo[dataTwo.length - 2] },
                  //{ name: '未来30分钟预测', value: "预测", xAxis: time[time.length - 1],  yAxis: dataTwo[dataTwo.length - 1]  },
                ]
              }
            }
          ]
        });
      }, 3000);
      myChart.setOption(options);
    }
  }
};
</script>
