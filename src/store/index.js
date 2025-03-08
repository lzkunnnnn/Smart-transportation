import Vue from 'vue';
import Vuex from 'vuex';
//没了这个就没了左侧导航栏
//不命名为getters还不好使，但是store唯一取值方法getters怎么办？
import getters from './getters';
import axios from '@/store/axios';

Vue.use(Vuex);

//导入modules文件夹下所有的js文件
const modulesFiles = require.context('./modules', true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

//存储所有组件的状态，是公共的对象
const state = {
  //设备状态
  deviceState: {
    sensorNum: 0,
    abnormalSensorNum: 0,
    onlineSensorNum: 0,
    elecNum: 0,
    elecNumAbnormal: 0,
    smogNum: 0,
    smogNumAbnormal: 0,
    gasNum: 0,
    gasNumAbnormal: 0,
    waterNum: 0,
    waterNumAbnormal: 0
  },
  //事件
  alarmEvents: {
    id: 0,
    state: 0,
    level: 0,
    type: '',
    alarmType: '',
    address: '',
    operation: '',
    content: '',
    source: '',
    reportPerson: '',
    handlePerson: '',
    updateTime: '',
    createTime: '',
    handleTime: ''
  },
  //警报统计-处理情况
  handleList: {
    alarmNum: 0,
    earlyAlarmNum: 0,
    handledNum: 0,
    unHandledNum: 0,
    handledLevelOne: 0,
    handledLevelTwo: 0,
    handledLevelThree: 0,
    handledLevelFour: 0,
    unHandledLevelOne: 0,
    unHandledLevelTwo: 0,
    unHandledLevelThree: 0,
    unHandledLevelFour: 0
  }
};

//修改store中值的唯一方法
const mutations = {
  //初始化vuex内容
  getDeviceState(state, deviceState) {
    state.deviceState = deviceState;
    console.log('vuex-store 获取设备情况成功');
    localStorage.setItem('deviceState', JSON.stringify(deviceState));
  },
  //从storage中取内容初始化vuex
  getLoaclDeviceState(state) {
    state.deviceState = JSON.parse(localStorage.getItem('deviceState'));
    /*     console.log(JSON.parse(localStorage.getItem('deviceState')));
    console.log('getDeviceFromLocalStorage'); */
  },
  //
  getAlarmEvents(state, alarmEvents) {
    state.alarmEvents = alarmEvents;
    console.log('vuex-getAlarmEvents');
    localStorage.setItem('alarmEvents', JSON.stringify(alarmEvents));
  },
  //处理/未处理事情数量
  getHandleList(state, handleList) {
    state.handleList = handleList;
    console.log('getHandleList');
    localStorage.setItem('handleList', handleList);
  }
};

//
const actions = {
  asyncGetDeviceState(context) {
    axios.get('sensor/deviceState').then(res => {
      const deviceState = res.data.data;
      context.commit('getDeviceState', deviceState);
    });
  },
  asyncGetLocalDeviceState(context) {
    context.commit('getLocalDeviceState');
  },
  //
  async asyncGetAlarmEvents(context) {
    try {
      let events = await axios.get('event/getEvents');
      events = events.data.data;
      events.forEach(e => {
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
      context.commit('getAlarmEvents', events);
      context.commit('getDeviceState');
    } catch (e) {
      console.log(e);
    }
  },
  async asyncGetHandleList(context) {
    let handleList = await axios.get('event/getHandleDTO');
    handleList = handleList.data.data;
    context.commit('getHandleList', handleList);
  }
};

const store = new Vuex.Store({
  modules,
  getters,
  state,
  mutations,
  actions
});

export default store;
