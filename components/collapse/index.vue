<template>
  <view class="body">
    <slot name="header">
      <view class="header item" @click="onExpand">
        <text :style="{color}">{{title}}</text>
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
    color: {type: String, default: '#2c3e52'},
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
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #fff;
}
.header {
  padding-left: 0upx;
  padding-right: 0upx;
  border-bottom: 0upx solid #c0c2c4;
  font-weight: 700;
}
.content {
  padding-left: 0upx;
  padding-right: 0upx;
  background-color: #fff;
}
.item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
