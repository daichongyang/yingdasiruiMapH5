import Vue from 'vue'
import Router from 'vue-router'
import Tmap from '@/components/Tmap'
import footMap from '@/components/footMap'
import amapOptions from '@/components/amapOptions'
import weixinlianjie from '@/components/weixinlianjie'
import navigationList from '@/components/navigationList'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    // base: '/ydsw',
    routes: [{
        path: '/Tmap',
        name: 'Tmap',
        component: Tmap
    }, {
        path: '/footMap',
        name: 'footMap',
        component: footMap
    }, {
        path: '/',
        name: 'amapOptions',
        component: amapOptions,
        meta: {
            keepAlive: true
        }
    }, {
        path: '/weixinlianjie',
        name: 'weixinlianjie',
        component: weixinlianjie
    }, {
        path: '/navigationList',
        name: 'navigationList',
        component: navigationList
    }]
})