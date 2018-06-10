import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    //设置属性
    menuItems: {},
    currentUser: null, //当前用户
    isLogin: false //当前的登录状态
  },
  getters: {
    //获取属性的状态
    getMenuItems: state => state.menuItems,
    currentUser: state => state.currentUser,
    isLogin: state => state.isLogin
  },
  mutations: {
    //改变属性的状态,
    //向 store.commit 传入额外的参数,第二个参数，即 mutation 的 载荷（payload）
    setMenuItems(state, data) {
      state.menuItems = data;
    },
    //将匹配到的对象，在menuItems数组中删除
    removeMenuItems(state, data) {
      state.menuItems.forEach((item, index) => {
        if (item == data) {
          state.menuItems.splice(index, 1);
        }
      });
    }, //将新添加的pizza push到menuItems属性中
    pushToMenuItems(state, data) {
      state.menuItems.push(data);
    },
    //更改用户的状态信息
    userStatus(state, user) {
      if (user) {
        state.currentUser = user;
        state.isLogin = true;
      } else {
        state.currentUser = null;
        state.isLogin = false;
      }
    }
  },
  actions: {
    //应用mutations
    setUser({ commit }, user) {
      commit("userStatus", user);
    }
  }
});
