import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

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
  User: {
    name: '123'
  }
};
//从store中取值的唯一方法
/* const getters={
  getUser(state){
    return state.User
  }
} */
//修改store中值的唯一方法
const mutations={
  updateUser(state,user){
    state.User=user
  }
}
//
const actions={
  asyncUpdateUser(context,user){
    context.commit('updateUser',user)
  }
}

const store = new Vuex.Store({
  modules,
  getters,
  state,
  mutations,
  actions
});

export default store;
