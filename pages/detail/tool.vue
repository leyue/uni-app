<template>
  <view style="width: 100%">
    <collapse title="工具版本" :expand="false">
      <view slot="content" class="content">
        <view class="list-item" v-for="(item, idx) in items" :key="idx">
          <view class="item">
            <text class="label">名称</text>
            <text class="h-space light">{{item.name}}</text>
          </view>
          <view class="item">
            <text class="label">版本</text>
            <text class="h-space light">{{item.version}}</text>
          </view>
        </view>
      </view>
    </collapse>
  </view>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {uniCard, uniIcons} from '@dcloudio/uni-ui';
import collapse from '../../components/collapse';
export default {
  props: {},
  components: {
    uniCard,
    uniIcons,
    collapse,
  },
  computed: {
    ...mapState('detail', {}),
    ...mapGetters('detail', ['doc']),
    items: {
      get() {
        return this.doc ? this.doc.archive.report.tools : [];
      },
    },
  },
  watch: {},
  filters: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
.content {
  padding: 10upx;
}
.list-item {
  box-sizing: border-box;
  border: 1upx solid #c0c2c4;
  border-radius: 3upx;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 10upx;
  padding-left: 10upx;
  padding-right: 10upx;
}
.list-item::after {
  border: none;
}
.item {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
.label {
  width: 20%;
}
.h-space {
  margin-left: 30upx;
}
.v-space {
  margin-top: 20upx;
}
.light {
  color: #7e8c8d;
  width: 35%;
}
</style>
