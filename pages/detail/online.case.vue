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
        <view class="list-item box" v-for="(item, idx) in categorys" :key="idx">
          <view class="list-item">
            <view>
              <text class="light" style="color: #2c3e52">{{item}}</text>
            </view>
            <view class="list-item line" v-for="(cItem, cIdx) in cases[module][item]" :key="cIdx">
              <view class="item">
                <text class="label">名称</text>
                <text class="light">{{cItem | formatName}}</text>
              </view>
              <view class="item">
                <text class="label">进度</text>
                <progress style="width: 60%" :percent="cItem | calcProgress" stroke-width="3" />
                <uni-icons
                  v-if="cItem.log.upload"
                  style="margin-left: 20upx"
                  type="download"
                  size="20"
                  @click="onLogDownload(JSON.parse(JSON.stringify(cItem)))"
                />
              </view>
              <view class="item">
                <text class="label">状态</text>
                <text class="light">{{cItem.status1.doName}}</text>
              </view>
              <view></view>
            </view>
          </view>
        </view>
      </view>
    </collapse>
  </view>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {uniCard, uniIcons} from '@dcloudio/uni-ui';
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import collapse from '../../components/collapse';
export default {
  props: {},
  components: {
    uniCard,
    uniIcons,
    collapse,
    WucTab,
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
    onStatusChange(e) {
      this.$store.commit('detail/setOnlineStatus', e.target.value);
    },
    onModuleChange(idx) {},
    onLogDownload(item) {
      let url = `http://nats-sh.unisoc.com:30001/nginx/download/logs/test/${this.doc.app}_${this.doc._id}/online${item.log.httpUri}`;
      console.log(url);
      const task = uni.downloadFile({
        url,
        // tempFilePath: '',
        success: res => {
          console.log(res);
        },
        fail: () => {},
        complete: () => {
          uni.saveFile();
        },
      });
      task.onProgressUpdate(res => {
        console.log('下载进度' + res.progress);
        console.log('已经下载的数据长度' + res.totalBytesWritten);
        console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
        // 测试条件，取消下载任务。
        if (res.progress > 50) {
          task.abort();
        }
      });
    },
  },
};
</script>
<style>
.content {
  padding: 10upx;
}
.line {
  border-bottom: 1upx dashed #c0c2c4;
}
.box {
  box-sizing: border-box;
  border: 1upx solid #c0c2c4;
  border-radius: 3upx;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
}
.list-item {
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
  width: 75%;
}
.tiny-radio {
  transform: scale(0.7);
}
</style>
