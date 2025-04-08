<template>
  <div style="display: flex; margin-top: 5px">

    <a-card style="border: none">
      <!-- <video src="../../../output.mp4" muted autoplay width="100%" loop crossorigin="anonymous" /> -->
      <video :src="videoSource" muted autoplay width="100%" loop crossorigin="anonymous" />
    </a-card>

    <a-card style="width: 500px; border: none">
      <a-button @click="showModal" style="width: 100%"> 车辆检索</a-button>
      <div class="grid-container header">
        <span class="b">位置</span>
        <span class="c">状态</span>
        <span class="d">更新时间</span>
      </div>

      <vue-seamless-scroll :data="table_data" class="seamless-warp" :class-option="classOption">
        <div class="grid-container" v-for="item in table_data" :key="item.key">
          <span class="b">{{ item.car_type }}</span>
          <span class="c">{{ item.color }}</span>
          <span class="d">{{ item.time }}</span>
        </div>
      </vue-seamless-scroll>

    </a-card>

    <a-modal
      title="车辆检索"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div style="display: flex">
        <div>
          <a-upload
            name="file"
            ref="upload"
            :multiple="false"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :custom-request="customRequest"
            @remove="handleRemove"
          >
            <a-button> <a-icon type="upload" /> 上传图片 </a-button>
          </a-upload>
        </div>
        <div style="display: flex; flex-direction: column; margin-left: 20px">
          <a-card title="上传的图片" style="margin-bottom: 20px">
            <img v-if="uploadedImage" :src="uploadedImage" style="max-width: 200px; max-height: 200px" alt="上传图片" />
          </a-card>
          <a-card title="检索的图片">
            <img v-if="responseImage" :src="responseImage" style="max-width: 200px; max-height: 200px" alt="检索图片" />
          </a-card>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import axios from 'axios';
import video_store from '@/store/video';
import originalVideo from '@/assets/video/video.mp4';
import vueSeamlessScroll from 'vue-seamless-scroll';

export default {
  components: {
    vueSeamlessScroll
  },
  data() {
    return {
      originalVideo,
      processedVideoUrl: null,
      processedVideoBlob: null,
      visible: false,
      confirmLoading: false,
      fileList: [],
      uploadedImage: null,
      responseImage: null,
      table_data: [
        {
          key: '1',
          time: '14:00',
          car_type: '轿车',
          color: '黑色'
        },
        {
          key: '2',
          time: '14:01',
          car_type: '轿车',
          color: '白色'
        },
        {
          key: '3',
          time: '14:05',
          car_type: '轿车',
          color: '白色'
        },
        {
          key: '4',
          time: '14:10',
          car_type: '公交车',
          color: '橙色'
        },
        {
          key: '5',
          time: '14:20',
          car_type: '卡车',
          color: '黑色'
        },
        {
          key: '6',
          time: '14:25',
          car_type: '轿车',
          color: '黑色'
        },
        {
          key: '7',
          time: '14:30',
          car_type: '轿车',
          color: '黑色'
        },
        {
          key: '8',
          time: '14:35',
          car_type: '轿车',
          color: '黑色'
        },
        {
          key: '9',
          time: '14:36',
          car_type: '轿车',
          color: '红色'
        },
        {
          key: '10',
          time: '14:40',
          car_type: '轿车',
          color: '黄色'
        },
        {
          key: '11',
          time: '14:42',
          car_type: '轿车',
          color: '白色'
        }
      ]
    };
  },
  computed: {
    videoSource() {
      return this.processedVideoUrl || this.originalVideo;
    },
    classOption() {
      return {
        step: 2, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 62, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 3000 // 单步运动停止的时间(默认值1000ms)
      };
    }
  },
  methods: {
    showModal() {
      this.visible = true;
    },

    // 文件选择预处理
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
          this.uploadedImage = e.target.result;
          resolve(file);
        };
        reader.readAsDataURL(file);
      });
    },

    // 自定义上传逻辑
    customRequest({ file, onSuccess }) {
      const formData = new FormData();
      formData.append('file', file);

      axios
        .post('http://localhost:8000/upload-img', formData, {
          responseType: 'blob'
        })
        .then(response => {
          this.responseImage = URL.createObjectURL(response.data);
        });
    },

    // 确认按钮处理
    handleOk() {
      if (!this.uploadedImage) {
        this.$message.warning('请先上传图片');
        return;
      }

      this.confirmLoading = true;
      this.$refs.upload.submit();
      this.confirmLoading = false;
    },

    handleCancel() {
      this.confirmLoading = false;
      this.visible = false;
    },

    handleRemove() {
      this.uploadedImage = null;
      this.responseImage = null;
    },

    async processVideo() {
      if (video_store.getters.getProcessedVideoUrl !== null) {
        this.processedVideoBlob = video_store.getters.getProcessedVideoBlob;

        this.processedVideoUrl = URL.createObjectURL(this.processedVideoBlob);

        return;
      }
      try {
        this.$message.info('视频处理中...');
        const response = await fetch(this.originalVideo);
        const blob = await response.blob();

        const videoFile = new File([blob], 'video.mp4', { type: 'video/mp4' });

        const formData = new FormData();
        formData.append('video', videoFile);

        const processedResponse = await axios.post('http://localhost:8000/videopro/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'blob'
        });

        this.processedVideoBlob = processedResponse.data;
        this.processedVideoUrl = URL.createObjectURL(this.processedVideoBlob);

        video_store.commit('setProcessedVideoBlob', this.processedVideoBlob);
        video_store.commit('setProcessedVideoUrl', this.processedVideoUrl);

        this.$message.success('视频处理完成');
      } catch (error) {
        console.error('视频处理错误:', error);
        this.$message.error('视频处理失败');
      }
    }
  },

  beforeMount() {
    this.processVideo();
  }
};
</script>
<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  background-color: #182030;
  border-bottom: 2px solid #222d44;
}
.seamless-warp {
  height: 620px;
  overflow: hidden;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(10, 10%);
  grid-template-areas: 'b b b b c c c d d d';
  border: 2px solid #111825;
  border-top:none;
  width: 100%;
  height: 62px;
  .a {
    grid-area: a;
  }
  .b {
    grid-area: b;
  }
  .c {
    grid-area: c;
  }
  .d {
    grid-area: d;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.grid-container:not(.header):hover {
  background-color: #3b4d75;
}
</style>
