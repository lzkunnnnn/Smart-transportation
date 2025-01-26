<template>
  <div class="cardList-wrapper">
    <a-row :gutter="24">
      <a-col :xs="12" :md="12" :sm="12" :lg="6">
        <div class="card-item card-item-one" @click="sendTitle('燃气数据', 'visit')">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="smokeSystem" :size="20" /> 烟雾传感器 </a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="1367" :duration="2200" />
            <span class="suffix">个</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right:20px" class="inline-block">
                运转正常：
                <a-space :size="8">
                  <span class="bold">114个</span>
                  <a-icon type="caret-down" class="down" />
                </a-space>
              </div>
              <div class="inline-block">
                运转异常：
                <a-space :size="8">
                  <span class="bold">5个</span>
                  <a-icon type="caret-up" class="down" />
                </a-space>
              </div>
            </div>
          </div>
        </div>
      </a-col>

      <a-col :xs="12" :md="12" :sm="12" :lg="6">
        <div class="card-item card-item-two" @click="sendTitle2('燃气数据', 'visit')">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="waterSystem" :size="20" /> 水系统 </a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="1750" :duration="2200" />
            <span class="suffix">个</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right:20px" class="inline-block">
                运转正常：
                <a-space :size="8">
                  <span class="bold">154个</span>
                  <a-icon type="caret-down" class="down" />
                </a-space>
              </div>
              <div class="inline-block">
                运转异常：
                <a-space :size="8">
                  <span class="bold">5个</span>
                  <a-icon type="caret-up" class="down" />
                </a-space>
              </div>
            </div>
          </div>
        </div>
      </a-col>

      <a-col :xs="12" :md="12" :sm="12" :lg="6">
        <div class="card-item card-item-three" @click="sendTitle3('电气数据', 'shopCard')">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="electronicSystem" :size="20" /> 电气系统 </a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="2269" :duration="2200" />
            <span class="suffix">个</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right:20px" class="inline-block">
                运转正常：
                <a-space :size="8">
                  <span class="bold">191个</span>
                  <a-icon type="caret-down" class="down" />
                </a-space>
              </div>
              <div class="inline-block">
                运转异常：
                <a-space :size="8">
                  <span class="bold">9个</span>
                  <a-icon type="caret-up" class="down" />
                </a-space>
              </div>
            </div>
          </div>
        </div>
      </a-col>

      <a-col :xs="12" :md="12" :sm="12" :lg="6">
        <div class="card-item card-item-four" @click="sendTitle4('支付数', 'pay')">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="gasSystem" :size="20" /> 可燃气体 </a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="3996" :duration="2200" />
            <span class="suffix">个</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right:20px" class="inline-block">
                运转正常：
                <a-space :size="8">
                  <span class="bold">810个</span>
                  <a-icon type="caret-down" class="down" />
                </a-space>
              </div>
              <div class="inline-block">
                运转异常：
                <a-space :size="8">
                  <span class="bold">5个</span>
                  <a-icon type="caret-up" class="down" />
                </a-space>
              </div>
            </div>
          </div>
        </div>
      </a-col>

    </a-row>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
import { sensorTable1, sensorTable2 } from '.';
export default {
  name: 'cardList',
  components: { countTo },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    sendTitle(title, key) {
      this.$emit("sendTitle", "sensorTable1");
    },
    sendTitle2(title, key) {
      this.$emit("sendTitle", "sensorTable2");
    },
    sendTitle3(title, key) {
      this.$emit("sendTitle", "sensorTable3");
    },
    sendTitle4(title, key) {
      this.$emit("sendTitle", "sensorTable4");
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../../styles/mixin';

.cardList-wrapper {
  .card-item {
    box-sizing: border-box;
    height: 150px;
    padding: 15px 15px 0;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 25px;
    box-shadow: 3px 5px 15px rgba(40, 40, 40, 0.36);
    &.card-item-one {
      @include cardBg(#58595a, #aeaab0);
      &:hover {
        box-shadow: 0 5px 10px #c97afd;
      }
    }
    &.card-item-two {
      @include cardBg(#0c65a0, #767ef4);
       &:hover {
        box-shadow: 0 5px 10px #737bfc;
      }
    }
    &.card-item-three {
      @include cardBg(#899002, #c6e20f);
       &:hover {
        box-shadow: 0 5px 10px #ef9b5f;
      }
    }
    &.card-item-four {
      @include cardBg(#df4209, #f08e78);
       &:hover {
        box-shadow: 0 5px 10px #a6e25f;
      }
    }
    &:hover {
      transform: scale(1.03);
      transition: all 0.1s ease-out;
    }
    .card-title {
      color: #fff;
      font-size: 1rem;
    }
    .all-count {
      color: #fff;
      font-size: 1.9rem;
      font-weight: bold;
      margin-top: 12px;
      padding-left: 25px;
      .suffix {
        font-size: 0.75rem;
      }
    }
    .card-info {
      color: #fff;
      font-size: 0.85rem;
      height: 46px;
      margin-top: 8px;
      .abs-bottom {
        position: absolute;
        bottom: 7px;
        left: 0;
      }
      .up {
        color: #1afa29;
      }
      .down {
        color: rgb(250, 30, 16);
      }
    }
  }
}
</style>
