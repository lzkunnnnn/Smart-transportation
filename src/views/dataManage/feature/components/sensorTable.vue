<template>
  <a-table :dataSource="tableData" :columns="columns">
  </a-table>
</template>

<script>
import standardTable from "@/components/standardTable/index";

export default {
  name: "sensorTable",
  components: { standardTable },

  data() {
    return {
      tableData: [{
        key: "1",
        id: "001",
        type: "❗️报警",
        level: "一级",
        address: "1号楼",
        time: "2021-05-11 11:31",
        status: "待处理",
        operation: "详情"
      },
        {
          key: "2",
          id: "002",
          type: "⚠️故障",
          level: "二级",
          address: "1号楼",
          time: "2021-05-11 11:31",
          status: "待处理",
          operation: "详情"
        }],
      columns: [
        {
          title: "传感器编号",
          dataIndex: "id",
          key: "id"
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
          title: "状态",
          dataIndex: "status",
          key: "status"
        },
        {
          title: "操作",
          dataIndex: "operation",
          key: "operation"
        }
      ],
      loading: false,
      selectedRowKeys: [],
      selectValue: [],
      currentEdit: {},
      editShow: false,
      filterList: {
        name: "",
        status: "",
        page: 1,
        size: 15,
        total: 0
      },
      deleteLoading: false,
      exportLoading: false
    };
  }
};
</script>
<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  .filter-wrapper {
    width: 230px;

    .label {
      min-width: 80px;
    }

    .select-width {
      width: 150px;
    }
  }
}
</style>
