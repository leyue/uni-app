<template>
  <view class="body">
    <slot name="header">
      <view class="header item" @click="onExpand">
        <text>{{title}}</text>
        <view style="flex:2" />
        <uni-icons :type="iconName" size="20" />
      </view>
    </slot>
    <view class="content" v-show="props.expand">
      <slot name="content" />
    </view>
  </view>
</template>

<script>
import {uniIcons} from '@dcloudio/uni-ui';
export default {
  components: {
    uniIcons,
  },
  props: {
    title: {type: String, default: '...'},
    expand: {type: Boolean, default: true},
  },
  data() {
    return {
      props: {
        expand: true,
      },
      iconName: 'arrowup',
    };
  },
  watch: {
    expand(newV, oldV) {
      this.props.expand = newV;
    },
    'props.expand'(newV, oldV) {
      this.iconName = newV ? 'arrowup' : 'arrowdown';
    },
  },
  onReady(e) {
    this.props.expand = this.expand;
  },
  methods: {
    onExpand(e) {
      this.props.expand = !this.props.expand;
    },
  },
};
</script>

<style>
.body {
  border: 1upx solid #c0c2c4;
  border-radius: 3upx;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
}
.header {
  padding-left: 30upx;
  padding-right: 30upx;
  border-bottom: 1upx solid #c0c2c4;
}
.content {
  padding-left: 0upx;
  padding-right: 0upx;
}
.item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
