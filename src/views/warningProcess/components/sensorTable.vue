<template>
  <div>
    <a-table :columns="columns" :data-source="$store.state.alarmEvents" @change="handleChange">
      <template v-slot:operation="record">
        <a-button type="primary" @click="handle(record)">处理</a-button>
        <!--   <a-divider type="vertical" /> -->
        <a-button type="default" @click="handleDetail(record)">详情</a-button>
      </template>
    </a-table>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      data: [],
      filteredInfo: null,
      sortedInfo: null
    };
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    handle(record) {
      let state = 0;
      if (record.state == '🟢已处理') {
        state = 0;
      }
      if (record.state == '🔴待处理') {
        state = 1;
      }
      axios({ method: 'get', url: 'event/handleEvent', params: { id: record.id, state: state } }).then(res => {
        this.getEvents();
        this.$emit('handled');
      });

      //这个post为什么不行？
      //牢！牢！牢！
      /*       const eventDTO = { id: record.id, state: record.state };
      axios.post('event/handleEvent', eventDTO);
 */
      /*       axios({
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        url: 'event/handleEvent',
        data: JSON.stringify(eventDTO)
      })
        .then(res => {
          console.log(res);
          console.log('change');
          this.getEvents();
        })
        .catch(error => {
          console.log(error);
        }); */
    },
    getEvents() {
      this.$store.dispatch('asyncGetAlarmEvents');
      /*       console.log(this.$store.state.alarmEvents); */
      /*  axios.get('event/getEvents').then(res => {
        this.data = res.data.data;
        this.data.forEach(e => {
          if (e.handleTime == null) {
            e.handleTime = '未知';
          }
          if (e.state == 1) {
            e.state = '🔴待处理';
          }
          if (e.state == 0) {
            e.state = '🟢已处理';
          }
        });
      }); */
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
          key: 'type',
          filters: [
            { text: '烟感系统', value: 'smog' },
            { text: '电气系统', value: 'elec' },
            { text: '消防系统', value: 'water' },
            { text: '红外系统', value: 'gas' }
          ],
          onFilter: (value, record) => record.type.indexOf(value) === 0,
          sortDirections: ['descend']
        },
        {
          title: '状态',
          dataIndex: 'alarmType',
          key: 'alarmType',
          filters: [
            { text: '❌报警', value: '报警' },
            { text: '⚠️故障', value: '故障' },
            { text: '‼️预警', value: '预警' }
          ],
          filteredValue: filteredInfo.alarmType || null,
          onFilter: (value, record) => record.alarmType.includes(value),
          sortOrder: sortedInfo.columnKey === 'alarmType' && sortedInfo.order,
          ellipsis: true
        },
        {
          title: '风险等级',
          dataIndex: 'level',
          key: 'level',
          filters: [
            { text: '一级', value: 0 },
            { text: '二级', value: 1 },
            { text: '三级', value: 2 },
            { text: '四级', value: 3 }
          ],
          filteredValue: filteredInfo.level || null,
          onFilter: (value, record) => record.level == value,
          sortOrder: sortedInfo.columnKey === 'level' && sortedInfo.order,
          ellipsis: true
        },
        {
          title: '地址',
          dataIndex: 'address',
          key: 'address'
        },
        {
          title: '报警时间',
          dataIndex: 'createTime',
          key: 'createTime',
          sorter: (a, b) => a.createTime.length - b.createTime.length,
          sortDirections: ['descend', 'ascend']
        },
        {
          title: '处理时间',
          dataIndex: 'handleTime',
          key: 'handleTime'
        },
        {
          title: '状态',
          dataIndex: 'state',
          key: 'state',
          filters: [
            { text: '🔴待处理', value: '🔴待处理' },
            { text: '🟢已处理', value: '🟢已处理' }
          ],
          filteredValue: filteredInfo.state || null,
          onFilter: (value, record) => record.state.includes(value),
          sortOrder: sortedInfo.columnKey === 'state' && sortedInfo.order,
          ellipsis: true
        },
        {
          title: '操作',
          key: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ];
      return columns;
    }
  }
};
/* const data = [
  {
    key: '1',
    id: '001',
    type: '烟感系统',
    alarmType: '❌报警',
    level: '一级',
    address: '1号楼',
    createTime: '2021-05-11 11:31',
    handleTime: '未知',
    state: '🔴待处理',
    operation: '详情'
  },
  {
    key: '2',
    id: '002',
    type: '电气系统',
    alarmType: '⚠️故障',
    level: '二级',
    address: '1号楼',
    createTime: '2021-05-11 11:31',
    handleTime: '未知',
    state: '🔴待处理',
    operation: '详情'
  },
  {
    key: '3',
    id: '003',
    type: '消防系统',
    alarmType: '⚠️故障',
    level: '五级',
    address: '1号楼',
    createTime: '2021-05-11 11:31',
    handleTime: '2021-05-11 12:31',
    state: '🟢已处理',
    operation: '详情'
  },
  {
    key: '4',
    id: '00114',
    type: '红外系统',
    alarmType: '‼️预警',
    level: '二级',
    address: '1号楼',
    createTime: '2021-05-11 11:31',
    handleTime: '未知',
    state: '🔴待处理',
    operation: '详情'
  }
]; */
</script>
<style scoped>
.table-operations {
  margin-bottom: 16px;
}
.table-operations > button {
  margin-right: 8px;
}
</style>
