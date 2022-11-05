<template>
  <div class="block main" :style="{'width' : mainWidth}">
  <el-timeline>
    <el-timeline-item v-for="(timeline, index) in timelineList" :key="index" :timestamp="timeline.time" :color="index == 0 ? '#0bbd87' : '' ">
      <el-card>
        <h4>{{timeline.message}}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Timeline",
  mounted() {
    this.getTimelineList();
    this.phone();
    this.setStyle();
  },
  data() {
    return {
      timelineList: [],
      isPhone: false,
      mainWidth: "800px",
    }
  },
  methods: {
    getTimelineList() {
      const _this = this;
      axios({
        url: "http://api.yigumoyan.top/blog/getTimeline.php",
        method: "GET"
      }).then(function(resp) {
        _this.timelineList = resp.data.reverse();
      })
    },
    phone() {
      var info = navigator.userAgent;
      this.isPhone = /mobile/i.test(info);
      console.log(this.isPhone);
    },
    setStyle() {
      if (this.isPhone) {
        this.mainWidth = "96vw";
      }
    }
  }
}

</script>

<style>
.main {
  margin: auto auto;
}
</style>