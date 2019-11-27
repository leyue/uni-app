<template>
  <scroll-view>
    <view class="content">
      <view class="v-space">
        <detail-basic />
      </view>
      <view class="v-space">
        <detail-module />
      </view>
      <view class="v-space">
        <detail-category />
      </view>
      <view class="v-space">
        <detail-pwr />
      </view>
      <view class="v-space">
        <detail-stability />
      </view>
      <view class="v-space">
        <detail-tool />
      </view>
      <view class="v-space">
        <detail-bug />
      </view>
      <view class="v-space">
        <detail-online-case />
      </view>
      <view class="v-space">
        <detail-offline-case />
      </view>
    </view>
  </scroll-view>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import basic from './basic';
import module from './module';
import category from './category';
import pwr from './pwr';
import stability from './stability';
import tool from './tool';
import bug from './bug';
import onlineCase from './online.case';
import offlineCase from './offline.case';

export default {
  components: {
    detailBasic: basic,
    detailModule: module,
    detailCategory: category,
    detailPwr: pwr,
    detailStability: stability,
    detailTool: tool,
    detailBug: bug,
    detailOnlineCase: onlineCase,
    detailOfflineCase: offlineCase,
  },
  computed: {},
  watch: {},
  data() {
    return {};
  },
  methods: {},
  async onLoad(e) {
    uni.showLoading({
      title: '加载中...',
      mask: false,
    });
    await uni.$ax.login();
    await uni.$func.mSleep(1);
    let app = decodeURIComponent(e.scene);
    if (app == 'undefined') {
      app = e.app || 'SWVT201908070219014bbd';
    }
    console.log(app);
    await this.$store.dispatch('detail/setApp', app);
    uni.hideLoading();
  },
};
</script>

<style lang="less">
.content {
  background-color: #ededed;
}
.v-space {
  margin-bottom: 10upx;
}
</style>
