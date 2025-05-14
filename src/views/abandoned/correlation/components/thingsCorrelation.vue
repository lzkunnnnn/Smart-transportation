<template>
  <div class="body-container">
    <div>
      <a-card class="top-container">
        <a-row class="formGraph-container" :gutter="15">

          <a-col :span="10" class="">
            <a-table :dataSource="tableData" :columns="columns">
                  <span slot="operation">
                     <a-button type="primary" @click="sendKey(id)">分析</a-button>
                  </span>
            </a-table>
          </a-col>

          <a-col :span="12">
            <thing-corr-graph class="chart-line"></thing-corr-graph>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script>

import ThingCorrGraph from "@/views/correlation/components/thingCorrGraph";
export default {
  name: "thingsCorrelation",
  components: { ThingCorrGraph },
  data() {
    return {
      tableData: [{
        key: "1",
        id: "0254",
        deviceType:"烟感系统",
        type: "❌报警",
        level: "一级",
        address: "1号楼",
        time: "2021-05-11 11:31",
      },
        {
          key: "4",
          id: "0369",
          deviceType:"红外系统",
          type: "‼️预警",
          level: "二级",
          address: "1号楼",
          time: "2021-05-11 11:31",
        },
      ],
      columns: [
        {
          title: "事件编号",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "设备类型",
          dataIndex: "deviceType",
          key: "deviceType"
        },
        {
          title: "类型",
          dataIndex: "type",
          key: "type"
        },
        {
          title: "风险等级",
          dataIndex: "level",
          key: "level"
        },
        {
          title: "位置",
          dataIndex: "address",
          key: "address"
        },
        {
          title: "报警时间",
          dataIndex: "time",
          key: "time"
        },
        {
          title: '操作',
          key: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ],
      loading: false,
      selectValue: [],

    };
  },
  methods:{
    sendKey(tableData){
      for (let i = 0; i < tableData.length; i++) {
        this.$emit('sendKey', tableData[i].id);
        console.log(tableData[i].id);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.body-container {
  padding: 10px;
  border: none;
  margin: 0 auto;
.top-container {
  border: none;
  width: 99%;

.formGraph-container {
  height: 500px;
  box-sizing: border-box;

.chart-line {
  height: 450px;
  width: 100%;
}

}
}
}
</style>