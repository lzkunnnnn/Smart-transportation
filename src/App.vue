<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  }
};
</script>

<style lang="less">
/* 去掉百度地图logo--begin */
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
/* 去掉百度地图logo--end */
</style>
