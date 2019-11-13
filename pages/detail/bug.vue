<template>
  <view style="width: 100%">
    <collapse title="BUGS" :expand="false">
      <view slot="content" class="content">
        <view class="list-item" v-for="(item, idx) in bugs" :key="idx">
          <view class="item">
            <text class="label">模块</text>
            <text class="h-space light">{{item.module}}</text>
          </view>
          <view class="item">
            <text class="label">CaseID</text>
            <text class="h-space light">{{item.name}}</text>
          </view>
          <view class="item">
            <text class="label">Case别名</text>
            <text class="h-space light">{{item.alias}}</text>
          </view>
          <view class="item">
            <text class="label">BugID</text>
            <text class="h-space light">{{item.bugID}}</text>
          </view>
          <view class="item">
            <text class="label">Bug描述</text>
            <text
              class="h-space light"
              style="color: #334960"
              @click="navigato(`https://bugzilla.unisoc.com/bugzilla/show_bug.cgi?id=${item.bugID}`)"
            >{{item.summary}}</text>
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
  },
  asyncComputed: {
    bugs: {
      async get() {
        if (!this.doc) {
          return [];
        }
        let bugIds = [];
        for (let item of this.doc.archive.report.bugs) {
          bugIds.push(item.bugID);
        }
        if (bugIds.length == 0) {
          return [];
        }
        let res = await uni.$ax.request({
          url: `/bug?where=${JSON.stringify(bugIds)}`,
          method: 'GET',
        });
        let bugs = [];
        for (let item of this.doc.archive.report.bugs) {
          let {bugID, name} = item;
          let bug = res.data.find(n => {
            return n.id == bugID;
          });
          let data = {...item, id: bug.id, summary: bug.summary};
          bugs.push(data);
        }
        return bugs;
      },
    },
  },
  watch: {},
  filters: {},
  data() {
    return {};
  },
  methods: {
    navigato(url) {
      uni.navigateTo({
        url: `/pages/alink/index?url=${url}`,
        success: res => {},
        fail: () => {},
        complete: () => {},
      });
    },
  },
  async onLoad(e) {
    console.log(this.$store);
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
  width: 78%;
}
</style>
