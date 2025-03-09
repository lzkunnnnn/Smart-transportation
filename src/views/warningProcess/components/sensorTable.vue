<template>
  <div>
    <a-table :columns="columns" :data-source="$store.state.alarmEvents" @change="handleChange">
      <template v-slot:state="state">
        <span>{{ stateTransfor(state) }}</span>
      </template>
      <template v-slot:level="record">
        <span>{{ levelTransfor(record) }}</span>
      </template>
      <template v-slot:createTime="createTime">
        <span>{{ TimeTransfor(createTime) }}</span>
      </template>
      <template v-slot:handleTime="handleTime">
        <span>{{ TimeTransfor(handleTime) }}</span>
      </template>
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
    levelTransfor(level) {
      if (level == 0) {
        return '一级';
      } else if (level == 1) {
        return '二级';
      } else if (level == 2) {
        return '三级';
      } else if (level == 3) {
        return '四级';
      } else {
        return '未知等级';
      }
    },
    stateTransfor(state) {
      if (state == 0) {
        return '🟢已处理';
      }
      if (state == 1) {
        return '🔴待处理';
      } else return '未知';
    },
    TimeTransfor(Time) {
      if (Time == null) {
        return '未知';
      } else return Time.replace('T', ' ').replace(/-/g, '/');
    },
    handle(record) {
      axios({ method: 'get', url: 'event/handleEvent', params: { id: record.id, state: record.state } }).then(res => {
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
          scopedSlots: { customRender: 'level' },
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
          scopedSlots: { customRender: 'createTime' },
          sorter: (a, b) => a.createTime.length - b.createTime.length,
          sortDirections: ['descend', 'ascend']
        },
        {
          title: '处理时间',
          dataIndex: 'handleTime',
          key: 'handleTime',
          scopedSlots: { customRender: 'handleTime' }
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
          ellipsis: true,
          scopedSlots: { customRender: 'state' }
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
</script>
<style scoped>
.table-operations {
  margin-bottom: 16px;
}
.table-operations > button {
  margin-right: 8px;
}
</style>
