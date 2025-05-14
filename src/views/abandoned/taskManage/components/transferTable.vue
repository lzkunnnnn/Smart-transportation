<template>
  <div>
  <a-table :dataSource="tableData" :pagination="false" :columns="columns">
    <span slot="operation">
      <a>编辑</a>
      <a-divider type="vertical" />
      <a>保存</a>
    </span>
  </a-table>
  </div>
</template>
<script>

export default {
  name: "taskTable",
  // props:['afterTransferContent'],
  data() {
    return {
      tableData: [{
        key: "",
        id:"",
        taskType:"",
        taskContent: "",
        taskOrigin: "",
        address: "",
        time: "",
        taskStatus:"",
        reporter: "",
        handler:"",
      },
      ],
      columns: [
        {
          title: "事件编号",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "事件类型",
          dataIndex: "taskType",
          key: "taskType"
        },
        {
          title: "事件内容",
          dataIndex: "taskContent",
          key: "taskContent"
        },
        {
          title: "事件来源",
          dataIndex: "taskOrigin",
          key: "taskOrigin"
        },
        {
          title: "位置",
          dataIndex: "address",
          key: "address"
        },
        {
          title: "创建时间",
          dataIndex: "time",
          key: "time"
        },
        {
          title: "事件状态",
          dataIndex: "taskStatus",
          key: "taskStatus"
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
      ],
    };
  },

  methods:{
    getNLPData(content){
      var index = 1
      console.log("getNLPData"+content.person)
      this.tableData.push({
            key: index,
            id:content.log_id,
            taskType:"二级",
            taskContent: content.detail,
            taskOrigin: content.person,
            address: content.city+content.county+content.town,
            time: this.getCurrentTime(),
            taskStatus:"🔴待处理",
            reporter: content.person,
            handler:"未知",
      })
      index=index+1
    },

    clearData(){
      this.tableData=[]
    },

    getCurrentTime() {
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      _this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
      return _this.gettime;
    }
  }
};

</script>
