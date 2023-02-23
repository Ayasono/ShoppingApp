import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/home'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/home/brand',
        name: 'brand',
        component: () => import('../views/home/brandDetail/brandDetail')
    },
    {
        path: '/home/location',
        name: 'location',
        component: () => import('../views/home/search/location/location')
    },
    {
        path: '/home/newgoods/:type',
        name: 'newgoods',
        component: () => import('../views/home/newgoods/newgoods')
    },
    {
        path: '/home/search',
        name: 'search',
        component: () => import('../views/home/search/index')
    },
    {
        path: '/theme',
        name: 'theme',
        component: () => import('../views/theme/theme')
    },
    {
        path: '/category',
        name: 'category',
        component: () => import('../views/category/category'),
    },
    {
        path: '/category/detail',
        name: 'cateDetail',
        component: () => import('../views/category/cateNav/cateNav')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/cart/cart')
    },
    {
        path: '/cart/orderPayment',
        name: 'orderPayment',
        component: () => import('../views/cart/orderPayment/orderPayment')
    },
    {
        path: '/mine',
        name: 'mine',
        component: () => import('../views/mine/mine')
    },
    {
        path: '/mine/collection',
        name: 'collection',
        component: () => import('../views/mine/collection/collection')
    },
    {
        path: '/mine/address',
        name: 'addressManagement',
        component: () => import('../views/mine/addressManagement/addressManagement')
    },
    {
        path: '/mine/address/edit',
        name: 'addAddress',
        component: () => import('../views/mine/addAddress/addAddress')
    },
    {
        path: '/mine/advice',
        name: 'advice',
        component: () => import('../views/mine/advice/advice')
    },
    {
        path: '/itemDetail',
        name: 'itemDetail',
        component: () => import('../components/itemDetail/itemDetail')
    },
]

const router = new VueRouter({
    routes
})

export default router
