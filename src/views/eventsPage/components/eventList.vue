<template>
  <div class="container">
    <a-table
      :columns="columns"
      :pagination="{ pageSize: 5 }"
      :data-source="$store.state.alarmEvents"
      @change="handleChange"
      v-show="!isVisible"
    >
      <!--       <template v-slot:updateTime="updateTime">
        <span>{{ timeTransfor(updateTime) }}</span>
      </template> -->
      <template v-slot:type="type">
        <span>{{ typeTransfor(type) }}</span>
      </template>
      <template v-slot:state="state">
        <span>{{ stateTransfor(state) }}</span>
      </template>
      
      <template v-slot:operation="record">
        <a-button type="default" @click="detail(record)">详情</a-button>
      </template>
    </a-table>

    <a-card class="dialog" v-show="isVisible">
      <event-board class="board-line" @close="close()" :eventBoardInfo="eventBoardInfo"></event-board>
    </a-card>
  </div>
</template>
<script>
import eventBoard from './eventBoard.vue';
import { stateTransfor, timeTransfor, typeTransfor } from '@/api/transfor.js';
export default {
  components: {
    eventBoard
  },
  data() {
    return {
      eventBoardInfo: {},
      data,
      filteredInfo: null,
      sortedInfo: null,
      isVisible: false
    };
  },
  methods: {
    stateTransfor,
    timeTransfor,
    typeTransfor,
    close() {
      this.isVisible = false;
    },
    detail(record) {
      this.isVisible = true;
      this.eventBoardInfo = record;
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
          title: '事件编号',
          dataIndex: 'id',
          key: 'id',
          sorter: (a, b) => a.id - b.id,
          sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order
        },
        {
          title: '事件来源',
          dataIndex: 'source',
          key: 'source',
          ellipsis: true
        },
        {
          title: '事件类型',
          dataIndex: 'type',
          key: 'type',
          filters: [
            { text: '违停抓拍', value: 'park' },
            { text: '流量监测', value: 'flow' },
            { text: '区间测速', value: 'speed' },
            { text: '卡口摄像', value: 'check' },
            { text: '车道监测', value: 'lane' },
            { text: '环境监测', value: 'environment' }
          ],
          onFilter: (value, record) => record.type.indexOf(value) === 0,
          sortDirections: ['descend'],
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '事件标题',
          dataIndex: 'title',
          key: 'title',
          ellipsis: true
        },

        {
          title: '位置',
          dataIndex: 'address',
          key: 'address'
        },
        /*         {
          title: '更新时间',
          dataIndex: 'updateTime',
          key: 'updateTime',
          scopedSlots: { customRender: 'updateTime' },
          filteredValue: filteredInfo.updateTime || null,
          onFilter: (value, record) => record.updateTime.includes(value),
          sorter: (a, b) => new Date(a.updateTime) - new Date(b.updateTime),
          sortOrder: sortedInfo.columnKey === 'updateTime' && sortedInfo.order,
          ellipsis: true
        }, */
        {
          title: '事件状态',
          dataIndex: 'state',
          key: 'state',
          filters: [
            { text: '🔴待处理', value: 1 },
            { text: '🟢已处理', value: 0 }
          ],
          filteredValue: filteredInfo.state || null,
          onFilter: (value, record) => record.state == value,
          sortOrder: sortedInfo.columnKey === 'state' && sortedInfo.order,
          ellipsis: true,
          scopedSlots: { customRender: 'state' }
        },
        /*         {
          title: '上报人',
          dataIndex: 'reportPerson',
          key: 'reportPerson'
        },
        {
          title: '处理人',
          dataIndex: 'handlePerson',
          key: 'handlePerson'
        }, */
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
const data = [
  {
    key: '1',
    id: '001',
    taskType: '二级',
    taskContent: '3号烟雾传感器被人为损坏',
    taskOrigin: '巡检人员上报',
    address: '2号楼',
    time: '2021-05-11 11:31',
    taskStatus: '🔴待处理',
    reporter: '张三',
    handler: '未知'
  },
  {
    key: '2',
    id: '0254',
    taskType: '一级',
    taskContent: '5号商铺起火，请及时处理',
    taskOrigin: '居民报警',
    address: '商业中心',
    time: '2021-05-11 11:31',
    taskStatus: '🟢已处理',
    reporter: '王某某',
    handler: '李某某'
  }
];
</script>
<style scoped>
.container {
  position: relative;
}
.container .dialog {
  border: solid 2px #182030;
  width: 100%;
  height: 100%;
}
.table-operations {
  margin-bottom: 16px;
}
.table-operations > button {
  margin-right: 8px;
}
.board-line {
  height: 400px;
  width: 100%;
}
</style>
