<template>
  <div class="body-container">
    <div class="left-container">
      <a-card class="table-list">
        <event-list></event-list>
      </a-card>
    </div>
    <div class="right-container">
      <a-card class="percentage">
        <progress-chart :progressList="progressList" class="progress"></progress-chart>
      </a-card>

      <div class="search-container">
        <div class="search" style="text-align: center">
          <a-input v-model="eventId" placeholder="请输入事件编号" style="width: 300px"></a-input>
          <a-button type="primary" icon="el-icon-search" @click="initData(eventId)">关联分析</a-button>
        </div>

        <a-card class="graph-list">
          <relation-chart :links="links" :data="items" class="chart-graph"></relation-chart>
        </a-card>
      </div>
    </div>
  </div>
</template>
<script>
import { eventList, relationChart, progressChart } from './components';
import axios from '@/store/axios.js';
export default {
  name: 'merge',
  components: {
    eventList,
    relationChart,
    progressChart
  },
  data() {
    return {
      links: [],
      items: [],
      event: {},
      progressList: [
        /*         { title: '流量检测', value: 50, status: 'active' },
        { title: '违停抓拍', value: 60, status: 'active' },
        { title: '区间测速', value: 20, status: 'active' },
        { title: '卡口摄像', value: 70, status: 'active' },
        { title: '车道监测', value: 40, status: 'active' },
        { title: '环境监测', value: 60, status: 'active' } */
      ]
    };
  },
  mounted() {
    this.$store.dispatch('asyncGetAlarmEvents');
    this.$store.dispatch('asyncGetHandleList');
    this.progressList = [
      (this.$store.state.handleList.parkNum / this.$store.state.alarmEvents.length) * 100,
      (this.$store.state.handleList.checkNum / this.$store.state.alarmEvents.length) * 100,
      (this.$store.state.handleList.flowNum / this.$store.state.alarmEvents.length) * 100,
      (this.$store.state.handleList.speedNum / this.$store.state.alarmEvents.length) * 100,
      (this.$store.state.handleList.laneNum / this.$store.state.alarmEvents.length) * 100,
      (this.$store.state.handleList.environmentNum / this.$store.state.alarmEvents.length) * 100
    ];
  },
  methods: {
    initData(eventId) {
      axios.get('event/getEvent', { params: { id: eventId } }).then(res => {
        this.event = res.data.data;
        this.getRelation(eventId);
      });
    },
    getRelation(eventId) {
      axios
        .get('relation/getRelation', { params: { id: eventId } })
        .then(res => {
          this.links = res.data.data.links;
          this.items = res.data.data.items;
          console.log(res.data.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }
};
</script>
<style scoped lang="scss">
.body-container {
  width: 100%;
  padding: 10px;
  border: none;
  margin: 0px auto;
  display: flex;
  flex-direction: row;
  overflow: hidden;

  .left-container {
    flex-basis: 1000px;
    height: 800px;
    border: none;
    margin: 20px;
    .table-list {
      width: 1000px;
      height: 800px;
      border: none;
    }
  }

  .right-container {
    margin: 20px;
    flex-grow: 1;
    height: 800px;
    //background-color: #e54f4f;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-content: start;

    .percentage {
      width: 100%;
      height: 240px;
      border: none;
      border-radius: 10px;
      padding: 0px;
    }
    .progress {
      height: 220px;
    }

    .search-container {
      width: 100%;
      height: 560px;
      .search {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
      }

      .graph-list {
        flex-grow: 1;
        border-radius: 10px;
        border: none;
        width: 100%;
        height: 510px;
        margin: 0 8px;
        .chart-graph {
          height: 480px;
        }
      }
    }
  }
}
</style>
