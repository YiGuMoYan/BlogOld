<template>
  <div class="head">
    <el-button
      type="primary"
      icon="el-icon-s-operation"
      class="moreButton"
      @click="drawer = true"
      >菜单</el-button
    >
    <img src="@/assets/Head.jpg" alt="忆古陌烟" class="header" />
    <el-drawer title="菜单" :visible.sync="drawer" direction="ltr" size="300px">
      <el-menu>
        <el-menu-item index="1" @click="guild">
          <i class="el-icon-location"></i>
          <span slot="title">导航</span>
        </el-menu-item>
        <router-link to="/">
          <el-menu-item index="2">
          <i class="el-icon-location"></i>
          <span slot="title">博客</span>
        </el-menu-item>
        </router-link>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>标签</span>
          </template>
          <el-menu-item
            v-for="label in labelList"
            :key="label"
            :id="label"
            @click="changeLabel(label)"
            >{{ label }}</el-menu-item
          >
        </el-submenu>
        <router-link to="Timeline">
          <el-menu-item index="4">
          <i class="el-icon-location"></i>
          <span slot="title">时光轴</span>
        </el-menu-item>
        </router-link>
        <el-menu-item>
          <el-switch
            v-model="themeBool"
            active-text="夜间模式"
            inactive-text="白天模式"
          >
          </el-switch>
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
import LabelEvent from "@/components/labelEvent.js";
export default {
  name: "Head",
  mounted() {
    this.getLabelList();
    this.theme = localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : "light";
    if (this.theme == "dark") {
      this.themeBool = true;
    }
    document.documentElement.setAttribute("theme", this.theme);
    LabelEvent.$emit("changeTheme", this.theme);
    LabelEvent.$on("changeTheme", (val) => {
      localStorage.setItem("theme", JSON.stringify(val));
    });
  },
  data() {
    return {
      drawer: false,
      activeName: "1",
      labelList: [],
      themeBool: false,
      theme: "light"
    };
  },
  methods: {
    getLabelList() {
      const _this = this;
      axios({
        method: "GET",
        url: "http://api.yigumoyan.top/blog/getLabelList.php",
      }).then(function (resp) {
        _this.labelList = resp.data;
      });
    },
    changeLabel(label) {
      LabelEvent.$emit("changeLabel", label);
    },
    blog() {
      location.reload();
    },
    guild() {
      window.location.href = "http://yigumoyan.top";
    },
  },
  watch: {
    themeBool(val) {
      this.theme = val;
      if (this.themeBool) {
        this.theme = "dark"
      } else {
        this.theme = "light"
      }
      document.documentElement.setAttribute("theme", this.theme);
      LabelEvent.$emit("changeTheme", this.theme);
    }
  }
};
</script>

<style>
.head {
  height: 8vh;
  width: 96vw;
  margin: 10px auto;
  margin-bottom: 50px;
  background-color: var(--headBgc);
  border-radius: 10px !important;
}

.moreButton {
  margin: 1vh 2vh !important;
  float: left;
  height: 6vh !important;
  border-radius: 10px !important;
}

.header {
  float: right;
  border-radius: 100%;
  width: 7vh;
  margin: 0.5vh 2vh;
}

el-button {
  background-color: var(--btnBgc);
  color: var(--btnFontColor);
}

el-drawer {
  background-color: var(--cardBgc);
  color: var(--fontColor);
}
</style>