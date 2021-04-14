//import Vue from 'vue'
//import App from './App.vue'
import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

Vue.config.productionTip = false;

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.prototype.$axios = axios;

const router = new VueRouter({
  mode: "history",
  routes: [
    {path: "/", redirect: "/login" },
    {path: "/login",name:"login", component: () => import("@/components/login.vue")},
    {path:"/main",name:"main",component:()=>import("@/components/MainPage")},
    {path:"/user",name:"user",component:()=>import("@/components/User.vue")},
    {path:"/result",name:"result",component:()=>import("@/components/SearchResult")},
    {path: "/register",name:"register", component: () => import("@/components/register.vue")},
    {path: "/create",name:"create", component: () => import("@/components/makeFanwork.vue")},
    {path: "/article",name:'article',component:()=>import("@/components/article.vue")},
    //{path: "/test",name:"", component: () => import("@/components/test.vue")}
  ]
});


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
