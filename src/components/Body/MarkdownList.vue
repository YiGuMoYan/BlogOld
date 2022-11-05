<template>
  <div>
    <ul>
      <li
        v-for="i in count"
        :key="i"
        :style="{ width: rowWidth + 'px' }"
        class="line"
      >
        <div>
          <span
            v-for="(card, indexCard) in cardLayout[i - 1]"
            :key="card.id"
            class="inlineSpan"
            style="margin: auto"
          >
            <span v-if="indexCard != 0" class="intervalSpan"></span>
            <span>
              <Card
                :titleProps="card.title"
                :timeProps="card.time"
                :idProps="card.id"
                class="inlineSpan animation"
              ></Card>
            </span>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import Card from "@/components/Card.vue";
import LabelEvent from "@/components/labelEvent.js";
import $ from "jquery";
export default {
  created() {
    this.windowsScreenWidth = window.innerWidth;
    this.getCardList();
    this.clientWindowsWidth();
    window.addEventListener("scroll", this.scrollBottom);
    LabelEvent.$on("changeLabel", (val) => {
      this.label = val;
    });
    LabelEvent.$on("changeTheme", (val) => {
      localStorage.setItem("theme", JSON.stringify(val));
    });
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      colNum: "",
      label: "all",
      cardList: [],
      cardLayout: [],
      windowsScreenWidth: "",
      rowWidth: "",
      count: 3,
    };
  },
  methods: {
    getColNum() {
      this.cardLayout.length = 0;
      if (this.windowsScreenWidth < 700) {
        this.colNum = 1;
        this.rowWidth = 330;
      } else {
        const unit = Math.floor(this.windowsScreenWidth / 100);
        this.colNum = Math.floor((unit - 1) / 4);
        this.rowWidth = this.colNum * 300 + (this.colNum - 1) * 100 + 30;
      }
      let cardCol = [];
      for (let i = 0; i < this.cardList.length; i += this.colNum) {
        if (i + this.colNum < this.cardList.length) {
          this.cardLayout.push(this.cardList.slice(i, i + this.colNum));
        } else {
          this.cardLayout.push(this.cardList.slice(i, this.cardList.length));
        }
      }
    },
    getCardList() {
      var _this = this;
      axios({
        method: "post",
        url: "http://api.yigumoyan.top/blog/getMarkDownList.php",
        data: "label=" + _this.label,
      }).then(function (resp) {
        _this.cardList = resp.data;
        _this.getColNum();
      });
    },
    clientWindowsWidth() {
      const _this = this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth;
          _this.screenWidth = window.screenWidth;
        })();
      };
    },
    load() {
      if (this.count < this.cardLayout.length) {
        this.count++;
      }
    },
    scrollBottom() {
      var doc_height = $(document).height();
      var scroll_top = $(document).scrollTop();
      var window_height = $(window).height();
      if (scroll_top + window_height >= doc_height * 0.9 && this.count < this.cardLayout.length) {
        this.count++;
      }
    },
  },
  watch: {
    screenWidth(val) {
      this.windowsScreenWidth = val;
      this.getColNum();
    },
    label() {
      this.getCardList();
    },
  },
  components: {
    Card,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.inlineSpan {
  display: inline-block;
}
.intervalSpan {
  width: 100px;
  height: 310px;
  display: inline-block;
}
.rowDiv {
  margin: 10px, auto;
}
/* span {
  float: left;
} */
.line {
  height: 300px;
  margin: auto;
  margin-top: 60px;
}
li {
  list-style-type: none;
}
.animation {
  justify-content: space-around;
  transition: all 1s;
}
</style>