<template>
    <div class="container row mt-2">
        <div class="col-md-8 col-sm-12">
            <h2>添加新的Pizza</h2>
            <div class="form-group">
                <label for="">品种</label>
                <input type="text" class="form-control" v-model="name">
            </div>
            <div class="form-group">
                <label for="">描述</label>
                <textarea name="" id="" cols="30" rows="10" class="form-control" v-model="description"></textarea>
            </div>
            <div class="form-group">
                <label for="">选项1</label>
            </div>
            <div class="form-group">
                <label for="">尺寸</label><input type="text" class="form-control" v-model="size1">
            </div>
            <div class="form-group">
                <label for="">价格</label><input type="text" class="form-control" v-model="price1">
            </div>
            <div class="form-group">
                <label for="">选项2</label>
            </div>
            <div class="form-group">
                <label for="">尺寸</label><input type="text" class="form-control" v-model="size2">
            </div>
            <div class="form-group">
                <label for="">价格</label><input type="text" class="form-control" v-model="price2">
            </div>
            <div class="form-group">
                <button class="btn btn-block btn-success form-control" @click="onSubmit">提交</button>
            </div>
        </div>
        <div class="col-md-4 col-sm-12">
            <h2>菜单</h2>
            <table class="table">
                <thead class="thead-default">
                    <th>品种</th>
                    <th>删除</th>
                </thead>
                <tbody v-for="item in menuItems" :key="item.name">
                    <tr>
                        <td>{{item.name}}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-danger" @click="deleteItem(item)">x</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      name: "", //商品名称
      description: "", //商品描述
      price1: "", //选项1商品价格
      size1: "", //选项1尺寸
      price2: "", //选项2商品价格
      size2: "" //选项2尺寸,
      //   menuItems: []
    };
  },
  computed: {
    menuItems() {
      //   //在vuex中获取数据
      //   return this.$store.state.menuItems;
      return this.$store.getters.getMenuItems;
    }
  },
  created() {
    this.$axios
      .get("/menu.json")
      .then(data => {
        let menuArry = [];
        let item = data.data;
        for (var key in item) {
          item[key].id = key; //保存id,为了后面删除
          menuArry.push(item[key]);
        }
        //数据同步，同步到vuex中
        this.$store.commit("setMenuItems", menuArry);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    onSubmit() {
      //   if (!this.name) {
      //     console.log("商品名称不能为空！");
      //     return;
      //   }
      //   商品信息
      let goods = {
        name: this.name,
        description: this.description,
        options: [
          { price1: this.price1, size: this.size1 },
          { price1: this.price2, size: this.size2 }
        ]
      };
      //添加商品信息
      this.$axios
        .post("/menu.json", goods)
        .then(data => {
          this.$store.commit("pushToMenuItems", data);
          //   this.$router.push("/menu");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除商品信息
    deleteItem(item) {
      this.$axios
        .delete("/menu/" + item.id + "/.json")
        .then(data => {
          this.$store.commit("removeMenuItems", item);
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