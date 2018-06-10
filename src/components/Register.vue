<template>
  <div class="container mt-3">
    <div class="card">
      <div class="card-body">
        <img src="../assets/icon.png" alt="" class="mx-auto d-block">
        <form action="" @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="">邮箱</label><input type="text" class="form-control email" v-model="email" @keyup="checkUser"></div>
          <div class="form-group">
            <label for="">密码</label><input type="password" class="form-control" v-model="password"></div>
          <div class="form-group">
            <label for="">确认密码</label><input type="password" class="form-control" v-model="againPassword"></div>
          <div class="form-group">
            <button class="btn btn-success form-control">注册</button>
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
      password: "",
      againPassword: ""
    };
  },
  methods: {
    checkUser() {
      this.$axios
        .get("https://wd7026451384ejqwak.wilddogio.com/user.json")
        .then(res => {
          var data = res.data;
          var arr = [];
          for (var key in data) {
            var item = data[key];
            arr.push(item);
          }
          var result = arr.filter((items, index) => {
            return items.email === this.email;
          });
          if (result.length > 0) {
            alert('该用户名已存在');
          }
        });
    },
    onSubmit() {
      if (!this.email) {
        alert("邮箱不能为空！");
        return;
      }
      if (!this.password) {
        alert("密码不能为空！");
        return;
      }
      if (!this.againPassword) {
        alert("确认密码不能为空");
        return;
      }

      if (this.password === this.againPassword) {
        this.$axios.post("https://wd7026451384ejqwak.wilddogio.com/user.json", {
          email: this.email,
          password: this.password
        })
        .then(
          this.$router.push("/login")
        );
      } else {
        alert("两次密码不一致！");
      }
    }
  }
};
</script>

<style scoped>
</style>