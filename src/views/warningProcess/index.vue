<template>
  <div class="body-container">
    <div>
      <a-card class="top-container">
        <sale-title @sendDayTitle="getCurrentName">
          <template slot="title"> {{ currentName }}</template>
        </sale-title>
        <a-row class="sale-container" :gutter="16">
          <a-col :span="16" style="height: 100%; overflow: scroll">
            预测图 警报统计: {{ $store.state.handleList }} <br />
            <!--    <anomaly-line class="chart-line"></anomaly-line> -->
            <!--            <line-chart :chartData="lineData" :title="currentName" />-->
          </a-col>
          <a-col :span="8" style="height: 100%">
            <div class="shop-title">{{ currentName }}警报统计</div>
            <level-rank :handleList="$store.state.handleList" style="height: calc(100% - 50px)" :rankData="rankData" />
          </a-col>
        </a-row>
        <a-row class="sale-container" :gutter="16">
          <div class="shop-title">{{ currentName }}警报事件</div>
          <sensor-table @handled="update()"></sensor-table>
        </a-row>
      </a-card>
    </div>
    <!--    &lt;!&ndash;下部分容器&ndash;&gt;-->
    <!--    <div>-->
    <!--      <a-card title="今日报警" class="top-container">-->
    <!--        <sensor-table></sensor-table>-->
    <!--      </a-card>-->

    <!--      &lt;!&ndash;      <a-card title="报警占比统计" class="left-box">&ndash;&gt;-->
    <!--      &lt;!&ndash;        <pie-one class="chart-line"></pie-one>&ndash;&gt;-->
    <!--      &lt;!&ndash;      </a-card>&ndash;&gt;-->
    <!--      &lt;!&ndash;      <a-card title="报警预测" class="mid-box">&ndash;&gt;-->
    <!--      &lt;!&ndash;        <line-two class="chart-line"></line-two>&ndash;&gt;-->
    <!--      &lt;!&ndash;      </a-card>&ndash;&gt;-->
    <!--      &lt;!&ndash;      <a-card title="历史报警数量统计" class="right-box">&ndash;&gt;-->
    <!--      &lt;!&ndash;        <line-one class="chart-line"></line-one>&ndash;&gt;-->

    <!--      &lt;!&ndash;      </a-card>&ndash;&gt;-->
    <!--    </div>-->
  </div>
</template>

<script>
import { sensorTable, pieOne, lineOne, lineTwo } from './components';
import SaleTitle from '@/views/warningProcess/components/saleTitle';
import LevelRank from '@/views/warningProcess/components/levelRank';
import AnomalyLine from '@/views/warningProcess/components/anomalyLine';
import axios from '@/store/axios';
export default {
  name: 'index',
  components: {
    AnomalyLine,
    LevelRank,
    SaleTitle,
    lineOne,
    lineTwo,
    pieOne,
    sensorTable
  },
  data() {
    return {
      currentName: '今日'
    };
  },
  mounted() {
    this.$store.dispatch('asyncGetHandleList');
    /* axios.get('event/getHandleDTO').then(res => {
      this.handleList = res.data.data;
    }); */
  },
  methods: {
    update() {
      this.$store.dispatch('asyncGetHandleList');
    },
    getTitle(title, key) {
      if (title == this.currentName) {
        return;
      }
      this.currentName = title;
      this.currentKey = key;
    },
    getCurrentName(title) {
      this.currentName = title;
    }
  }
};
</script>
<style lang="scss" scoped>
.body-container {
  padding: 10px;
  border: none;
  margin: 0 auto;

  .sale-card {
    .sale-container {
      margin: 24px 0;
      height: 350px;
      box-sizing: border-box;
      padding: 0 24px;

      .shop-title {
        height: 50px;
        font-size: 1rem;
      }
    }
  }

  .top-container {
    border: none;
    margin: 10px;
    width: 99%;

    .sale-container {
      margin: 24px 0;
      height: 350px;
      box-sizing: border-box;
      padding: 0 24px;

      .chart-line {
        height: 350px;
        width: 100%;
      }

      .shop-title {
        height: 50px;
        font-size: 1rem;
      }
    }
  }

  .bottom-container {
    border: none;
    height: 600px;
    display: flex;

    .chart-line {
      height: 200px;
      width: 100%;
    }

    .chart-bar {
      height: 200px;
      width: 100%;
    }

    .left-box {
      margin: 10px;
      border: none;
      height: 300px;
      width: 33%;
    }

    .mid-box {
      margin: 10px;
      border: none;
      height: 300px;
      width: 33%;
    }

    .right-box {
      margin: 10px;
      border: none;
      height: 300px;
      width: 33%;
    }
  }
}
</style>
