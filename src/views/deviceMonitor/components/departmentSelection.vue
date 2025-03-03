<template>
  <div>
    <a-dropdown-button @click="handleButtonClick">
      设备类型
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="1"> <a-icon type="user" />烟雾传感器 </a-menu-item>
        <a-menu-item key="2"> <a-icon type="user" />燃气数据 </a-menu-item>
        <a-menu-item key="3"> <a-icon type="user" />红外数据 </a-menu-item>
        <a-menu-item key="4"> <a-icon type="user" />消火栓数据 </a-menu-item>
      </a-menu>
    </a-dropdown-button>

    <a-dropdown>
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="1"> <a-icon type="user" />一号楼 </a-menu-item>
        <a-menu-item key="2"> <a-icon type="user" />二号楼 </a-menu-item>
        <a-menu-item key="3"> <a-icon type="user" />三号楼 </a-menu-item>
      </a-menu>
      <a-button style="margin-left: 8px"> 地址 <a-icon type="down" /> </a-button>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    handleButtonClick(e) {
      console.log('click left button', e);
    },
    handleMenuClick(e) {
      console.log('click', e);
    },
  },
};

</script>