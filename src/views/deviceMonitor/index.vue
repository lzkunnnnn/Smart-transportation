<template>
  <div class="index-container  border-box" >
    <card-list @sendTitle="returnTable" />
    <a-card class="top-container">
    <keep-alive>
      <component :is="sensorTable"></component>
    </keep-alive>
    </a-card>
  </div>
</template>

<script>
import { cardList} from './components';
import DepartmentSelection from './components/departmentSelection.vue';
import sensorTable1 from './components/sensorTable1.vue';
import sensorTable2 from './components/sensorTable2.vue';
import sensorTable3 from './components/sensorTable3.vue';
import sensorTable4 from './components/sensorTable4.vue';
export default {
  name: 'index',
  components: {
    cardList,
    DepartmentSelection,
    sensorTable1,
    sensorTable2,
    sensorTable3,
    sensorTable4
  },
  data() {
    return {
      sensorTable:'sensorTable2'
    };
  },
  methods:{
    returnTable(table){
      this.sensorTable=table
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
  .tableContainer{
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
