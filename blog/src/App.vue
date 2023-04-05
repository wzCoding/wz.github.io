<template>
  <div id="app">
    <top></top>
    <Transition name="scale">
      <router-view></router-view>
    </Transition>
    <bottom></bottom>
  </div>
</template>

<script>
import top from './components/layout/top.vue'
import bottom from './components/layout/bottom.vue'

export default {
  name: 'App',
  components: {
    top,
    bottom
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body {
  
  #app {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
    color: #333;
  }
}

.scale-enter-active:not(#index) {
  animation: scale-in 0.6s ;
}


.scale-leave-active:not(#index) {
  animation: scale-in 0.6s  reverse;
}

@keyframes scale-in {
  0% {
    -webkit-transform: rotateX(-90deg) scale(0.01);
    -ms-transform: rotateX(-90deg) scale(0.01);
  }
 
  100% {
    -webkit-transform: rotateX(0deg) scale(1);
    -ms-transform: rotateX(0deg) scale(1);
  }
}
</style>
