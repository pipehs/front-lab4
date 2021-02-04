import Vue from 'vue'
import Router from 'vue-router'
import Laboratorio4 from '@/components/Laboratorio4'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Laboratorio4',
      component: Laboratorio4
    }
  ]
})
