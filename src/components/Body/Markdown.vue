<template>
  <div class="markdown" :style="{ 'width': divWidth }">
    <v-md-preview :text="text" style="border-radius: 10px"></v-md-preview>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getDivWidth();
    this.getMarkdown();
    console.log(this.id);
  },
  data() {
    return {
      id: this.$route.params.id,
      text: "",
      divWidth: "",
    };
  },
  methods: {
    getMarkdown() {
      const _this = this;
      axios({
        method: "POST",
        url: "http://api.yigumoyan.top/blog/getMarkDown.php",
        data: "id=" + this.id,
      }).then(function (resp) {
        _this.text = resp.data;
      });
    },
    getDivWidth() {
      if (window.innerWidth > 1000) {
        this.divWidth = "1000px";
      } else {
        this.divWidth = "90vw";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.markdown {
  background-color: white;
  font-size: 20px;
  margin: auto;
  li {
    list-style-type: disc;
  }
}
</style>