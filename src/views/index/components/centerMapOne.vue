<template>
  <baidu-map
    class="bm-view"
    ak="moztYOzxcFx8dQuLzrLdtkgAxFuH4MOA"
    :center="center"
    :zoom="13"
    :scroll-wheel-zoom="true"
    :mapStyle="mapStyle"
    @ready="handler"
    @click="handleMapClick"
  >
    <bm-panorama></bm-panorama>

    <!--静态标记点-->
    <!--     <bm-marker :position="markerPosition" :dragging="true" @click="infoWindowOpen">
      <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">
        <p style="font-weight: bold; color: red">本校</p>
        <p style="font-weight: bold"><a>位置：东北林业大学</a></p>
      </bm-info-window>
    </bm-marker>
 -->

    <!--动态生成的标记点-->
    <bm-marker
      v-for="(marker, index) in dynamicMarkers"
      :key="index"
      :position="marker.position"
      @click="() => infoWindowOpenDynamic(index)"
    >
      <bm-info-window
        :show="marker.show"
        @close="() => infoWindowCloseDynamic(index)"
        @open="() => infoWindowOpenDynamic(index)"
      >
        <p style="font-weight: bold; color: red">事故地点</p>
        <p style="font-weight: bold">
          <a>位置：{{ marker.address }}</a>
        </p>
      </bm-info-window>
    </bm-marker>

    <!--热力图-->
    <bml-heatmap :data="dynamicHeatmapData" :max="100" :radius="20"></bml-heatmap>
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
      center: { lng: 126.644, lat: 45.7246 },
      markerPosition: { lng: 126.6247, lat: 45.7662 },
      data: [
        { lng: 126.6247, lat: 45.7662, count: 1000 },
        { lng: 126.6022, lat: 45.7017, count: 2000 },
        { lng: 126.664, lat: 45.7046, count: 1000 }
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
      show: false,
      dynamicHeatmapData: [],
      dynamicMarkers: [],
      geocoder: null,
      map: null,
      BMap: null
    };
  },
  methods: {
    handler({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
      this.geocoder = new BMap.Geocoder(); // 初始化Geocoder
      this.startGeneratingData();
    },
    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen() {
      this.show = true;
    },
    infoWindowCloseDynamic(index) {
      this.dynamicMarkers[index].show = false;
    },
    infoWindowOpenDynamic(index) {
      this.dynamicMarkers[index].show = true;
    },
    handleMapClick(e) {
      const { lng, lat } = e.point;
      // 使用Geocoder获取地名
      this.geocoder.getLocation(e.point, result => {
        if (result) {
          const address = result.address;
          this.$emit('location', { address, lng, lat });
        }
      });
    },
    startGeneratingData() {
      setInterval(() => {
        this.generateNewData();
      }, 6000); // 每6秒生成新的热力图数据和标记
    },
    generateNewData() {
      const newLng = this.center.lng + (Math.random() - 0.5) * 0.1;
      const newLat = this.center.lat + (Math.random() - 0.5) * 0.1;
      const newDataPoint = { lng: newLng, lat: newLat, count: Math.floor(Math.random() * 1000) };

      // 添加新的热力图数据
      this.dynamicHeatmapData.push(newDataPoint);

      // 使用Geocoder获取地名
      this.geocoder.getLocation(new this.BMap.Point(newLng, newLat), result => {
        if (result) {
          const address = result.address;

          // 添加新的标记
          const newMarker = {
            position: { lng: newLng, lat: newLat },
            address: address,
            show: false // 初始状态为关闭
          };
          this.dynamicMarkers.push(newMarker);

          // 设置定时器，几分钟后移除热力图数据和标记
          setTimeout(() => {
            this.dynamicHeatmapData = this.dynamicHeatmapData.filter(point => point !== newDataPoint);
            this.dynamicMarkers = this.dynamicMarkers.filter(marker => marker !== newMarker);
          }, 10000); // 3分钟后移除
        }
      });
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
