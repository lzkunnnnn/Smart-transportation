<template>
  <!--  <a-card class="body-container">-->
  <!--    -->
  <!--  </a-card>-->
  <div class="body-container">
    <div class="search" style="text-align: center; margin-bottom: 50px">
      <a-input v-model="eventId" placeholder="请输入事件编号" style="width: 300px"></a-input>
      <a-button type="primary" icon="el-icon-search" @click="initData(eventId)">分析</a-button>
    </div>
    <div class="event-container">
      <a-card class="event-board">
        <event-board :eventBoardInfo="event" class="board-line"></event-board>
      </a-card>
      <a-card class="graph-list">
        <relation-chart :links="links" :data="data" class="chart-graph"></relation-chart>
      </a-card>
    </div>
  </div>
</template>

<script>
// import CorrGraph from "@/views/correlation/components/corrGraph";
import { relationChart, eventBoard } from './components';
import resize from '@/mixins/resize';
import axios from '@/store/axios';

const colorList = [
  '#28CAD8',
  '#E5A214',
  '#F69F73',
  '#ff7f50',
  '#87cefa',
  '#da70d6',
  '#32cd32',
  '#6495ed',
  '#ff69b4',
  '#cd5c5c',
  '#1e90ff',
  '#ff6347',
  '#7b68ee',
  '#6b8e23',
  '#4ea397',
  '#b8860b',
  '#7bd9a5'
];
export default {
  name: 'graph',
  mixins: [resize],
  components: { eventBoard, relationChart },
  data() {
    return {
      option: '',
      eventId: '',
      event: {},
      links: [],
      data: []
    };
  },
  inject: ['reload'],
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
          this.data = res.data.data.items;
          console.log(res.data.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
    // TO DO 后期转为从数据库Event表中取
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
    height: 650px;
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
