<template>
  <div class="index-container border-box">
    <card-list @sendTitle="returnTable" />
    <a-card class="top-container">
      <keep-alive>
        <component :is="sensorTable"></component>
      </keep-alive>
    </a-card>
  </div>
</template>

<script>
import {
  cardList,
  sensorTable1,
  sensorTable2,
  sensorTable3,
  sensorTable4,
  sensorTable5,
  sensorTable6
} from './components';
/* import DepartmentSelection from './components/departmentSelection.vue'; */

export default {
  name: 'index',
  components: {
    cardList,
    /*     DepartmentSelection, */
    sensorTable1,
    sensorTable2,
    sensorTable3,
    sensorTable4,
    sensorTable5,
    sensorTable6
  },
  data() {
    return {
      sensorTable: 'sensorTable3'
    };
  },
  mounted(){
    this.$store.dispatch('asyncGetDeviceState');
  },
  methods: {
    returnTable(table) {
      this.sensorTable = table;
    }
  }
};
</script>
<style lang="scss" scoped>
.index-container {
  padding: 24px;
  background: #f0f2f5;
  .top-container {
    border: none;
    width: 100%;
  }
  .sale-card {
    background: #fff;
    width: 100%;
    margin-top: 6px;

    .sale-container {
      margin: 24px 0;
      height: 350px;
      box-sizing: border-box;
      padding: 0 24px;
      .shop-title {
        height: 50px;
        font-size: 1rem;
      }
    }
  }
  .sale-list {
    margin: 25px 0;
  }
  .tableContainer {
    height: 600px;
  }
  .table-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    .filter-wrapper {
      width: 230px;
      .label {
        min-width: 80px;
      }
      .select-width {
        width: 150px;
      }
    }
  }
}
</style>
