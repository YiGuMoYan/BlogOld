<template>
  <router-link :to="{path:'/Article/' + id, params:{'id': id}}">
    <div class="card">
    <div class="image"><img :src="imageSrc" fit="cover"></div>
    <br>
    <div class="title"><h3>{{title}}</h3></div>
    <br>
    <div><h5 class="time">{{time}}</h5></div>
  </div>
</router-link>
  
</template>

<script>
import axios from 'axios';
import LabelEvent from '@/components/labelEvent.js'
export default {
  props: {
    titleProps: {
      default: "Title",
      type: String
    },
    urlProps: {
      default: "#",
      type: String
    },
    timeProps: {
      default: "",
      type: String
    },
    idProps: {
      require: true,
      type: Number
    }
  },
  mounted() {
    this.getImage();
    LabelEvent.$on("changeTheme", (val) => {
      localStorage.setItem("theme", JSON.stringify(val));
    });
  },
  data() {
    return {
      imageSrc: "",
      title: this.titleProps,
      time: this.timeProps,
      id: this.idProps
    }
  },
  methods: {
    async getImage() {
      const _this = this;
      axios({
        method: "GET",
        url: "http://api.yigumoyan.top/blog/getImage.php",
        responseType: 'arraybuffer'
      }).then(function(resp) {
        _this.imageSrc = 'data:image/jpeg;base64,' + _this.arrayBufferToBase64(resp.data);
      })
    },
    arrayBufferToBase64 (buffer) {
      var binary = ''
      var bytes = new Uint8Array(buffer)
      var len = bytes.byteLength
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      return window.btoa(binary)
    },
    sendId() {
      LabelEvent.$emit("MarkDown", this.id)
    }
  }
};
</script>

<style>
.card {
  width: 300px;
  height: 300px;
  background-color: var(--cardBgc);
  padding-top: 10px;
  border-radius: 10px;
  box-shadow: 10px 10px 5px #888888;
}
.card:hover {
  width: 320px;
  height: 320px;
}
.image,
.image img {
    width: 280px;
    height: 200px;
    background-color: var(--cardBgc);
    margin: auto;
    border-radius: 10px;
}
.title {
    width: 280px;
    background-color: var(--cardBgc);
    margin: auto;
    text-align: center;
    color: var(--fontColor);
}
.time {
  width: 280px;
    background-color: var(--cardBgc);
    margin: auto;
    text-align: center;
    color: var(--fontColor);
}
</style>