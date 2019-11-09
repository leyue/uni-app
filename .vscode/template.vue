<template>
  <view style="width: 100%">
    <collapse :title="app">
      <view slot="content">
        <view>
          <text>ssss</text>
        </view>
      </view>
    </collapse>
  </view>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {uniIcons} from '@dcloudio/uni-ui';
import collapse from '../../components/collapse';
export default {
  props: {},
  components: {
    uniCard,
    uniIcons,
    mpvuePicker,
    collapse,
  },
  computed: {
    ...mapState('detail', {}),
    ...mapGetters('detail', ['doc']),
  },
  watch: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
.item {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
.label {
  width: 20%;
}
.space {
  margin-left: 30upx;
}
.light {
  color: #7e8c8d;
  width: 60%;
}
</style>
