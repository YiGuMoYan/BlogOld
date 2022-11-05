<template>
  <div class="foot font">
    <h5>
      {{ hitokotoStr }}
    </h5>
    <br>
      <h5>
        {{ message1 }}<a href="http://yigumoyan.top">{{ name }}</a
        >{{ message2 }}
      </h5>
      <h5>
        <a href="https://beian.miit.gov.cn">{{ port }}</a>
      </h5>
  </div>
</template>

<script>
import axios from 'axios';
import LabelEvent from "@/components/labelEvent.js";
export default {
  mounted() {
    this.getHitokoto();
    LabelEvent.$on("changeTheme", (val) => {
      localStorage.setItem("theme", JSON.stringify(val));
    });
  },
  data() {
    return {
      message1: " Copyright © 2022 ",
      name: "忆古陌烟",
      message2: " All rights reserved. ",
      port: "陕ICP备2022009553号",
      hitokoto: {},
      hitokotoStr: ""
    };
  },
  methods: {
    getHitokoto() {
      const _this = this;
      axios({
        method: "GET",
        url: "http://api.yigumoyan.top/hitokoto/get.php"
      }).then(function (resp) {
        _this.hitokoto = resp.data;
        _this.arrange();
      })
    },
    arrange() {
      this.hitokotoStr = this.hitokoto.hitokoto + " —— ";
      if (this.hitokoto.fromWho != "null" ) {
        this.hitokotoStr += this.hitokoto.fromWho + " ";
      }
      if (this.hitokoto.fromArt != "null" ) {
        this.hitokotoStr += "『" + this.hitokoto.fromArt + "』"
      }
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.foot {
  height: 100px;
  background-color: var(--headBgc);
  color: var(--fontColor);
  text-align: center;
  margin-top: 100px;
}
a {
  text-decoration: none;
  color: var(--fontColor);
}
.font {
    padding: 20px;
}
</style>