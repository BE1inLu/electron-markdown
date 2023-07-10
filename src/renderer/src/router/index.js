import * as VueRouter from 'vue-router'
import homeview from '../view/homeview/index.vue'
import editview from '../view/editview/index.vue'
import indexview from '../view/indexview/index.vue'
import settingview from '../view/settingview/index.vue'

const routers = [{
    path: '/',
    redirect: '/home'
}, {
    path: '/home',
    component: homeview,
}, {
    path: '/edit',
    name: 'edit',
    component: editview,
}, {
    path: '/index',
    component: indexview,
}, {
    path: '/setting',
    component: settingview
}
]

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: routers
});

// router.beforeEach(async(to,from)=>{
//     return
// })

export default router;