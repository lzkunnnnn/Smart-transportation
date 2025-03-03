<template>
  <div class="cardList-wrapper">
    <a-row :gutter="24">
      <a-col :xs="12" :md="12" :sm="12" :lg="6">
        <div class="card-item card-item-one" @click="sendTitle('燃气数据', 'visit')">
          <div class="card-title">
            <a-space :size="8"> <svg-icon icon="smokeSystem" :size="20" /> 烟雾传感器smog </a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="smogNum" :duration="2200" />
            <span class="suffix">个</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right: 20px" class="inline-block">
                运转正常：
                <a-space :size="8">
                  <span class="bold">{{smogNum-smogNumAbnormal}}个</span>
                  <a-icon type="caret-down" class="down" />
                </a-space>
              </div>
              <div class="inline-block">
                运转异常：
                <a-space :size="8">
                  <span class="bold">{{smogNumAbnormal}}个</span>
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
            <a-space :size="8"> <svg-icon icon="waterSystem" :size="20" /> 水系统water </a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="waterNum" :duration="2200" />
            <span class="suffix">个</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right: 20px" class="inline-block">
                运转正常：
                <a-space :size="8">
                  <span class="bold">{{waterNum-waterNumAbnormal}}个</span>
                  <a-icon type="caret-down" class="down" />
                </a-space>
              </div>
              <div class="inline-block">
                运转异常：
                <a-space :size="8">
                  <span class="bold">{{waterNumAbnormal}}个</span>
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
            <a-space :size="8"> <svg-icon icon="electronicSystem" :size="20" /> 电气系统electricity</a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="elecNum" :duration="2200" />
            <span class="suffix">个</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right: 20px" class="inline-block">
                运转正常：
                <a-space :size="8">
                  <span class="bold">{{ elecNum - elecNumAbnormal }}个</span>
                  <a-icon type="caret-down" class="down" />
                </a-space>
              </div>
              <div class="inline-block">
                运转异常：
                <a-space :size="8">
                  <span class="bold">{{ elecNumAbnormal }}个</span>
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
            <a-space :size="8"> <svg-icon icon="gasSystem" :size="20" /> 可燃气体gas </a-space>
          </div>
          <div class="all-count">
            <count-to :startVal="0" :endVal="gasNum" :duration="2200" />
            <span class="suffix">个</span>
          </div>
          <div class="card-info relative">
            <div class="abs-bottom">
              <div style="margin-right: 20px" class="inline-block">
                运转正常：
                <a-space :size="8">
                  <span class="bold">{{gasNum-gasNumAbnormal}}个</span>
                  <a-icon type="caret-down" class="down" />
                </a-space>
              </div>
              <div class="inline-block">
                运转异常：
                <a-space :size="8">
                  <span class="bold">{{gasNumAbnormal}}个</span>
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
import axios from '@/store/axios';
export default {
  name: 'cardList',
  components: { countTo },
  data() {
    return {
      elecNum:0,
      elecNumAbnormal:0,
      gasNum:0,
      gasNumAbnormal:0,
      waterNum:0,
      waterNumAbnormal:0,
      smogNum:0,
      smogNumAbnormal:0
    };
  },
  created() {
    //elec
    axios.get('sensor/elec/count/all').then(res => {
      this.elecNum = res.data.data;
      console.log(res);
    });
    axios.get('sensor/elec/count/abnormal').then(res => {
      this.elecNumAbnormal = res.data.data;
    });
    //water
    axios.get('sensor/water/count/all').then(res => {
      this.waterNum = res.data.data;
      console.log(res);
    });
    axios.get('sensor/water/count/abnormal').then(res => {
      this.waterNumAbnormal = res.data.data;
    });
    //gas
    axios.get('sensor/gas/count/all').then(res => {
      this.gasNum = res.data.data;
      console.log(res);
    });
    axios.get('sensor/gas/count/abnormal').then(res => {
      this.gasNumAbnormal = res.data.data;
    });
    //smog
    axios.get('sensor/smog/count/all').then(res => {
      this.smogNum = res.data.data;
      console.log(res);
    });
    axios.get('sensor/smog/count/abnormal').then(res => {
      this.smogNumAbnormal = res.data.data;
    });
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
