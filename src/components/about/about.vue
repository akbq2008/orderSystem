<template>
    <div>
        <div class="row">
            <div class="col-md-4 col-sm-12">
                <div class="list-group">
                    <li class="nav-link">
                        <router-link to="/about/history" class="list-group-item list-group-item-action">历史订单</router-link>
                    </li>
                    <li class="nav-link">
                        <router-link :to="{name:'phone'}" class="list-group-item list-group-item-action">联系我们</router-link>
                    </li>
                    <li class="nav-link">
                        <router-link :to="{name:'document'}" class="list-group-item list-group-item-action">点餐文档</router-link>
                    </li>
                    <li class="nav-link">
                        <router-link :to="{name:'message'}" class="list-group-item list-group-item-action">快递信息</router-link>
                    </li>
                </div>
            </div>
            <div class="col-md-8 col-sm-12">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>