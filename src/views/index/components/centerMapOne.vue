<template>
  <baidu-map
    class="bm-view"
    ak="moztYOzxcFx8dQuLzrLdtkgAxFuH4MOA"
    :center="{ lng: 126.644, lat: 45.7246 }"
    :zoom="13"
    :scroll-wheel-zoom="true"
    :mapStyle="mapStyle"
    @ready="handler"
  >
    <bm-panorama></bm-panorama>
    <!--标记点-->
    <bm-marker :position="{ lng: 126.6247, lat: 45.7662 }" :dragging="true" @click="infoWindowOpen">
      <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">
        <p style="font-weight: bold; color: red">本校</p>
        <p style="font-weight: bold"><a>位置：东北林业大学</a></p>
      </bm-info-window>
    </bm-marker>

    <!--    <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>-->

    <!--热力图-->
    <bml-heatmap :data="data" :max="100" :radius="20"></bml-heatmap>
  </baidu-map>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
import { BmlHeatmap, BmNavigation, BmPanorama, BmMarker, BmInfoWindow, BmOverviewMap } from 'vue-baidu-map';
export default {
  name: 'centerMapOne',
  components: {
    BaiduMap,
    BmlHeatmap,
    BmNavigation,
    BmPanorama,
    BmMarker,
    BmInfoWindow,
    BmOverviewMap
  },
  data() {
    return {
      data: [
        //118.79398,32.041966
        { lng: 126.6247, lat: 45.7662, count: 1000 },
        //118.79391,32.041831
        { lng: 126.6022, lat: 45.7017, count: 2000 },
        //118.840988,31.990256
        { lng: 126.664, lat: 45.7046, count: 1000 }
        // ...此处添加更多的数据集
      ],
      mapStyle: {
        styleJson: [
          {
            featureType: 'land',
            elementType: 'geometry',
            stylers: {
              //114	118	130
              color: '#1f2638'
            }
          },
          {
            featureType: 'building',
            elementType: 'geometry',
            stylers: {
              color: '#2b2b2b'
            }
          },
          {
            featureType: 'highway',
            elementType: 'all',
            stylers: {
              lightness: -42,
              saturation: -91
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry',
            stylers: {
              lightness: -77,
              saturation: -94
            }
          },
          {
            featureType: 'green',
            elementType: 'geometry',
            stylers: {
              color: '#1b1b1b'
            }
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: {
              color: '#181818'
            }
          },
          {
            featureType: 'subway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#181818'
            }
          },
          {
            featureType: 'railway',
            elementType: 'geometry',
            stylers: {
              lightness: -52
            }
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#313131'
            }
          },
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#8b8787'
            }
          },
          {
            featureType: 'manmade',
            elementType: 'geometry',
            stylers: {
              color: '#1b1b1b'
            }
          },
          {
            featureType: 'local',
            elementType: 'geometry',
            stylers: {
              lightness: -75,
              saturation: -91
            }
          },
          {
            featureType: 'subway',
            elementType: 'geometry',
            stylers: {
              lightness: -65
            }
          },
          {
            featureType: 'railway',
            elementType: 'all',
            stylers: {
              lightness: -40
            }
          },
          {
            featureType: 'boundary',
            elementType: 'geometry',
            stylers: {
              color: '#8b8787',
              weight: '1',
              lightness: -29
            }
          }
        ]
      },
      show: false
    };
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
    },
    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen() {
      this.show = true;
    }
  }
};
</script>

<style lang="less" scoped>
.bm-view {
  width: 100%;
  height: 200px;
}
</style>
