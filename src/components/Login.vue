<template>
  <div class="container mt-3">
    <div class="card">
      <div class="card-body">
        <img src="../assets/icon.png" alt="error" class="mx-auto d-block">
        <form action="" class="form" @submit.prevent="loginSubmit">
          <div class="form-group">
            <label for="">邮箱</label>
            <input type="text" class="form-control" v-model="email">
          </div>
          <div class="form-group">
            <label for="">密码</label>
            <input type="password" class="form-control" v-model="password">
          </div>
          <div class="form-group">
            <button class="btn btn-success form-control">登录</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  //点击退出的时候清空登录信息
  //组件内的守卫
  beforeRouteEnter: (to, from, next) => {
    // ...
    next(vm => vm.$store.dispatch("setUser", null));
  },
  methods: {
    loginSubmit() {
      if (!this.email) {
        alert("邮箱不能为空！");
        return;
      }
      if (!this.password) {
        alert("密码不能为空！");
        return;
      }
      this.$axios
        .get("https://wd7026451384ejqwak.wilddogio.com/user.json")
        .then(items => {
          var data = items.data;
          let arr = [];
          for (var key in data) {
            var item = data[key];
            arr.push(item);
          }
          let result = arr.filter((item, index) => {
            return item.email === this.email && item.password === this.password;
          });
          if (result != null && result.length > 0) {
            //dispatch 改变action
            this.$store.dispatch("setUser", result[0].email);
            this.$router.push("/");
          } else {
            alert("用户名或者密码不正确！");
            this.$store.dispatch("setUser", null);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


<style scoped>
</style>