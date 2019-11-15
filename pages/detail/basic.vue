<template>
  <view style="width: 100%">
    <collapse :title="`${app}-${allStatus}`" :expand="true">
      <view slot="content" class="content">
        <view class="item">
          <text class="label">项目-仪表</text>
          <text class="h-space light">{{`${pro}-${ins}`}}</text>
          <view style="flex: 2" />
          <uni-icons
            v-if="enablePicker"
            style="margin-right: 20upx"
            type="arrowright"
            size="20"
            @click="pickerProInsShow"
          />
        </view>
        <view class="item">
          <text class="label">状态</text>
          <text class="h-space light">{{doc.status.name}}</text>
        </view>
        <view class="item">
          <text class="label">类型</text>
          <text class="h-space light">{{doc.type}}</text>
        </view>
        <view class="item">
          <text class="label">HW</text>
          <text class="h-space light">{{doc.element.hw}}</text>
        </view>
        <view class="item">
          <text class="label">阶段</text>
          <text class="h-space light">{{doc.element.casePhase}}</text>
        </view>
        <view class="item">
          <text class="label">任务</text>
          <text class="h-space light">{{doc.archive.name}}</text>
        </view>
        <view class="item">
          <text class="label">软件版本</text>
          <text class="h-space light">{{doc.depend.pac0}}</text>
        </view>
        <view class="item">
          <text class="label">工具路径</text>
          <text class="h-space light">{{doc.element.tool}}</text>
        </view>
        <view class="item">
          <text class="label">描述</text>
          <text class="h-space light">{{doc.desc}}</text>
        </view>
        <view class="item">
          <text class="label">提交者</text>
          <text class="h-space light">{{doc.committer}}</text>
        </view>
        <mpvue-picker
          ref="pickerProIns"
          mode="multiLinkageSelector"
          deepLength="2"
          :pickerValueDefault="pickerVal"
          :themeColor="$color.nephritis"
          @onChange="pickerProInsOnChange"
          @onConfirm="pickerProInsOnConfirm"
          @onCancel="pickerProInsOnCancel"
          :pickerValueArray="proIns"
        />
      </view>
    </collapse>
  </view>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {uniCard, uniIcons} from '@dcloudio/uni-ui';
import collapse from '../../components/collapse';
import mpvuePicker from 'mpvue-picker';
export default {
  props: {},
  components: {
    uniCard,
    collapse,
    uniIcons,
    mpvuePicker,
  },
  computed: {
    ...mapState('detail', {
      app: state => {
        return state.app.toUpperCase();
      },
      allStatus: state => {
        return state.status.toUpperCase();
      },
      pro: state => {
        return state.pro.toUpperCase();
      },
      ins: state => {
        return state.ins.toUpperCase();
      },
    }),
    ...mapGetters('detail', ['doc', 'proIns']),
    enablePicker() {
      return this.$store.state.detail.docs.length > 1;
    },
    status() {
      return this.doc ? this.doc.status.name : '...';
    },
  },
  watch: {},
  data() {
    return {
      pickerVal: [0, 0],
    };
  },
  methods: {
    pickerProInsShow(e) {
      this.$refs.pickerProIns.show();
    },
    pickerProInsOnChange(e) {},
    pickerProInsOnCancel(e) {},
    pickerProInsOnConfirm(e) {
      let pro = this.proIns[e.index[0]].label;
      let ins = this.proIns[e.index[0]].children[e.index[1]].label;
      this.$store.commit('detail/setPro', pro);
      this.$store.commit('detail/setIns', ins);
    },
  },
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
  word-wrap: break-word;
  word-break: break-all;
  width: 78%;
}
</style>
