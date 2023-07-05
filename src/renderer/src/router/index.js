import * as VueRouter from 'vue-router'
import homeview from '../view/homeview/index.vue'
import editview from '../view/editview/index.vue'
import testview from '../view/testview/testview.vue'

const routers = [{
    path: '/', redirect: '/home'
}, {
    path: '/home',
    component: homeview,
}, {
    path: '/edit',
    component: editview,
}, {
    path: '/testview',
    component: testview,
}]

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: routers
});

export default router;