<template>
  <div class="index-container  border-box" >
    <card-list @sendTitle="getTitle" />
    <sensor-table/>
  </div>
</template>

<script>
import { cardList,sensorTable} from './components';
export default {
  name: 'index',
  components: {
    cardList,
    sensorTable
  },
  data() {
    return {
    };
  },

};
</script>
<style lang="scss" scoped>
.index-container {
  padding: 24px;
  background: #f0f2f5;
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
