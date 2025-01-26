<template>
  <div class="index-container  border-box">
    <!--左边容器-->
    <div class="index-left-container">

      <!--卡片组-->
      <a-card class="box1">
        <card-one :cardList="cardList" class="chart-bar"></card-one>
      </a-card>

      <a-card title="异常发生趋势图" class="box2">
        <anomaly-line :anomalyDataList="anomalyDataList" class="chart-line"></anomaly-line>
      </a-card>

      <a-card title="近7日火警报警图" class="box3">
        <alarm-diagram class="chart-diagram"></alarm-diagram>
      </a-card>
    </div>

    <!--中间容器-->
    <div class="index-mid-container">
      <!--      <a-card class="box6">-->
      <!--        <center-map class="chart-map"></center-map>-->
      <!--      </a-card>-->
      <a-card class="box6">
        <center-map-one class="chart-map"></center-map-one>
      </a-card>

      <a-card title="事件推送" class="box3">
        <things-push :taskPushList="taskPushList" class="char-line"></things-push>
      </a-card>
    </div>

    <!--右边容器-->
    <div class="index-right-container">

      <a-card title="当前设备状态" class="box4">
        <device-status :deviceStatusList="deviceStatusList" class="chart-line"></device-status>
      </a-card>

      <a-card title="报警类型统计及占比分析" class="box5">
        <alarm-category :alarmCategoryList="alarmCategoryList" class="chart-line" />
      </a-card>

      <a-card title="巡检维保任务" class="box3">
        <check-maintenance />
      </a-card>
    </div>
  </div>
</template>

<script>
import { anomalyLine, thingsPush, alarmDiagram, deviceStatus } from "./components";
import CenterMapOne from "@/views/index/components/centerMapOne";
import AlarmCategory from "@/views/index/components/alarmCategory";
import CheckMaintenance from "@/views/index/components/checkMaintenance";
import CardOne from "@/views/index/components/cardOne";
import axios from "axios";

export default {
  name: "mapChart",
  components: {
    CardOne,
    CheckMaintenance,
    AlarmCategory,
    CenterMapOne,
    alarmDiagram,
    deviceStatus,
    anomalyLine,
    thingsPush
  },
  data() {
    return {
      cardList: {},
      deviceStatusList: {},
      taskPushList: [],
      anomalyDataList: {},
      alarmCategoryList: [],
    };
  },
  created() {
    this.getCardList();
    this.getDeviceStatusList();
    this.getTaskPushList();
    this.getAnomalyDataList();
    this.getAlarmCategoryList();
  },
  methods: {

    getCardList() {
      axios.get("http://127.0.0.1:4523/mock/826638/index/cardList").then(res => {
        this.cardList = res.data.data.cardList;
      });
    },
    getDeviceStatusList() {
      axios.get("http://127.0.0.1:4523/mock2/826649/17732395").then(res => {
        this.deviceStatusList = res.data.data.deviceStatusList;
      });
    },
    getTaskPushList() {
      axios.get("http://127.0.0.1:4523/m2/826649-0-default/17734714").then(res => {
        this.taskPushList = res.data.data.taskPushList;
      });
    },
    getAnomalyDataList() {
      axios.get("http://127.0.0.1:4523/mock/826649/anomalyDataList").then(res => {
        this.anomalyDataList = res.data.data.anomalyDataList;
        console.log(this.anomalyDataList);
      });
    },
    getAlarmCategoryList() {
      axios.get("http://127.0.0.1:4523/mock/826649/alarmCategoryList").then(res => {
        this.alarmCategoryList = res.data.data.alarmCategoryList;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.index-container {
  padding: 10px;
  height: 1200px;
  background: #f0f2f5;
  //居中
  margin: 0 auto;
  display: flex;
  //设置左右在页面的分数
  .index-left-container, .index-right-container {
    flex: 3;

    .box1 {
      border: none;
      height: 300px;
      margin: 10px;

      .chart-line {
        height: 280px;
        width: 100%;
      }

      .chart-bar {
        height: 270px;
        width: 100%;
      }
    }

    .box2 {
      border: none;
      height: 400px;
      margin: 10px;

      .chart-line {
        height: 300px;
        width: 100%;
      }
    }

    .box3 {
      border: none;
      height: 320px;
      margin: 10px;

      .chart-line {
        height: 250px;
        width: 100%;
      }

      .chart-diagram {
        height: 280px;
        width: 100%;
      }
    }

    .box4 {
      margin: 10px;
      border: none;
      height: 300px;

      .chart-line {
        height: 200px;
        width: 100%;
      }
    }

    .box5 {
      margin: 10px;
      border: none;
      height: 400px;

      .chart-diagram {
        height: 300px;
        width: 100%;
      }
    }
  }

  .index-mid-container {
    flex: 5;
    height: 1000px;
    margin: 10px;

    .box6 {
      border: none;
      height: 710px;

      .chart-map {
        width: 100%;
        height: 650px;
      }
    }

    .box3 {
      border: none;
      height: 320px;
      margin-top: 10px;

      .chart-line {
        height: 200px;
        width: 100%;
      }

      .chart-bar {
        //height: 200px;
        height: 200px;
        width: 100%;
      }
    }
  }
}

</style>
