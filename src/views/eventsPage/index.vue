<template>
  <div class="body-container">
    <div class="left-container">
      <a-card class="vague">
        <div class="btn-box" key="button" :class="{ 'fade-out': showBtn, 'fade-in': !showBtn }">
          <div class="box" @click="toggleForm">
            <span class="ripple"></span>
            <p>事件管理</p>
          </div>
        </div>
        <a-form
          v-show="showForm"
          key="form"
          ref="formRef"
          class="grid-container"
          :model="formEvent"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :rules="rules"
        >
          <div class="left">
            <a-form-item label="监控" name="type">
              <a-select v-model:value="formEvent.type" placeholder="选择监控类型" style="width: 80%">
                <a-select-option value="park">违停抓拍</a-select-option>
                <a-select-option value="check">卡口摄像</a-select-option>
                <a-select-option value="flow">流量检测</a-select-option>
                <a-select-option value="speed">区间测速</a-select-option>
                <a-select-option value="lane">车道检测</a-select-option>
                <a-select-option value="environment">环境监测</a-select-option>
              </a-select>
            </a-form-item>

            <!-- 来源选择框（按name选择） -->
            <a-form-item label="来源" name="name">
              <a-select
                v-model:value="formEvent.sensor.name"
                placeholder="选择传感器名称"
                style="width: 80%"
                @change="handleNameChange"
              >
                <a-select-option v-for="sensor in sensors" :key="sensor.name" :value="sensor.name">
                  {{ sensor.name }}
                </a-select-option>
              </a-select>
            </a-form-item>

            <!-- 地址选择框（按address选择） -->
            <a-form-item label="地址" name="address">
              <a-select
                v-model:value="formEvent.sensor.address"
                placeholder="选择传感器地址"
                style="width: 80%"
                @change="handleAddressChange"
              >
                <a-select-option v-for="sensor in sensors" :key="sensor.address" :value="sensor.address">
                  {{ sensor.address }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>

          <div class="middle">
            <a-form-item label="标题" name="title">
              <a-input style="width: 100%" v-model:value="formEvent.title" />
            </a-form-item>

            <a-form-item label="内容">
              <a-input
                v-model:value="formEvent.content"
                type="textarea"
                style="width: 100%; height: 105px; max-height: 105px"
              />
            </a-form-item>
          </div>

          <div class="right">
            <a-form-item label="警报" name="alarmType">
              <a-select v-model:value="formEvent.alarmType" placeholder="" style="width: 80%">
                <a-select-option value="故障">故障</a-select-option>
                <a-select-option value="预警">预警</a-select-option>
                <a-select-option value="警报">警报</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="等级" name="level">
              <a-radio-group v-model:value="formEvent.level">
                <a-radio value="0">一级</a-radio>
                <a-radio value="1">二级</a-radio>
                <a-radio value="2">三级</a-radio>
                <a-radio value="3">四级</a-radio>
              </a-radio-group>
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 14, offset: 4 }" style="display: flex; justify-content: space-between">
              <a-button type="primary" @click="addEvent()">提交</a-button>
              <a-button style="margin-left: 10px" @click="resetForm()">重置</a-button>
              <a-button
                style="margin-left: 10px"
                @click="
                  showBtn = false;
                  showForm = false;
                "
                >返回</a-button
              >
            </a-form-item>
          </div>
        </a-form>
      </a-card>
      <div style="height: 50px"></div>

      <a-card class="table-list">
        <event-list></event-list>
      </a-card>
    </div>
    <div class="right-container">
      <a-card class="percentage">
        <progress-chart :progressList="$store.state.progressList" class="progress"></progress-chart>
      </a-card>

      <div class="search-container">
        <div class="search" style="text-align: center">
          <a-input v-model="eventId" placeholder="请输入事件编号" style="width: 300px"></a-input>
          <a-button type="primary" @click="initData(eventId)">关联分析</a-button>
        </div>
        <a-card class="graph-list">
          <relation-chart :links="links" :data="items" class="chart-graph"></relation-chart>
        </a-card>
      </div>
    </div>
  </div>
</template>
<script>
import { eventList, relationChart, progressChart } from './components';
import axios from '@/store/axios.js';
export default {
  name: 'merge',
  components: {
    eventList,
    relationChart,
    progressChart
  },
  data() {
    return {
      showForm: false,
      showBtn: false,
      labelCol: { span: 4 }, // 标签占 4 列
      wrapperCol: { span: 20 }, // 表单控件占 20 列
      items: [],
      links: [],
      event: {},
      progressList: [],
      formEvent: {
        sensor: { name: undefined, address: undefined }, // 使用undefined而不是null
        title: undefined,
        level: undefined,
        type: undefined,
        alarmType: undefined,
        content: ''
      },
      sensors: [],
      rules: {}
    };
  },
  watch: {
    // 监听 formEvent.type 的变化
    'formEvent.type'(newType) {
      if (newType) {
        // 确保 newType 有值
        this.getSensors(); // 调用 getSensors 方法
      }
    }
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    toggleForm() {
      this.showBtn = !this.showBtn;
      setTimeout(() => {
        this.showForm = true;
      }, 300);
    },
    pageInit() {
      this.$store.dispatch('getAlarmEvents');
      this.$store.dispatch('progressList');
      let box = document.querySelector('.box');
      box.onmouseenter = function (event) {
        let ripple = box.querySelector('.ripple');
        ripple.classList.add('animation');
        ripple.style.width = this.offsetWidth + 'px';
        ripple.style.height = this.offsetWidth + 'px';
        ripple.style.top = -(this.offsetHeight - event.offsetY) + 'px';
        ripple.style.left = -(this.offsetWidth / 2 - event.offsetX) + 'px';
        setTimeout(() => {
          ripple.classList.remove('animation');
        }, 500);
      };
    },
    handleNameChange(selectedName) {
      const selectedSensor = this.sensors.find(s => s.name === selectedName);
      if (selectedSensor) {
        this.formEvent.sensor.address = selectedSensor.address;
      }
    },
    // 当address变化时，自动更新name
    handleAddressChange(selectedAddress) {
      const selectedSensor = this.sensors.find(s => s.address === selectedAddress);
      if (selectedSensor) {
        this.formEvent.sensor.name = selectedSensor.name;
      }
    },
    //表单提交
    async addEvent() {
      axios
        .get('event/addEvent', {
          params: {
            title: this.formEvent.title,
            type: this.formEvent.type,
            alarmType: this.formEvent.alarmType,
            address: this.formEvent.sensor.address,
            content: this.formEvent.content,
            source: this.formEvent.sensor.name,
            level: this.formEvent.level,
            reportPerson: 'admin'
          }
        })
        .then(() => {
          this.$message.success('提交成功！');
          localStorage.clear('alarmEvents');
          this.pageInit();
          this.resetFormData();
        })
        .catch(error => {
          this.$message.error('提交失败');
          this.resetFormData();
        });
    },
    //重置表单
    resetForm() {
      this.resetFormData();
      this.$message.success('重置成功');
      this.pageInit();
    },
    resetFormData() {
      this.formEvent = {
        sensor: { name: undefined, address: undefined },
        title: undefined,
        level: undefined,
        type: undefined,
        alarmType: undefined,
        content: ''
      };
      this.sensors = [];
    },
    getSensors() {
      axios.get('sensor/sensors', { params: { type: this.formEvent.type } }).then(res => {
        this.sensors = res.data.data;
      });
    },
    initData(eventId) {
      axios.get('event/getEvent', { params: { id: eventId } }).then(res => {
        this.event = res.data.data;
        this.getRelation(eventId);
      });
    },
    getRelation(eventId) {
      axios
        .get('relation/getRelation', { params: { id: eventId } })
        .then(res => {
          this.links = res.data.data.links;
          this.items = res.data.data.items;
          console.log(res.data.data);
        })
        .catch(error => {
          this.$message.error('分析失败');
        });
    }
  }
};
</script>
<style scoped lang="scss">
//渐变按钮start
.btn-box {
  position: relative;
  height: 100%;
  padding: 0;
}
.box {
  position: absolute;
  width: 100%;
  z-index: 20;
  aspect-ratio: 5/1; // 宽度:高度 = 4:3
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select: none;
  margin: 5px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  p {
    color: white;
    font-size: 50px;
    margin: 0;
  }
}

.box:nth-of-type(1) {
  background: linear-gradient(150deg, rgb(251, 122, 8), rgb(240, 47, 31));
}

.fade-out {
  animation: fadeOut 0.5s ease-in-out;
  animation-fill-mode: forwards;
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
    z-index: 1;
  }
}

.ripple {
  display: block;
  position: absolute;
  border-radius: 100%;
  background: rgba(255, 255, 255, 0.5);
  transform: scale(0);
}

.animation {
  animation: ripple 0.5s ease-in;
}

@keyframes ripple {
  100% {
    transform: scale(10);
    opacity: 0;
  }
}
//渐变按钮end

.body-container {
  width: 100%;
  padding: 10px;
  border: none;
  margin: 0px auto;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  .left-container {
    flex-basis: 1000px;
    height: 800px;
    border: none;
    margin: 20px;
    .vague {
      height: 240px;
      border: none;
      position: relative;
      overflow: hidden;
      .grid-container {
        display: grid;
        grid-template-columns: 30% 30% 40%;
        width: 100%;
        margin: 5px;
      }
    }
    .table-list {
      width: 1000px;
      height: 510px;
      border: none;
    }
  }

  .right-container {
    margin: 20px;
    flex-grow: 1;
    height: 800px;
    //background-color: #e54f4f;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-content: start;

    .percentage {
      width: 100%;
      height: 240px;
      border: none;
      border-radius: 10px;
      padding: 0px;
    }
    .progress {
      height: 220px;
      color: rgb(98, 198, 190);
    }

    .search-container {
      width: 100%;
      height: 560px;
      .search {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
      }

      .graph-list {
        flex-grow: 1;
        border-radius: 10px;
        border: none;
        width: 100%;
        height: 510px;
        margin: 0 8px;
        .chart-graph {
          height: 480px;
        }
      }
    }
  }
}
</style>
