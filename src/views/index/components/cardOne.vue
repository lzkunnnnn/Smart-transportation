<template>
  <div class="main-box">
    <a-row :gutter="12" class="main-row-box">
      <a-col :span="8" class="quarter-div">
        <div class="card-item card-item-one">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="alert" :size="20"/>报警数</a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="cardList.alarmNum" :duration="2200" />
            <span class="suffix"></span>
          </div>
        </div>
      </a-col>
      <a-col :span="8" class="quarter-div">
        <div class="card-item card-item-two">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="bell" :size="20" />预警数</a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="cardList.warningNum" :duration="2200" />
            <span class="suffix"></span>
          </div>
        </div>
      </a-col>
      <a-col :span="8" class="quarter-div">
        <div class="card-item card-item-three">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="complete" :size="20" />已处理</a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="cardList.dealNum" :duration="2200" />
            <span class="suffix"></span>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="12" class="main-row-box">
      <a-col :span="8" class="quarter-div">
        <div class="card-item card-item-four">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="fault" :size="20" />设备数</a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="cardList.deviceNum" :duration="2200" />
            <span class="suffix"></span>
          </div>
        </div>
      </a-col>
      <a-col :span="8" class="quarter-div">
        <div class="card-item card-item-five">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="check" :size="20" />在线数</a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="cardList.onlineNum" :duration="2200" />
            <span class="suffix"></span>
          </div>
        </div>
      </a-col>
      <a-col :span="8" class="quarter-div">
        <div class="card-item card-item-six">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="label" :size="20" />故障数</a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="cardList.faultNum" :duration="2200" />
            <span class="suffix"></span>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>

</template>

<script>
import countTo from 'vue-count-to';
export default {
  name: 'cardOne',
  components: { countTo },
  props:['cardList'],
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    sendTitle(title, key) {
      this.$emit('sendTitle', title, key);
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../../../styles/mixin';
.main-box{
  width: 100%;
  height: 100%;
  .main-row-box{
    margin-bottom: 12px;
    height: 120px;
  }
  .quarter-div{
    width: 33.33%;
    height: 100%;
    .card-item {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 15px 15px 0;
      border-radius: 6px;
      cursor: pointer;
      box-shadow: 3px 5px 15px rgba(40, 40, 40, 0.36);
      &.card-item-one {
        @include cardBg(#e54f4f, #ef755f);
        &:hover {
          box-shadow: 0 5px 10px #f86364;
        }
      }
      &.card-item-two {
        @include cardBg(#ea677c, #ef755f);
        &:hover {
          box-shadow: 0 5px 10px #c97afd;
        }
      }
      &.card-item-three {
        @include cardBg(#f69a3d, #fcbc73);
        &:hover {
          box-shadow: 0 5px 10px #737bfc;
        }
      }
      &.card-item-four {
        @include cardBg(#6772ea, #5fefef);
        &:hover {
          box-shadow: 0 5px 10px #ef9b5f;
        }
      }
      &.card-item-five {
        @include cardBg(#42d756, #a6e25f);
        &:hover {
          box-shadow: 0 5px 10px #a6e25f;
        }
      }
      &.card-item-six {
        @include cardBg(#fccd25, #ffe793);
        &:hover {
          box-shadow: 0 5px 10px #f0d99c;
        }
      }
      &:hover {
        transform: scale(1.03);
        transition: all 0.1s ease-out;
      }
      .card-title {
        color: #fff;
        margin-top: 8px;
        margin-left: 4px;
        font-size: 1rem;
      }
      .all-count {
        color: #fff;
        font-size: 1rem;
        font-weight: bold;
        margin-top: 12px;
        padding-left: 30px;
        .suffix {
          font-size: 0.75rem;
        }
      }
    }
  }
}

</style>
