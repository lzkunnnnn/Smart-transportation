<template>
  <div>
    <a-table :columns="columns" :data-source="data" @change="handleChange" />
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
          dataIndex: "type",
          key: "type"
        },
        {
          title: "状态",
          dataIndex: "status",
          key: "status",
          filters: [
            { text: '🟢运转正常', value: '🟢运转正常' },
            { text: '🔴通信不畅', value: '🔴通信不畅' },
            { text: '⚪️离线', value: '⚪️离线' },
          ],
          filteredValue: filteredInfo.status || null,
          onFilter: (value, record) => record.status.includes(value),
          sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
          ellipsis: true,
        },
        {
            title: "采集值",
            dataIndex: "level",
            key: "level"
        },
        {
          title: '地址',
          dataIndex: 'address',
          key: 'address',
          filters: [
            { text: '一号楼', value: '一号楼' },
            { text: '二号楼', value: '二号楼' },
          ],
          onFilter: (value, record) => record.address.indexOf(value) === 0,
          sorter: (a, b) => a.address.length - b.address.length,
          sortDirections: ['descend'],
        },
        {
            title: "更新时间",
            dataIndex: "time",
            key: "time",
            filteredValue: filteredInfo.time || null,
            onFilter: (value, record) => record.time.includes(value),
            sorter: (a, b) => a.time.length - b.time.length,
            sortOrder: sortedInfo.columnKey === 'time' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: "操作",
            dataIndex: "operation",
            key: "operation"
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
const data = [
  {
        key: "1",
        id: "001",
        type: "燃气传感器",
        status: "🟢运转正常",
        level: "93",
        address: "1号楼一层东",
        time: "2021-05-11 11:31",
        operation: "详情"
      },
        {
          key: "2",
          id: "002",
          type: "燃气传感器",
          status: "🟢运转正常",
          level: "56",
          address: "1号楼二层东",
          time: "2021-05-11 11:31",
          operation: "详情"
        },
        {
          key: "3",
          id: "003",
          type: "燃气传感器",
          status: "⚪️离线",
          level: "43",
          address: "1号楼三层东",
          time: "2021-05-11 11:31",
          operation: "详情"
        },
        {
          key: "4",
          id: "004",
          type: "燃气传感器",
          status: "🟢运转正常",
          level: "42",
          address: "1号楼四层东",
          time: "2021-05-11 11:31",
          operation: "详情"
        },
        {
          key: "2",
          id: "005",
          type: "燃气传感器",
          status: "🟢运转正常",
          level: "32",
          address: "1号楼五层东",
          time: "2021-05-11 11:31",
          operation: "详情"
        },
        {
          key: "3",
          id: "006",
          type: "燃气传感器",
          status: "🔴通信不畅",
          level: "18",
          address: "1号楼地下室",
          time: "2021-05-11 11:31",
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