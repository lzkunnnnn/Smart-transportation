<template>
  <div class="cardList-wrapper">
    <a-row :gutter="24">
      <a-col :xs="12" :md="12" :sm="12" :lg="4">
        <div class="card-item card-item-one" @click="sendTitle('燃气数据', 'visit')">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="smokeSystem" :size="20" /> 违停抓拍设备 </a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="$store.state.deviceState.parkNum" :duration="2200" />
            <span class="suffix">个</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right: 20px" class="inline-block">
                运转正常：
                <a-space :size="8">
                  <span class="bold"
                    >{{ $store.state.deviceState.parkNum - $store.state.deviceState.parkNumAbnormal }}个</span
                  >
                  <a-icon type="caret-down" class="down" />
                </a-space>
              </div>
              <div class="inline-block">
                运转异常：
                <a-space :size="8">
                  <span class="bold">{{ $store.state.deviceState.parkNumAbnormal }}个</span>
                  <a-icon type="caret-up" class="down" />
                </a-space>
              </div>
            </div>
          </div>
        </div>
      </a-col>

      <a-col :xs="12" :md="12" :sm="12" :lg="4">
        <div class="card-item card-item-two" @click="sendTitle2('燃气数据', 'visit')">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="waterSystem" :size="20" /> 卡口摄像头 </a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="$store.state.deviceState.checkNum" :duration="2200" />
            <span class="suffix">个</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right: 20px" class="inline-block">
                运转正常：
                <a-space :size="8">
                  <span class="bold"
                    >{{ $store.state.deviceState.checkNum - $store.state.deviceState.checkNumAbnormal }}个</span
                  >
                  <a-icon type="caret-down" class="down" />
                </a-space>
              </div>
              <div class="inline-block">
                运转异常：
                <a-space :size="8">
                  <span class="bold">{{ $store.state.deviceState.checkNumAbnormal }}个</span>
                  <a-icon type="caret-up" class="down" />
                </a-space>
              </div>
            </div>
          </div>
        </div>
      </a-col>

      <a-col :xs="12" :md="12" :sm="12" :lg="4">
        <div class="card-item card-item-three" @click="sendTitle3('电气数据', 'shopCard')">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="electronicSystem" :size="20" />流量监控设备</a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="$store.state.deviceState.flowNum" :duration="2200" />
            <span class="suffix">个</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right: 20px" class="inline-block">
                运转正常：
                <a-space :size="8">
                  <span class="bold"
                    >{{ $store.state.deviceState.flowNum - $store.state.deviceState.flowNumAbnormal }}个</span
                  >
                  <a-icon type="caret-down" class="down" />
                </a-space>
              </div>
              <div class="inline-block">
                运转异常：
                <a-space :size="8">
                  <span class="bold">{{ $store.state.deviceState.flowNumAbnormal }}个</span>
                  <a-icon type="caret-up" class="down" />
                </a-space>
              </div>
            </div>
          </div>
        </div>
      </a-col>

      <a-col :xs="12" :md="12" :sm="12" :lg="4">
        <div class="card-item card-item-four" @click="sendTitle4('支付数', 'pay')">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="gasSystem" :size="20" /> 区间测速设备 </a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="$store.state.deviceState.speedNum" :duration="2200" />
            <span class="suffix">个</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right: 20px" class="inline-block">
                运转正常：
                <a-space :size="8">
                  <span class="bold"
                    >{{ $store.state.deviceState.speedNum - $store.state.deviceState.speedNumAbnormal }}个</span
                  >
                  <a-icon type="caret-down" class="down" />
                </a-space>
              </div>
              <div class="inline-block">
                运转异常：
                <a-space :size="8">
                  <span class="bold">{{ $store.state.deviceState.speedNumAbnormal }}个</span>
                  <a-icon type="caret-up" class="down" />
                </a-space>
              </div>
            </div>
          </div>
        </div>
      </a-col>

      <a-col :xs="12" :md="12" :sm="12" :lg="4">
        <div class="card-item card-item-five" @click="sendTitle5('电气数据', 'shopCard')">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="electronicSystem" :size="20" /> 车道监测</a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="$store.state.deviceState.laneNum" :duration="2200" />
            <span class="suffix">个</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right: 20px" class="inline-block">
                运转正常：
                <a-space :size="8">
                  <span class="bold"
                    >{{ $store.state.deviceState.laneNum - $store.state.deviceState.laneNumAbnormal }}个</span
                  >
                  <a-icon type="caret-down" class="down" />
                </a-space>
              </div>
              <div class="inline-block">
                运转异常：
                <a-space :size="8">
                  <span class="bold">{{ $store.state.deviceState.laneNumAbnormal }}个</span>
                  <a-icon type="caret-up" class="down" />
                </a-space>
              </div>
            </div>
          </div>
        </div>
      </a-col>

      <a-col :xs="12" :md="12" :sm="12" :lg="4">
        <div class="card-item card-item-six" @click="sendTitle6('电气数据', 'shopCard')">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="electronicSystem" :size="20" /> 环境监测</a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="$store.state.deviceState.environmentNum" :duration="2200" />
            <span class="suffix">个</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right: 20px" class="inline-block">
                运转正常：
                <a-space :size="8">
                  <span class="bold"
                    >{{
                      $store.state.deviceState.environmentNum - $store.state.deviceState.environmentNumAbnormal
                    }}个</span
                  >
                  <a-icon type="caret-down" class="down" />
                </a-space>
              </div>
              <div class="inline-block">
                运转异常：
                <a-space :size="8">
                  <span class="bold">{{ $store.state.deviceState.environmentNumAbnormal }}个</span>
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

export default {
  name: 'cardList',
  components: { countTo },
  data() {
    return {};
  },
  methods: {
    sendTitle(title, key) {
      this.$emit('sendTitle', 'sensorTable1');
    },
    sendTitle2(title, key) {
      this.$emit('sendTitle', 'sensorTable2');
    },
    sendTitle3(title, key) {
      this.$emit('sendTitle', 'sensorTable3');
    },
    sendTitle4(title, key) {
      this.$emit('sendTitle', 'sensorTable4');
    },
    sendTitle5() {
      this.$emit('sendTitle', 'sensorTable5');
    },
    sendTitle6() {
      this.$emit('sendTitle', 'sensorTable6');
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
    &.card-item-five {
      @include cardBg(#2bae85, #57c3c2);
      &:hover {
        box-shadow: 0 5px 10px #a6e25f;
      }
    }
    &.card-item-six {
      @include cardBg(#eba0b3, #f08e78);
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
