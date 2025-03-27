<template>
  <div class="index-container border-box">
    <!--左边容器-->
    <div class="index-left-container">
      <!--卡片组-->
      <a-card class="box1">
        <card-one :cardList="cardList" class="chart-bar"></card-one>
      </a-card>

      <a-card title="当前设备状态" class="box2">
        <device-status class="chart-line"></device-status>
      </a-card>

      <a-card class="box3">
        <calender-chart class="calender"></calender-chart>
        <!--         <alarm-diagram class="chart-diagram"></alarm-diagram> -->
      </a-card>
    </div>

    <!--中间容器-->
    <div class="index-mid-container">
      <a-card class="box3">
        <surround-graph class="chart-line"></surround-graph>
        <!--           <word-graph class="chart-line"></word-graph> -->

        <!--         <check-maintenance /> -->
      </a-card>

      <a-card class="box6">
        <div class="location">
          <div class="address">
            <span>{{ location.address }}</span>
          </div>
          <div class="lng">
            <span>经度 {{ location.lng?.toFixed(4) }}</span>
          </div>
          <div class="lat">
            <span>纬度 {{ location.lat?.toFixed(4) }}</span>
          </div>
        </div>
        <center-map-one @location="handleLocation" class="chart-map"></center-map-one>
      </a-card>
    </div>

    <!--右边容器-->
    <div class="index-right-container">
      <a-card title="报警类型统计及占比分析" class="box4">
        <alarm-pie class="chart-line"></alarm-pie>
      </a-card>

      <a-card title="事件推送" class="box5">
        <things-push :taskPushList="taskPushList" class="char-line"></things-push>
        <!-- <alarm-category :alarmCategoryList="alarmCategoryList" class="chart-line" /> -->
      </a-card>

      <!--       <a-card title="异常发生趋势图--待删除" class="box3">
        <anomaly-line :anomalyDataList="anomalyDataList" class="chart-line"></anomaly-line>
      </a-card> -->
    </div>
  </div>
</template>

<script>
//这一堆图用echarts做的，必须显示设置宽高才会显示
import {
  anomalyLine,
  thingsPush,
  alarmDiagram,
  deviceStatus,
  alarmPie,
  calenderChart,
  wordGraph,
  surroundGraph
} from './components';

import CenterMapOne from '@/views/index/components/centerMapOne';
/* import AlarmCategory from '@/views/index/components/alarmCategory'; */
/* import CheckMaintenance from '@/views/index/components/checkMaintenance'; */
import CardOne from '@/views/index/components/cardOne';

export default {
  name: 'mapChart',
  components: {
    CardOne,
/*     CheckMaintenance, */
    /*   AlarmCategory, */
    CenterMapOne,
    calenderChart,
/*     alarmDiagram, */
    deviceStatus,
    surroundGraph,
/*     anomalyLine, */
    thingsPush,
    alarmPie,
/*     wordGraph */
  },
  data() {
    return {
      cardList: { deviceNum: 0, onlineNum: 0, abnormalNum: 0 },
      deviceState: {},
      taskPushList: [],
      anomalyDataList: {},
      alarmCategoryList: [],
      location: {}
    };
  },
  mounted() {
    this.$store.dispatch('asyncGetHandleList');
  },
  methods: {
    handleLocation(location) {
      this.location = location;
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
  .index-left-container,
  .index-right-container {
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
      .calender {
        height: 300px;
      }

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
      height: 730px;

      .chart-line {
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
      height: 730px;
      margin-top: 10px;
      .chart-map {
        width: 100%;
        height: 650px;
      }
      .location {
        display: flex;
        height: 30px;
        margin-bottom: 10px;
        .address {
          flex-basis: 300px;
          margin-right: auto;
        }
        .lat,
        .lng {
          flex-basis: 120px;
        }
        .address,
        .lat,
        .lng {
          background-color: #182030;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 30px;
        }
      }
    }

    .box3 {
      border: none;
      height: 300px;
      .chart-line {
        height: 260px;
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
