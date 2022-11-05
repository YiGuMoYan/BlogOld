import Vue from 'vue'
import App from './App.vue'

import router from '@/router/index.js';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';

import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

import '@/assets/css/theme.css'

Vue.config.productionTip = false
Vue.use(ElementUI);

VMdPreview.use(vuepressTheme, {
  Prism,
  extend(md) {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
  },
});
VMdPreview.use(createCopyCodePlugin());
VMdPreview.use(createLineNumbertPlugin());

Vue.use(VMdPreview);

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
