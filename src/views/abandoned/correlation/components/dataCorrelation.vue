<template>
  <div class="body-container">
    <div>
      <a-card class="top-container">
        <a-row class="formGraph-container" :gutter="18">

          <a-col :span="12">
            <a-form-model style="height:calc(100% - 50px)" layout="vertical" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-model-item label="选择数据源">
                <a-checkbox-group v-model="form.type">
                  <a-checkbox value="1" name="type">
                    <span style="color: #fff">水系统</span>
                  </a-checkbox>
                  <a-checkbox value="2" name="type">
                    <span style="color: #fff">烟雾传感</span>
                  </a-checkbox>
                  <a-checkbox value="3" name="type">
                    <span style="color: #fff">电气火灾</span>
                  </a-checkbox>
                  <a-checkbox value="4" name="type">
                    <span style="color: #fff">可燃气体</span>
                  </a-checkbox>
                </a-checkbox-group>
              </a-form-model-item>

              <a-form-model-item label="关联算法选择">
                <a-select v-model="form.region" placeholder="请选择关联算法">
                  <a-select-option value="Aprior">
                    Aprior算法
                  </a-select-option>
                  <a-select-option value="FP—G">
                    FP—G算法
                  </a-select-option>
                  <a-select-option value="FreeSpan">
                    FreeSpan算法
                  </a-select-option>
                  <a-select-option value="PrefixSpa">
                    PrefixSpan算法
                  </a-select-option>
                </a-select>
              </a-form-model-item>

              <a-form-model-item label="选择起止时间">
                <a-range-picker
                  :show-time="{ format: 'HH:mm' }"
                  format="YYYY-MM-DD HH:mm"
                  :placeholder="['Start Time', 'End Time']"
                />
              </a-form-model-item>

              <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="showGraph()">
                  生成关联分析
                </a-button>
                <a-button style="margin-left: 10px;">
                  重置
                </a-button>
              </a-form-model-item>
            </a-form-model>
          </a-col>

          <a-col :span="12">
            <data-corr-graph class="chart-line"></data-corr-graph>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>

</template>

<script>
import DataCorrGraph from "@/views/correlation/components/dataCorrGraph";
export default {
  name: "dataCorrelation",
  components: {  DataCorrGraph },
  data() {
    return {
      showDataGraph: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    };
  },
  methods: {
    showGraph() {
      this.form.showDataGraph = !this.form.showDataGraph;
      console.log(this.form.showDataGraph);
    },
  },
};
</script>

<style lang="scss" scoped>
.body-container {
  padding: 10px;
  border: none;
  margin: 0 auto;
  .top-container {
    border: none;
    margin: 10px;
    width: 99%;

    .formGraph-container {
      height: 500px;
      box-sizing: border-box;

      .chart-line {

        height: 450px;
        width: 100%;
      }

    }
  }
}





</style>