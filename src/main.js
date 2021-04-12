import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.prototype.$axios = axios;

const router = new VueRouter({
  mode: "history",
  routes: [
    {path: "/", redirect: "/login" },
    {path: "/login", component: () => import("@/components/login.vue")},
    {path: "/home", component: () => import("@/components/home.vue")},
    {path: "/register", component: () => import("@/components/register.vue")},
    {path: "/upload", component: () => import("@/components/makeFanwork.vue")},
    {path: "/test", component: () => import("@/components/test.vue")}
  ]
});


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
