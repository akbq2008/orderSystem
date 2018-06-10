<template>
    <div>
        <div class="cols-sm-12 text-center mt-4" id="bg">
            <div class="background">
                <h1 class="mt-5">欢迎大家品尝Pizza！</h1>
                <h2 class="mt-4">这里有你非常喜欢的Pizza！</h2>
            </div>
        </div>
        <div class="row mt-2">
            <docuemnts class="col-md-4 col-sm-12"></docuemnts>
            <message class="col-md-4 col-sm-12"></message>
            <history class="col-md-4 col-sm-12"></history>
        </div>
    </div>
</template>

<script>
import History from "../components/about/history";
import Document from "../components/about/document";
import Message from "../components/about/message";
export default {
  components: {
    docuemnts: Document,
    history: History,
    message: Message
  }
};
</script>

<style scoped>
#bg {
  background: url("../assets/pizza.jpg") no-repeat;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.background {
  width: 60vw;
  background: #eee;
  opacity: 0.7;
  filter: alpha(opacity=70);
  height: 40vh;
}
</style>