<template>
  <div>
    <div style="display: flex; flex-direction: column; margin-top: 5px">
      <a-card title="Video1" style="width: 100%; border: none">
        <video
          @click.once="handleClick"
          src="@/assets/video/video.mp4"
          muted
          autoplay
          width="100%"
          loop
          crossorigin="anonymous"
        />
      </a-card>
      <br />
      <a-card title="Video2" style="width: 100%; border: none">
        <video src="@/assets/video/video2.mp4" muted autoplay width="100%" loop crossorigin="anonymous" />
      </a-card>
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
export default {
  data() {
    return {
      activeIndex: 1,
      cards: [
        {
          id: '900-74',
          channel: '浙江中略8段',
          longitude: 121.4787,
          latitude: 31.2348
        },
        {
          id: '906-27',
          channel: '广东番町段',
          longitude: 121.4872,
          latitude: 31.2331
        },
        {
          id: '907-40',
          channel: '广东路2段',
          longitude: 121.4864,
          latitude: 31.3229
        }
      ]
    };
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
    }
  }
};
</script>

<style scoped>
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
