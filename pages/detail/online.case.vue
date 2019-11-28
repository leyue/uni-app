<template>
  <view style="width: 100%">
    <collapse title="线上case" :expand="true">
      <view slot="content" class="content">
        <scroll-view class="scroll-view_H line" scroll-x="true" scroll-left="0">
          <radio-group style="width: 800upx" @change="onStatusChange">
            <label class="radio">
              <radio class="tiny-radio" value="*" checked="true" />全部
            </label>
            <label class="radio">
              <radio class="tiny-radio" value="confirm" />待确认
            </label>
            <label class="radio">
              <radio class="tiny-radio" value="bug" />BUG
            </label>
            <label class="radio">
              <radio class="tiny-radio" value="failed" />失败项
            </label>
            <label class="radio">
              <radio class="tiny-radio" value="ongoing" />测试中
            </label>
          </radio-group>
        </scroll-view>
        <wuc-tab :tab-list="modules" :tabCur.sync="moduleIdx" @change="onModuleChange" />
        <view class="list-item" v-for="(item, idx) in categorys" :key="idx">
          <view class="list-item">
            <view class="box" :style="{'background-color': '#bec3c7'}">
              <text class="light" style="color: #2c3e52">{{item}}</text>
            </view>
            <view class="list-item" v-for="(cItem, cIdx) in cases[module][item]" :key="cIdx">
              <view class="box">
                <view class="item">
                  <text class="label">名称</text>
                  <text class="light">{{cItem | formatName}}</text>
                </view>
                <view class="item">
                  <text class="label">进度</text>
                  <progress
                    :style="{width: '40%'}"
                    :activeColor="getColor(cItem)"
                    :percent="cItem | calcProgress"
                    stroke-width="3"
                  />
                  <text
                    :style="{'margin-left': '20px', width: '20%', color: getColor(cItem)}"
                  >{{cItem.status1.doName}}</text>
                  <uni-icons
                    :style="{'margin-left': '10px'}"
                    v-if="cItem.log.upload"
                    :color="getColor(cItem)"
                    type="download"
                    size="20"
                    @click="onLogDownload(JSON.parse(JSON.stringify(cItem)))"
                  />
                </view>
                <view v-if="cItem.status1.error" class="item">
                  <text class="label">Error</text>
                  <text class="light" style="{color: red}">{{cItem.status1.error}}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </collapse>
    <download ref="downloadLog" />
  </view>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {uniCard, uniIcons, uniPopup} from '@dcloudio/uni-ui';
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import collapse from '@/components/collapse';
import download from '@/components/download';

export default {
  props: {},
  components: {
    uniCard,
    uniIcons,
    uniPopup,
    collapse,
    WucTab,
    download,
  },
  computed: {
    ...mapState('detail', {}),
    ...mapGetters('detail', ['doc']),
    cases() {
      if (!this.doc) {
        return [];
      }
      let cases = this.doc.archive.cases.online;
      return cases;
    },
    modules() {
      if (!this.doc) {
        return null;
      }
      let cases = this.cases;
      let modules = [];
      for (let key in cases) {
        modules.push({name: key});
      }
      return modules.length ? modules : null;
    },
    module() {
      if (!this.doc || !this.modules) {
        return null;
      }
      let module = this.modules[this.moduleIdx].name;
      return module;
    },
    categorys() {
      if (!this.doc || !this.module) {
        return null;
      }
      let cases = this.cases[this.module];
      let categorys = Object.keys(cases);
      return categorys;
    },
  },
  watch: {},
  filters: {
    formatName(item) {
      let name = item.alias;
      let nameFileds = item.name.split('_');
      let temp = nameFileds[nameFileds.length - 1];
      let id = temp.slice(0, temp.length - 3);
      return `${id}-${name}`;
    },
    calcProgress(item) {
      let val = item.status1.progress;
      val = val.slice(0, val.length - 1);
      return +val;
    },
  },
  data() {
    return {
      moduleIdx: 0,
      items: [],
    };
  },
  methods: {
    getColor(item) {
      let status = item.status1.doName;
      let color = uni.$color.carrot;
      switch (status) {
        case 'ongoing':
          color = uni.$color.orange;
          break;
        case 'owner_confirm':
          color = uni.$color.carrot;
          break;
        case 'passed':
          color = uni.$color.nephritis;
          break;
        case 'failed':
          color = uni.$color.pomegranate;
          break;
      }
      return color;
    },
    onStatusChange(e) {
      this.$store.commit('detail/setOnlineStatus', e.target.value);
    },
    onModuleChange(idx) {},
    onLogDownload(item) {
      let url = `https://nats-sh.unisoc.com/nginx/download/logs/test/${this.doc.app}_${this.doc._id}/online${item.log.httpUri}`;
      // let tempFilePath = `/storage/emulated/0/nats/${item.name}.zip`;
      this.$refs.downloadLog.start(url);
    },
  },
};
</script>
<style lang="less">
.content {
  background-color: #fff;
}
.box {
  background-color: #ededed;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 3px;
}
.list-item {
  padding: 0px;
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
  width: 78%;
}
.tiny-radio {
  transform: scale(0.7);
}
</style>
