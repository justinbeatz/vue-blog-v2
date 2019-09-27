import Vue from 'vue';
import Router from 'vue-router';
import EditProfile from './views/profile/EditProfile.vue';
import BlogFeed from './views/blog/BlogFeed.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'BlogFeed',
      component: BlogFeed,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/auth/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/auth/Login.vue'),
    },
    {
      path: '/profile/:id',
      name: 'EditProfile',
      component: EditProfile,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
