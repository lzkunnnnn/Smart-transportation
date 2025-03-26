<template>
  <div style="display: flex">
    <a-card>
      <video :src="videoSource" muted autoplay width="100%" loop crossorigin="anonymous" />
    </a-card>
    <a-card style="width: 500px">
      <a-button @click="showModal" style="width: 100%"> 车辆检索</a-button>
      <a-table :columns="columns" :data-source="table_data" :pagination="false">
        <a slot="name" slot-scope="text">{{ text }}</a>
      </a-table>
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

export default {
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
      columns: [
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time'
        },
        {
          title: '车辆类型',
          dataIndex: 'car_type',
          key: 'car_type'
        },
        {
          title: '颜色',
          dataIndex: 'color',
          key: 'color'
        }
      ],
      table_data: [
        {
          key: '1',
          time: '14:00',
          car_type: '小车',
          color: '黑色'
        },
        {
          key: '2',
          time: '14:00',
          car_type: '小车',
          color: '黑色'
        },
        {
          key: '3',
          time: '14:00',
          car_type: '小车',
          color: '黑色'
        },
      ]
    };
  },
  computed: {
    videoSource() {
      return this.processedVideoUrl || this.originalVideo;
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

        console.log(processedResponse)

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

  mounted() {
    this.processVideo();
  }
};
</script>
