import Vue from 'vue';
import VueRouter from 'vue-router';

import MarkdownList from '@/components/Body/MarkdownList.vue';
import Markdown from '@/components/Body/Markdown.vue';
import Timeline from '@/components/Timeline.vue';


Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path: '/', component: MarkdownList},
        {path: '#', component: MarkdownList},
        {path: '/Article/:id', component: Markdown},
        {path: '/Timeline', component: Timeline}
    ]
});

export default router;