import Vue from "vue";
import Router from "vue-router";

// 一级路由
import Home from "../components/Home";
import Header from "../components/Header";
import Admin from "../components/Admin";
import Error from "../components/Error";
import Login from "../components/Login";
import Register from "../components/Register";
import Menu from "../components/Menu";
//二级路由
import About from "../components/about/about";
import History from "../components/about/history";
import Document from "../components/about/document";
import Message from "../components/about/message";
import Phone from "../components/about/phone";

//三级路由
import personName from "@/components/about/concact/personName";
import personPhone from "@/components/about/concact/personPhone";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/menu",
      name: "menu",
      component: Menu
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin
    },
    {
      path: "/about",
      name: "about",
      component: About,
      redirect: "/about/phone", //默认打开
      children: [
        {
          path: "phone",
          name: "phone",
          component: Phone,
          redirect: "phone/personName",
          children: [
            {
              path: "personName",
              name: "personName",
              component: personName
            },
            {
              path: "personPhone",
              name: "personPhone",
              component: personPhone
            }
          ]
        },
        {
          path: "history",
          name: "history",
          component: History
        },
        {
          path: "document",
          name: "document",
          component: Document
        },
        {
          path: "message",
          name: "message",
          component: Message
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/error",
      name: "error",
      component: Error
    }
    // {
    //   path: "*",
    //   redirect: "/error"
    // }
  ]
});
