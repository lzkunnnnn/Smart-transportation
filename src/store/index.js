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
    flowNum: 0,
    flowNumAbnormal: 0,
    parkNum: 0,
    parkNumAbnormal: 0,
    speedNum: 0,
    speedNumAbnormal: 0,
    checkNum: 0,
    checkNumAbnormal: 0,
    laneNum: 0,
    laneNumAbnormal: 0,
    environmentNum: 0,
    environmentNumAbnormal: 0
  },
  //事件
  alarmEvents: [] /* {
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
  } */,
  //警报统计-处理情况
  handleList: {
    alarmNum: 0, //警报事件数
    earlyAlarmNum: 0, //预警事件数

    //用作首页报警类型占比分析
    parkNum: 0,
    speedNum: 0,
    flowNum: 0,
    checkNum: 0,
    laneNum: 0,
    environmentNum: 0,

    //仅用于警报等级作为纵坐标的警报统计表
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
