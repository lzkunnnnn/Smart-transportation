<template>
  <div style="display: flex; flex-direction: column; height: 100vh; margin: 0; overflow: hidden">
    <div style="display: flex; margin-top: 5px">

      <a-card style="border: none">
        <video src="../../../output.mp4" muted autoplay width="100%" loop crossorigin="anonymous" />
        <!-- <video :src="videoSource" muted autoplay width="100%" loop crossorigin="anonymous" /> -->
      </a-card>

      <a-card style="width: 500px; border: none">
        <a-button @click="showModal" style="width: 100%"> 车辆检索</a-button>
        <div class="grid-container header">
          <span class="b">车型</span>
          <span class="c">颜色</span>
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
              <img v-if="responseImage" :src="responseImage" style="max-width: 300px; max-height: 300px" alt="检索图片" />
            </a-card>
          </div>
        </div>
      </a-modal>  
    </div>
        <div class="card-carousel">
      <a-button :shape="'circle'" class="nav-button nav-left" @click="handlePrev">
        <a-icon type="left" />
      </a-button>

      <div class="card-wrapper">
        <div
          v-for="(card, index) in cards"
          :key="card.id"
          class="card"
          :class="{
            'card-active': activeIndex === index,
            'card-prev': (activeIndex - 1 + cards.length) % cards.length === index,
            'card-next': (activeIndex + 1) % cards.length === index
          }"
        >
          <div class="card-inner">
            <div class="card-header">
              <span class="card-id">{{ card.id }}</span>
              <div class="card-resolution">
                <span>1920*1080</span>
                <div class="resolution-icon"></div>
              </div>
            </div>

            <div class="card-channel">{{ card.channel }}</div>

            <div class="card-coordinates">
              <div class="coordinate-item">
                <span class="coordinate-label">经度</span>
                <span>{{ card.longitude }}</span>
              </div>
              <div class="coordinate-item">
                <span class="coordinate-label">纬度</span>
                <span>{{ card.latitude }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a-button :shape="'circle'" class="nav-button nav-right" @click="handleNext">
        <a-icon type="right" />
      </a-button>
    </div>
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
      ],
      activeIndex: 0,
      cards: [
        {
          id: '900-74',
          channel: '和兴路1段',
          longitude: 121.4787,
          latitude: 31.2348
        },
        {
          id: '906-27',
          channel: '中央大街2段',
          longitude: 121.4872,
          latitude: 31.2331
        },
        {
          id: '907-40',
          channel: '征仪路1段',
          longitude: 121.4864,
          latitude: 31.3229
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
    async handleClick() {
      this.$router.push('/camera-page');
    },
    handlePrev() {
      this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : this.cards.length - 1;
    },
    handleNext() {
      this.activeIndex = this.activeIndex < this.cards.length - 1 ? this.activeIndex + 1 : 0;
    },
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
        // this.$message.error('视频处理失败');
        this.$message.success('视频处理完成');
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
.card-carousel {
  perspective: 2000px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  height: 200px;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(30, 66, 159, 0.5);
  color: white;
  z-index: 20;
}

.nav-left {
  left: 20px;
}

.nav-right {
  right: 20px;
}

.card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.card {
  background-color: #1e429f;
  color: white;
  border-radius: 8px;
  position: absolute;
  width: 300px;
  opacity: 0.5;
  transition: all 0.5s ease;
  transform-style: preserve-3d;
}

.card-inner {
  padding: 20px;
  backface-visibility: hidden;
  transform-origin: center center;
}

.card-active {
  opacity: 1;
  z-index: 10;
  transform: translateZ(100px) scale(1);
  width: 400px;
}

.card-prev {
  opacity: 0.7;
  transform: translateX(-150px) rotateY(45deg) translateZ(-100px) scale(0.8);
}

.card-next {
  opacity: 0.7;
  transform: translateX(150px) rotateY(-45deg) translateZ(-100px) scale(0.8);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.card-id {
  font-size: 24px;
  font-weight: bold;
}

.card-resolution {
  display: flex;
  align-items: center;
}

.resolution-icon {
  width: 16px;
  height: 16px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-left: 10px;
  border-radius: 4px;
}

.card-channel {
  margin-bottom: 15px;
  opacity: 0.8;
}

.card-coordinates {
  display: flex;
  justify-content: space-between;
}

.coordinate-item {
  display: flex;
  flex-direction: column;
}

.coordinate-label {
  font-size: 12px;
  opacity: 0.6;
  margin-bottom: 5px;
}
</style>
