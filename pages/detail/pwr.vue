<template>
  <view style="width: 100%">
    <collapse title="结果汇总 --- 电流" :expand="false">
      <view slot="content" class="content">
        <view class="list-item" v-for="(item, idx) in items" :key="idx">
          <view class="item">
            <text class="label">名称</text>
            <text class="h-space light">{{item.item}}</text>
          </view>
          <view class="item">
            <text class="label">值</text>
            <text class="h-space light">{{item.value}}</text>
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
        return this.doc ? this.doc.archive.report.power : [];
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
<style lang="less">
.content {
  background-color: #fff;
}
.list-item {
  background-color: #ededed;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 3px;
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
  width: 75%;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
