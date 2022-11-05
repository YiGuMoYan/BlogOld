<template>
  <div id="app">
    <Head></Head>
    <router-view></router-view>
    <!-- <Timeline></Timeline> -->
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import Card from "@/components/Card.vue";
import MarkdownList from "@/components/Body/MarkdownList.vue";
import Foot from "@/components/Foot.vue";
import Markdown from "@/components/Body/Markdown.vue";
import Timeline from "@/components/Timeline.vue";
import LabelEvent from "@/components/labelEvent.js";
export default {
  name: "App",
  mounted() {
    LabelEvent.$on("MarkDown", (val) => {
      this.markdownId = val;
    });
    LabelEvent.$on("changeTheme", (val) => {
      localStorage.setItem("theme", JSON.stringify(val));
    });
  },
  data() {
    return {
      markdownId: -1,
    }
  },
  components: {
    Head,
    Card,
    MarkdownList,
    Foot,
    Markdown,
    Timeline,
  },
};
</script>
<style lang="less">
  body{
    background-color: var(--mainBgc);
  }
</style>
