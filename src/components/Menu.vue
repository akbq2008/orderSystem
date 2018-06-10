<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-sm-12">
        <table class="table">
          <thead class="thead-default">
            <th>尺寸</th>
            <th>价格</th>
            <th>加入</th>
          </thead>
          <tbody v-for="item in menuItems" :key="item.id">
            <tr>
              <td>{{item.name}}</td>
            </tr>
            <tr v-for="options in item.options" :key="options.id">
              <td>{{options.size}}</td>
              <td>{{options.price1}}</td>
              <td>
                <button class="btn btn-sm btn-success btn-outline-success" @click="Basket(item,options)">+</button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      <div class="col-md-4 col-sm-12">
        <div v-if="baskets.length>0">
          <table class="table">
            <thead class="thead-default">
              <th>数量</th>
              <th>品种</th>
              <th>价格</th>
            </thead>
            <tbody v-for="goodsDetail in baskets" :key="goodsDetail.id">
              <tr>
                <td>
                  <button class="btn btn-gray btn-success-gray btn-sm" @click="decreaseNum(goodsDetail)">-</button>
                  {{goodsDetail.quantity}}
                  <button class="btn btn-gray btn-success-gray btn-sm" @click="increaseNum(goodsDetail)">+</button>
                </td>
                <td>{{goodsDetail.name}} {{goodsDetail.size}}</td>
                <td>{{goodsDetail.quantity*goodsDetail.price}}</td>
              </tr>
            </tbody>
            <tr>总价：{{totalMoney}}RMB</tr>
          </table>
          <button class="btn btn-success btn-block">提交</button>
        </div>
        <div v-else="baskets.length==0">
          购物车没有信息
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // menuItems: [],
      baskets: []
      // totalPrice: 0 //购物车
    };
  },
  created() {
    // this.$axios.get("/menu.json").then(data => {
    //   var item = data.data;
    //   this.menuItems = item; //这里只要数组就OK
    //   // for (var key in item) {
    //   //   var items = item[key];
    //   //   this.menuItems.push(items);
    //   // }
    //   // console.log( this.menuItems);
    // });

    //将请求到的数据存储到vuex中
    this.$axios
      .get("/menu.json")
      .then(data => this.$store.commit("setMenuItems", data.data));
  },
  computed: {
    totalMoney() {
      //计算总价格
      // var price = [];
      // var leng = this.baskets.length;
      // for (var j = 0; j < leng; j++) {
      //   price.push(this.baskets[j].price * this.baskets[j].quantity);
      // }
      // var result = price.reduce((prev, cur) => {
      //   return Number(prev) + Number(cur);
      // }, []);
      // this.totalPrice = result;
      // return this.totalPrice;
      let total = 0;
      for (let key in this.baskets) {
        var item = this.baskets[key]; //枚举具体的每一项
        total += item.quantity * item.price;
      }
      return total;
    },
    menuItems() {
      // //在vuex中获取数据，该属性是暴露给外界的
      // return this.$store.state.menuItems;
      //通过getters获取数据
      return this.$store.getters.getMenuItems;
    }
  },
  methods: {
    //购物车中数量减
    decreaseNum(goodsDetail) {
      //当购物车中的商品数量大于1时
      if (goodsDetail.quantity > 1) {
        goodsDetail.quantity--;
      } else {
        //当数量为1时，再次点击时删除
        this.baskets.filter((item, index) => {
          if (
            item.quantity == 1 &&
            item.name == goodsDetail.name &&
            goodsDetail.price == item.price
          ) {
            this.baskets.splice(index, 1);
          }
        });
      }
      // this.totalMoney();
    },
    //购物车中数量加
    increaseNum(goodsDetail) {
      goodsDetail.quantity++;
      // this.totalMoney();
    },
    Basket(item, options) {
      var goods = {
        quantity: 1,
        name: item.name,
        price: options.price1,
        size: options.size
      };
      if (this.baskets.length == 0) {
        //购物车没有东西的时候
        this.baskets.push(goods);
      } else {
        //购物车不为空
        //加进来是新的商品
        var result = this.baskets.filter(basketsItem => {
          return (
            basketsItem.name === item.name && basketsItem.size === options.size
          );
        });
        if (result.length != 0) {
          //购物车已经有该商品
          result[0].quantity++; //过滤出来的即为新加的项
          // var len = this.baskets.length;
          // for (var i = 0; i < len; i++) {
          //   if (
          //     this.baskets[i].name == item.name &&
          //     this.baskets[i].size == options.size
          //   ) {
          //     this.baskets[i].quantity++;
          //   }
          // }
        } else {
          //购物车还没有该商品
          this.baskets.push(goods);
        }
      }
      // this.totalMoney();
    }
  }
};
</script>

<style scoped>
</style>