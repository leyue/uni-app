<template>
  <view>
    <uni-popup ref="popupDownload" type="center" :mask-click="false">
      <view class="content">
        <uni-icons class="close" color="#f4511e" type="closeempty" size="30" @click="close" />
        <view class="item">
          <text>文件下载</text>
          <view style="flex: 2"></view>
        </view>
        <view class="item">
          <text class="label">进度</text>
          <progress :style="{width: '50%'}" :percent="progress" stroke-width="3" />
          <uni-icons
            v-if="end"
            :style="{'margin-left': '20px'}"
            color="#334960"
            type="more-filled"
            size="30"
            @click="open"
          />
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {uniIcons, uniPopup} from '@dcloudio/uni-ui';
export default {
  props: {
    // url: {type: String, default: '...'},
    // tempFilePath: {type: String, default: '...'},
  },
  components: {
    uniIcons,
    uniPopup,
  },
  computed: {},
  watch: {},
  data() {
    return {
      task: null,
      progress: 0,
      end: false,
      savedFilePath: '',
    };
  },
  methods: {
    start(url) {
      this.end = false;
      this.progress = 0;
      this.task = uni.downloadFile({
        url,
        success: res => {
          uni.saveFile({
            tempFilePath: res.tempFilePath,
            success: res => {
              this.savedFilePath = res.savedFilePath;
            },
            fail: res => {},
            complete: res => {
              this.end = true;
            },
          });
        },
        fail: res => {
          this.end = true;
        },
      });
      this.task.onProgressUpdate(res => {
        // console.log('下载进度' + res.progress);
        // console.log('已经下载的数据长度' + res.totalBytesWritten);
        // console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
        this.progress = res.progress;
      });
      this.$refs.popupDownload.open();
    },
    open() {
      console.log(this.savedFilePath);
    },
    close() {
      this.task.abort();
      this.$refs.popupDownload.close();
    },
  },
};
</script>
<style>
.content {
  width: 600upx;
  background-color: #fff;
  padding: 10px;
  border-radius: 3px;
}
.close {
  position: absolute;
  top: 0px;
  right: 0px;
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
