<template>
  <!--  <a-card class="body-container">-->
  <!--    -->
  <!--  </a-card>-->
  <div class="body-container">
    <div class="search" style="text-align: center;margin-bottom: 50px;">
      <a-input v-model="entityName" placeholder="请输入事件编号" style="width: 300px;"></a-input>
      <a-button type="primary" icon="el-icon-search" @click="initData">分析</a-button>
      <a-input v-model="form.labelName" placeholder="事件编号" style="width: 150px;"></a-input>
      <a-input v-model="form.entityFrom" placeholder="节点Node1" style="width: 150px;"></a-input>
      <a-input v-model="form.relation" placeholder="输入添加关系" style="width: 150px;"></a-input>
      <a-input v-model="form.entityTo" placeholder="节点Node2" style="width: 150px;"></a-input>
      <a-button type="primary" icon="el-icon-search" @click="add">添加</a-button>
    </div>
    <div class="event-container">
      <a-card class="event-board">
        <event-board :eventBoardInfo="eventBoardInfo" class="board-line"></event-board>
      </a-card>
      <a-card class="graph-list">
        <div class="chart-graph" style="height:700px" ref="corrGraph"></div>
      </a-card>
    </div>
  </div>
</template>

<script>
// import CorrGraph from "@/views/correlation/components/corrGraph";
import eventBoard from "@/views/correlation/components/eventBoard";
import resize from "@/mixins/resize";
import echarts from "echarts";
import { getCorrGraphByEventID, addCorrelation, getCorrGraphBySonName } from "@/api/correAnalysis";
import axios from "axios";

const colorList = [
  "#28CAD8",
  "#E5A214",
  "#F69F73",
  "#ff7f50",
  "#87cefa",
  "#da70d6",
  "#32cd32",
  "#6495ed",
  "#ff69b4",
  "#cd5c5c",
  "#1e90ff",
  "#ff6347",
  "#7b68ee",
  "#6b8e23",
  "#4ea397",
  "#b8860b",
  "#7bd9a5"
];
export default {
  name: "graph",
  mixins: [resize],
  components: { eventBoard },
  data() {
    return {
      option: "",
      entityName: "",
      form: {
        labelName: "",
        entityFrom: "",
        relation: "",
        entityTo: ""
      },
      nodes: [],
      relationships: [],
      eventBoardInfo: {
        eventID:"",
        eventType:"",
        eventContent:"",
        eventLocation:"",
        eventTime:"",
        eventExtraInfo:""
      }
    };
  },
  created() {
    this.initData();
  },
  inject: ["reload"],
  methods: {

    // TO DO 后期转为从数据库Event表中取
    initBoard(){
      axios.get("http://127.0.0.1:4523/m2/826649-0-default/24959920").then(resp=>{
        console.log(resp.data.data.riskLevelText)
          this.eventBoardInfo.eventID = this.entityName.split("-")[0]
          this.eventBoardInfo.eventType = resp.data.data.riskLevelText
          this.eventBoardInfo.eventContent = resp.data.data.content
          this.eventBoardInfo.eventLocation = resp.data.data.location
          this.eventBoardInfo.eventTime = resp.data.data.createDate
          this.eventBoardInfo.eventExtraInfo = resp.data.data.statusText
      })
    },

    initData() {
      if (this.entityName=="0254"){
        this.initBoard()
      }

      if (this.entityName=="" || this.checknumber(this.entityName)){
        this.initData1()
      }else{
        this.initData3()
      }
    },
    initData1() {
      //axios.get("http://localhost:8080/correlation-analysis/getEventByName?entityName="+this.entityName).then(resp => {
      getCorrGraphByEventID(this.entityName).then(resp => {
        const nodes = resp.data.nodes;
        const relationship = resp.data.relationships;

        const nodesList = [];
        for (let i = 0; i < nodes.length; i++) {
          const tmp = {
            name: nodes[i],
            symbolSize: 50,
            itemStyle: {
              normal: {
                show: true
              }
            }
          };
          nodesList.push(tmp);
        }

        const links = [];
        for (let i = 0; i < relationship.length; i++) {
          const relationshipArray = relationship[i].split("-");
          const tmp = {
            source: relationshipArray[0],
            target: relationshipArray[2],
            name: relationshipArray[1]
          };
          links.push(tmp);
        }
        const option = {
          title: {
            text: this.entityName + " 事件分析图谱",
            textStyle: {
              color: "#ccc"
            }
          },
          tooltip: {
            formatter: function(x) {
              return x.data.name;
            }
          },
          animationDurationUpdate: 1500,
          animationEasingUpdate: "quinticInOut",
          series: [
            {
              type: "graph",
              layout: "force",
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
                    // return x.data.relation.name;
                    return x.data.name;
                  }
                }
              },
              edgeSymbol: ["circle", "arrow"],
              itemStyle: {
                shadowColor: "rgba(133,203,247,0.75)",
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
              links: links,
              data: nodesList
            }
          ]
          // animationDurationUpdate: index => {
          //   return index * 100;
          // },
          // animationEasingUpdate: 'bounceIn',
        };

        this.option = option;
        this.showGraph();
        this.form.labelName = this.entityName.split("-")[0];
      });
    },
    initData2(name) {
      //axios.get("http://localhost:8080/correlation-analysis/getEventByName?entityName="+this.entityName).then(resp => {
      getCorrGraphByEventID(name).then(resp => {
        const nodes = resp.data.nodes;
        const relationship = resp.data.relationships;

        const nodesList = [];
        for (let i = 0; i < nodes.length; i++) {
          const tmp = {
            name: nodes[i],
            symbolSize: 50,
            itemStyle: {
              normal: {
                show: true
              }
            }
          };
          nodesList.push(tmp);
        }

        const links = [];
        for (let i = 0; i < relationship.length; i++) {
          const relationshipArray = relationship[i].split("-");
          const tmp = {
            source: relationshipArray[0],
            target: relationshipArray[2],
            name: relationshipArray[1]
          };
          links.push(tmp);
        }
        const option = {
          title: {
            text: this.entityName + " 事件分析图谱",
            textStyle: {
              color: "#ccc"
            }
          },
          tooltip: {
            formatter: function(x) {
              return x.data.name;
            }
          },
          animationDurationUpdate: 1500,
          animationEasingUpdate: "quinticInOut",
          series: [
            {
              type: "graph",
              layout: "force",
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
                    // return x.data.relation.name;
                    return x.data.name;
                  }
                }
              },
              edgeSymbol: ["circle", "arrow"],
              itemStyle: {
                shadowColor: "rgba(133,203,247,0.75)",
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
              links: links,
              data: nodesList
            }
          ]
          // animationDurationUpdate: index => {
          //   return index * 100;
          // },
          // animationEasingUpdate: 'bounceIn',
        };

        this.option = option;
        this.showGraph();
        this.form.labelName = this.entityName.split("-")[0];
      });
    },
    initData3() {
      //axios.get("http://localhost:8080/correlation-analysis/getEventByName?entityName="+this.entityName).then(resp => {
      getCorrGraphBySonName(this.entityName).then(resp => {
        const nodes = resp.data.nodes;
        const relationship = resp.data.relationships;

        const nodesList = [];
        for (let i = 0; i < nodes.length; i++) {
          const tmp = {
            name: nodes[i],
            symbolSize: 50,
            itemStyle: {
              normal: {
                show: true
              }
            }
          };
          nodesList.push(tmp);
        }

        const links = [];
        for (let i = 0; i < relationship.length; i++) {
          const relationshipArray = relationship[i].split("-");
          const tmp = {
            source: relationshipArray[0],
            target: relationshipArray[2],
            name: relationshipArray[1]
          };
          links.push(tmp);
        }
        const option = {
          title: {
            text: this.entityName.split("-")[0] + " 事件分析图谱",
            textStyle: {
              color: "#ccc"
            }
          },
          tooltip: {
            formatter: function(x) {
              return x.data.name;
            }
          },
          animationDurationUpdate: 1500,
          animationEasingUpdate: "quinticInOut",
          series: [
            {
              type: "graph",
              layout: "force",
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
                    // return x.data.relation.name;
                    return x.data.name;
                  }
                }
              },
              edgeSymbol: ["circle", "arrow"],
              itemStyle: {
                shadowColor: "rgba(133,203,247,0.75)",
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
              links: links,
              data: nodesList
            }
          ]
          // animationDurationUpdate: index => {
          //   return index * 100;
          // },
          // animationEasingUpdate: 'bounceIn',
        };

        this.option = option;
        this.showGraph();
        this.form.labelName = this.entityName.split("-")[0];
      });
    },

    add() {
      // axios.post("http://localhost:8080/correlation-analysis/saveEntity?labelName="+this.form.labelName+"&entityFrom="+this.form.entityFrom+
      //                 "&relation="+this.form.relation+"&entityTo="+this.form.entityTo)
      addCorrelation(this.form.labelName, this.form.entityFrom, this.form.relation, this.form.entityTo).then(resp => {
        if (resp.code == 200) {
          console.log("add");
        }
        // this.reload()
        this.initData2(this.form.labelName);
      });

    },
    checknumber (String) {
      var reg = /^[0-9]+.?[0-9]*$/
      if (reg.test(String)) {
        return true
      }
      return false
    },
    showGraph() {
      this.myChart = echarts.init(this.$refs.corrGraph);
      this.myChart.setOption(this.option);

      // let data = this.myChart._model.option.series[0].data;
      // this.myChart.on("click", (chartParam) => {
      //   //        console.log(myChart._model)
      //   //        console.log(chartParam)
      //   const entityName = data[chartParam.dataIndex].name
      //   this.entityName = entityName
      //   this.initData()
      // });
      //
      // this.myChart.on("mouseover", (chartParam) => {
      //   console.log(chartParam)
      // })

    }
  }
};
</script>

<style lang="scss" scoped>

.body-container {
  padding: 10px;
  border: none;
  margin: 20px;

  .bottom-container {
    border: none;
    margin: 20px;
    width: 100%;

    .table-list {
      border: none;
      width: 100%;
    }
  }

  .top-container {
    border: none;
    height: 200px;
    width: 100%;
    //background-color: #e54f4f;
    //居中
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
}

.event-container {
  display: flex;
  flex: 2;

  .event-board {
    border-radius: 10px;
    border: none;
    height: 500px;
    width: 20%;
    margin: 8px;

    .board-line {
      height: 600px;
      width: 100%;
    }
  }

  .graph-list {
    border-radius: 10px;
    border: none;
    width: 80%;
    margin: 8px;
    margin-bottom: 25px;

    .chart-graph {
      height: 600px;
    }
  }
}

</style>
