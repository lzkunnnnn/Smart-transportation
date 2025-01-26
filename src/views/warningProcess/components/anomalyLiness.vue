<template>
  <div ref="anomalyLine"></div>
</template>

<script>
import resize from "@/mixins/resize";
import echarts from "echarts";

export default {
  name: "anomalyLine",
  mixins: [resize],
  data() {
    return {};
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initEchart();
    // });
    this.test();

  },
  methods: {
    test() {
      // 官方示例 var myChart = echarts.init(document.getElementById('main'));
      const myChart = echarts.init(this.$refs.anomalyLine); // 我们可以这样写
      //
      const time = (function() { // 立即执行函数
        let now = new Date();  // 获得当前的时间
        let res = []; // 存放时间的数组
        let len = 5; // 要存几个时间？
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, "")); // 转换时间，大家可以打印出来看一下
          now = new Date(+now - 2000); // 延迟几秒存储一次？
        }
        return res;
      })();
      const dataOne = (function() { // 5个随机数，大家可随意定义
        let res = [];
        let len = 5;
        while (len--) {
          res.push(Math.round(Math.random() * 1000));
        }
        return res;
      })();
      const dataTwo = (function() { // 5个随机数
        let res = [];
        let len = 5;
        while (len--) {
          res.push(Math.round(Math.random() * 1000));
        }
        return res;
      })();
      //配置项，可以去查一下官方文档
      let options = {
        title: {
          text: "动态",
          textStyle: {
            color: "black"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56"
            }
          }
        },
        legend: {},
        xAxis: {
          type: "category",
          data: time, // 把时间组成的数组接过来，放在x轴上
          boundaryGap: true
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: dataOne,
            type: "line",
            name: "测试一",
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            data: dataTwo,
            name: "测试二",
            type: "line",
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      };
      setInterval(function() {
        let nowTime = new Date().toLocaleTimeString().replace(/^\D*/, "");
        time.shift();
        time.push(nowTime);
        dataOne.shift();
        dataOne.push(Math.round(Math.random() * 1000));
        dataTwo.shift();
        dataTwo.push(Math.round(Math.random() * 1000));
        console.log(dataOne);
        //很多朋友可能要接后端接口,把数据替换下来既可以了
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
              data: dataOne
            },
            {
              data: dataTwo
            }
          ]
        });
      }, 2000);
      myChart.setOption(options);
    }
  }
};
</script>
