<template>
  <div>
    <a-table :columns="columns" :data-source="data" @change="handleChange" >
    <span slot="operation">
      <a>处理</a>
      <a-divider type="vertical" />
      <a>详情</a>
    </span>
    </a-table>
  </div>
</template>
<script>

export default {
  data() {
    return {
      data,
      filteredInfo: null,
      sortedInfo: null,
    };
  },
  computed: {
    columns() {
      let { sortedInfo, filteredInfo } = this;
      sortedInfo = sortedInfo || {};
      filteredInfo = filteredInfo || {};
      const columns = [
        {
          title: '传感器编号',
          dataIndex: 'id',
          key: 'id',
          sorter: (a, b) => a.id - b.id,
          sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
        },
         {
          title: "类型",
          dataIndex: "deviceType",
          key: "deviceType",
          filters: [
            { text: '烟感系统', value: '烟感系统' },
            { text: '电气系统', value: '电气系统' },
            { text: '消防系统', value: '消防系统' },
            { text: '红外系统', value: '红外系统' },
          ],
          onFilter: (value, record) => record.address.indexOf(value) === 0,
          sortDirections: ['descend'],
        },
        {
          title: "状态",
          dataIndex: "type",
          key: "type",
          filters: [
            { text: '❌报警', value: '❌报警' },
            { text: '⚠️故障', value: '⚠️故障' },
            { text: '‼️预警', value: '‼️预警' },
          ],
          filteredValue: filteredInfo.type || null,
          onFilter: (value, record) => record.type.includes(value),
          sortOrder: sortedInfo.columnKey === 'type' && sortedInfo.order,
          ellipsis: true,
        },
        {
            title: "风险等级",
            dataIndex: "level",
            key: "level",
             filters: [
            { text: '一级', value: '一级' },
            { text: '二级', value: '二级' },
            { text: '三级', value: '三级' },
          ],
          filteredValue: filteredInfo.level || null,
          onFilter: (value, record) => record.level.includes(value),
          sortOrder: sortedInfo.columnKey === 'level' && sortedInfo.order,
          ellipsis: true,
        },
        {
          title: '地址',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: "报警时间",
          dataIndex: "time",
          key: "time",
          sorter: (a, b) => a.time.length - b.time.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: "处理时间",
          dataIndex: "endTime",
          key: "endTime",
        },
        {
          title: "状态",
          dataIndex: "status",
          key: "status",
           filters: [
            { text: '🔴待处理', value: '🔴待处理' },
            { text: '🟢已处理', value: '🟢已处理' },
          ],
          filteredValue: filteredInfo.status || null,
          onFilter: (value, record) => record.status.includes(value),
          sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
          ellipsis: true,
        },
        {
          title: '操作',
          key: 'operation',
          scopedSlots: { customRender: 'operation' },
        },


      ];
      return columns;
    },
  },
  methods: {
    handleChange(pagination, filters, sorter) {
      console.log('Various parameters', pagination, filters, sorter);
      this.filteredInfo = filters;
      this.sortedInfo = sorter;
    },
    clearFilters() {
      this.filteredInfo = null;
    },
    clearAll() {
      this.filteredInfo = null;
      this.sortedInfo = null;
    },
    setAgeSort() {
      this.sortedInfo = {
        order: 'descend',
        columnKey: 'age',
      };
    },
  },
};
const data=[
  {
        key: "1",
        id: "001",
        deviceType:"烟感系统",
        type: "❌报警",
        level: "一级",
        address: "1号楼",
        time: "2021-05-11 11:31",
        endTime:"未知",
        status: "🔴待处理",
        operation: "详情"
      },
        {
          key: "2",
          id: "002",
          deviceType:"电气系统",
          type: "⚠️故障",
          level: "二级",
          address: "1号楼",
          time: "2021-05-11 11:31",
          endTime:"未知",
          status: "🔴待处理",
          operation: "详情"
        },
        {
          key: "3",
          id: "003",
          deviceType:"消防系统",
          type: "⚠️故障",
          level: "五级",
          address: "1号楼",
          time: "2021-05-11 11:31",
          endTime:"2021-05-11 12:31",
          status: "🟢已处理",
          operation: "详情"
        },
        {
          key: "4",
          id: "004",
          deviceType:"红外系统",
          type: "‼️预警",
          level: "二级",
          address: "1号楼",
          time: "2021-05-11 11:31",
          endTime:"未知",
          status: "🔴待处理",
          operation: "详情"
        },
];
</script>
<style scoped>
.table-operations {
  margin-bottom: 16px;
}
.table-operations > button {
  margin-right: 8px;
}
</style>