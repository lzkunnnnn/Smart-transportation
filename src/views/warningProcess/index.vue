<template>
  <div class="body-container">
    <div>
      <a-card class="top-container">
        <sale-title @sendDayTitle="getCurrentName">
          <template slot="title"> {{ currentName }}</template>
        </sale-title>

        <a-row class="sale-container" :gutter="16">
          <a-col :span="12" style="height: 100%">
            <div class="shop-title">{{ currentName }}警报统计</div>
            <level-rank :handleList="$store.state.handleList" style="height: calc(100% - 50px)" :rankData="rankData" />
          </a-col>

          <a-col :span="12" style="height: 100%">
            <event-bar class="chart-line"></event-bar>
          </a-col>
        </a-row>

        <a-row class="sale-container" :gutter="16">
          <div class="shop-title">{{ currentName }}警报事件</div>
          <event-board @handled="update()"></event-board>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script>
import { eventBoard, levelRank, saleTitle, eventBar } from './components';

export default {
  name: 'index',
  components: {
    levelRank,
    saleTitle,
    eventBoard,
    eventBar
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
