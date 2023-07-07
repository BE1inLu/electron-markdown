import * as VueRouter from 'vue-router'
import homeview from '../view/homeview/index.vue'
import editview from '../view/editview/index.vue'
import indexview from '../view/indexview/index.vue'

const routers = [{
    path: '/',
    redirect: '/home'
}, {
    path: '/home',
    component: homeview,
}, {
    path: '/edit',
    component: editview,
}, {
    path: '/index',
    component: indexview,
}
]

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: routers
});

export default router;