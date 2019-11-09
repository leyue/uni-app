<template>
  <scroll-view>
    <view class="content">
      <view>
        <detail-basic />
      </view>
      <view class="v-space">
        <detail-module />
      </view>
    </view>
  </scroll-view>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import basic from './basic';
import module from './module';

export default {
  components: {
    detailBasic: basic,
    detailModule: module,
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
