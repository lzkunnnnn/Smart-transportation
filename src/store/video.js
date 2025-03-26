import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const video_store = new Vuex.Store({
  state: {
    processedVideo: {
      url: null,
      blob: null
    }
  },
  mutations: {
    setProcessedVideoBlob(state, videoData) {
      state.processedVideo.blob = videoData;
    },
    setProcessedVideoUrl(state, url) {
      state.processedVideo.url = url;
    },
  },
  getters: {
    getProcessedVideoUrl: state => state.processedVideo.url,
    getProcessedVideoBlob: state => state.processedVideo.blob
  }
});

export default video_store;
