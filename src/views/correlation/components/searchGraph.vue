<template>
  <div class="kgContainer">
    <div class="alert alert-info" role="alert" style="margin-bottom: 20px;">
      <h1>Prompt</h1>
      <font size="4">输入你想要搜索的知识</font>
    </div>
    <div class="search" style="text-align: center;margin-bottom: 50px;">
      <a-input v-model="entityName" placeholder="请输入内容" style="width: 400px;"></a-input>
      <a-button type="primary" icon="el-icon-search" @click="initData">搜索</a-button>
      <a-input v-model="form.entityFrom" placeholder="请输入内容" style="width: 100px;"></a-input>
      <a-input v-model="form.relation" placeholder="请输入内容" style="width: 100px;"></a-input>
      <a-input v-model="form.entityTo" placeholder="请输入内容" style="width: 100px;"></a-input>
      <a-button type="primary" icon="el-icon-search" @click="add">添加</a-button>
    </div>
    <div class="kgShow" id="kgShow" style="width: 100%;">

    </div>

    <!--<div class="test" id="tst" style="width: 100%;height: 500px;"></div>-->
  </div>
</template>

<script>
var echarts = require('echarts');
export default {
  data() {
    return {
      entityName: '',
      option: '',
      form: {
        entityFrom: '',
        relation: '',
        entityTo: ''
      },
      nodes: [],
      relationships: []
    }
  },
  mounted() {
    this.initData()
    this.tst()
  },
  inject: ['reload'],
  methods: {
    initData() {
      this.$store.dispatch('kg/search', this.entityName).then(response => {
        const nodes = response.nodes
        const relationship = response.relationships
        const nodesList = []
        for(let i = 0; i < nodes.length; i++) {
          const tmp = {
            name: nodes[i],
            symbolSize: 50,
            itemStyle: {
              normal: {
                show: true,
              }
            }
          }
          nodesList.push(tmp)
        }

        const links = []
        for(let i = 0; i < relationship.length; i++) {
          const relationshipArray = relationship[i].split("-")
          const tmp = {
            source: relationshipArray[0],
            target: relationshipArray[2],
            name: relationshipArray[1]
          }
          links.push(tmp)
        }

        const option = {
          title: {
            text: '雪中悍刀行'
          },
          tooltip: {
            formatter: function(x) {
              return x.data.name;
            }
          },
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [{
            type: 'graph',
            layout: 'force',
            symbolSize: 80,
            roam: true,
            label: {
              normal: {
                show: true,
              }
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              normal: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            force: {
              repulsion: 3000, //斥力
              edgeLength: [20, 80] //默认距离
            },
            //            layout:'circular',
            draggable: true,
            lineStyle: {
              normal: {
                width: 2,
                color: '#4b565b',
                curveness: 0.2,
                length: 20
              }
            },
            edgeLabel: {
              normal: {
                show: true,
                formatter: function(x) {
                  return x.data.name;
                }
              }
            },
            data: nodesList,
            links: links
          }]
        }
        this.option = option

        this.showKg()
      })
    },
    add() {
      this.$store.dispatch('kg/save', this.form).then(response => {
        if(response.status == 200) {
          this.$message({
            message: response.msg,
            type: 'success'
          })

          this.reload()
        }
      })
    },
    getInfo(params) {
      alert(params)
    },
    showKg() {
      const kgShow = document.getElementById('kgShow')
      const myChart = echarts.init(kgShow, 'light')
      myChart.setOption(this.option)

      let data = myChart._model.option.series[0].data;
      myChart.on("click", (chartParam) => {
        //        console.log(myChart._model)
        //        console.log(chartParam)
        const entityName = data[chartParam.dataIndex].name
        this.entityName = entityName
        this.initData()
      });

      myChart.on("mouseover", (chartParam) => {
        console.log(chartParam)
      })

    }
  }
}
</script>

<style>
.kgContainer {
  width: 100%;
  background-color: #FFFFFF;
  padding: 32px;
}

.kgShow {
  width: 100%;
  height: 500px;
}
</style>
