<template>
  <scroll-view>
    <view class="content">
      <view>
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

export default {
  components: {
    detailBasic: basic,
    detailModule: module,
    detailCategory: category,
    detailPwr: pwr,
    detailStability: stability,
    detailTool: tool,
    detailBug: bug,
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
    await uni.$func.mSleep(10);
    await this.$store.dispatch('detail/setApp', e.app);
    uni.hideLoading();
  },
};
</script>

<style>
.content {
  padding-left: 10upx;
  padding-right: 10upx;
}
.v-space {
  margin-top: 10upx;
  padding-left: 10upx;
  padding-right: 10upx;
}
</style>
