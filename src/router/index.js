import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ScratchCard from '@/components/Scratch-card'
import More from '@/components/More'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Scratch-card',
      name: 'Scratch-card',
      component: ScratchCard
    },
    {
      path: '/More',
      name: 'More',
      component: More
    }
  ]
})
