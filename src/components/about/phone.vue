<template>
    <div>
        <div class="card text-dark bg-light">
            <div class="card-header">联系我们</div>
            <div class="card-body">
                <h4 class="card-title">联系我们</h4>
                <p>673161921@qq.com</p>
                <router-link :to="{name:'personName'}">联系人</router-link>
                <router-link :to="{name:'personPhone'}">电话号码</router-link>
                <router-view> </router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>