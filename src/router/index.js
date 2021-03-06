import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"

import store from "../store/index.js"
import Table from "../components/Table.vue"
import NotFound from "../components/NotFound.vue"


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/table",
    name: "table",
    component: Table,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/404",
    name: "404",
    component: NotFound
  },
  {
    path: "*",
    redirect: "/404"
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  // если какому-то роуту нужна авторизация, проверяем, авторизован ли текущий пользователь
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLogined) {
      next();
      return;
    }
    next("/")

  } else {
    next()
  }
})

export default router


