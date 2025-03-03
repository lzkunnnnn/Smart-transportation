<template>
  <div>
    <a-table :columns="columns" :data-source="data" @change="handleChange" />
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      data,
      filteredInfo: null,
      sortedInfo: null
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
          sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: '状态',
          dataIndex: 'state',
          key: 'state',
          filters: [
            { text: '🟢运转正常', value: '🟢运转正常' },
            { text: '🔴通信不畅', value: '🔴通信不畅' },
            { text: '⚪️离线', value: '⚪️离线' }
          ],
          filteredValue: filteredInfo.state || null,
          onFilter: (value, record) => record.state.includes(value),
          sortOrder: sortedInfo.columnKey === 'state' && sortedInfo.order,
          ellipsis: true
        },
        {
          title: '采集值',
          dataIndex: 'level',
          key: 'level'
        },
        {
          title: '地址',
          dataIndex: 'address',
          key: 'address'
          /*           filters: [
            { text: '一号楼', value: '一号楼' },
            { text: '二号楼', value: '二号楼' }
          ],
          onFilter: (value, record) => record.address.indexOf(value) === 0,
          sorter: (a, b) => a.address.length - b.address.length,
          sortDirections: ['descend'] */
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          key: 'updateTime',
          filteredValue: filteredInfo.updateTime || null,
          onFilter: (value, record) => record.updateTime.includes(value),
          sorter: (a, b) => new Date(a.updateTime) - new Date(b.updateTime),
          sortOrder: sortedInfo.columnKey === 'updateTime' && sortedInfo.order,
          ellipsis: true
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation'
        }
      ];
      return columns;
    }
  },
  created() {
    this.getSensors();
  },
  methods: {
    getSensors() {
      axios.get('sensor/water').then(res => {
        this.data = res.data.data;
        this.data.forEach(a => {
          if (a.state == 1) {
            a.state = '🟢运转正常';
          }
          if (a.state == 2) {
            a.state = '🔴通信不畅';
          }
          if (a.state == 0) {
            a.state = '⚪️离线';
          }
          a.id = String(a.id).padStart(3,'0')
          a.updateTime = a.updateTime.replace('T', '    ');
        });
      });
    },
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
        columnKey: 'age'
      };
    }
  }
};
const data = [
  {
    key: '1',
    id: '001',
    type: '水数据',
    status: '🟢运转正常',
    level: '一级',
    address: '1号食堂1层',
    time: '2021-05-11 11:31',
    operation: '详情'
  },
  {
    key: '2',
    id: '002',
    type: '水数据',
    status: '🟢运转正常',
    level: '一级',
    address: '1号食堂2层',
    time: '2021-05-11 11:31',
    operation: '详情'
  },
  {
    key: '3',
    id: '003',
    type: '水数据',
    status: '🟢运转正常',
    level: '一级',
    address: '2号食堂1层',
    time: '2021-05-11 11:31',
    operation: '详情'
  },
  {
    key: '4',
    id: '004',
    type: '水数据',
    status: '🟢运转正常',
    level: '一级',
    address: '2号食堂2层',
    time: '2021-05-11 11:31',
    operation: '详情'
  },
  {
    key: '5',
    id: '005',
    type: '水数据',
    status: '🔴通信不畅',
    level: '二级',
    address: '3号食堂1层',
    time: '2021-05-11 11:31',
    operation: '详情'
  },
  {
    key: '6',
    id: '006',
    type: '水数据',
    status: '🟢运转正常',
    level: '一级',
    address: '3号食堂2层',
    time: '2021-05-11 11:31',
    operation: '详情'
  }
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
