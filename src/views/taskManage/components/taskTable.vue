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
          title: '事件编号',
          dataIndex: 'id',
          key: 'id',
          sorter: (a, b) => a.id - b.id,
          sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
        },
         {
          title: "事件类型",
          dataIndex: "taskType",
          key: "taskType",
          filters: [
            { text: '一级', value: '一级' },
            { text: '二级', value: '二级' },
          ],
          onFilter: (value, record) => record.address.indexOf(value) === 0,
          sortDirections: ['descend'],
        },
        {
          title: "事件内容",
          dataIndex: "taskContent",
          key: "taskContent",
        },
        {
            title: "事件来源",
            dataIndex: "taskOrigin",
            key: "taskOrigin",
        },
        {
          title: '位置',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: "创建时间",
          dataIndex: "time",
          key: "time",
          sorter: (a, b) => a.time.length - b.time.length,
          sortDirections: ['descend', 'ascend'],
        },

        {
          title: "事件状态",
          dataIndex: "taskStatus",
          key: "taskStatus",
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
          title: "上报人",
          dataIndex: "reporter",
          key: "reporter"
        },
        {
          title: "处理人",
          dataIndex: "handler",
          key: "handler"
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
        taskType:"二级",
        taskContent: "3号烟雾传感器被人为损坏",
        taskOrigin: "巡检人员上报",
        address: "2号楼",
        time: "2021-05-11 11:31",
        taskStatus:"🔴待处理",
        reporter: "张三",
        handler:"未知",
      },
        {
          key: "2",
          id: "0254",
          taskType:"一级",
          taskContent: "5号商铺起火，请及时处理",
          taskOrigin: "居民报警",
          address: "商业中心",
          time: "2021-05-11 11:31",
          taskStatus:"🟢已处理",
          reporter: "王某某",
          handler:"李某某",
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
