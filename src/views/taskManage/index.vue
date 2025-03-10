<template>
  <div class="body-container">
    <!--上部分容器-->
    <div class="top-container">
      <a-input-search class="search-container" placeholder="请输入需提取事件" size="large" @search="onSearch">
        <a-button slot="enterButton" type="dashed">
          <svg-icon icon="nlp" :size="20" />
          Transfer
        </a-button>
      </a-input-search>
    </div>

    <div v-show="listShow" class="table-transfer">
      <transfer-table ref="transferTable" class="table-list" />
    </div>

    <div class="word-container">
      <word-graph class="chart-line" />
    </div>

    <!--下部分容器-->
    <div class="bottom-container">
      <!--      <a-card title="事件占比统计" class="left-box">-->
      <!--        <pie-one class="chart-line"></pie-one>-->
      <!--      </a-card>-->
      <!--      <a-card title="事件数量统计" class="right-box">-->
      <!--        <line-one class="chart-line"></line-one>-->
      <!--      </a-card>-->
      <a-card title="今日事件" class="table-list">
        <task-table />
      </a-card>
    </div>
  </div>
</template>

<script>
import { pieOne, lineOne, lineTwo, surroundGraph } from './components';
import TaskTable from '@/views/taskManage/components/taskTable';
import WordGraph from '@/views/taskManage/components/wordGraph';
import TransferTable from '@/views/taskManage/components/transferTable';
import axios from 'axios';

const AMonthToken = process.env.VUE_APP_NLPTOKEN;
export default {
  name: 'index',
  components: {
    TransferTable,
    WordGraph,
    TaskTable,
    surroundGraph,
    lineOne,
    lineTwo,
    pieOne
  },
  data() {
    return {
      listShow: false
    };
  },
  methods: {
    onSearch(value) {
      this.listShow = !this.listShow;
      this.onTransfer(value);
      this.$refs.transferTable.clearData();
    },
    onTransfer(textRecords) {
      axios
        .post('https://aip.baidubce.com/rpc/2.0/nlp/v1/address?access_token=' + AMonthToken + '&text=' + textRecords)
        .then(res => {
          this.$refs.transferTable.getNLPData(res.data);
          //console.log(this.afterTransferContent.person)
          // this.afterTransferContent=new TableModel(1,res.data.log_id,"二级", res.data.person,
          //   res.data.city+res.data.county+res.data.town,this.getCurrentTime(),"🔴待处理",res.data.person,"未知")
          // alert(this.afterTransferContent.address)
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.body-container {
  padding: 10px;
  border: none;
  margin: 0 auto;

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

    .search-container {
      border: none;
      width: 800px;
      margin-top: 60px;
    }
  }

  .word-container {
    border: none;
    height: 100px;
    width: 600px;
    //background-color: #1afa29;
    padding: 10px;
    //居中
    margin: 0 auto;
    display: flex;
    justify-content: center;
    .chart-line {
      height: 80px;
      width: 100%;
    }
  }

  .table-transfer {
    border: none;
    height: 120px;
    width: 100%;
    //background-color: #e54f4f;
    //居中
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    .table-list {
      border: none;
      width: 1500px;
      height: 30px;
    }
  }
}
</style>
