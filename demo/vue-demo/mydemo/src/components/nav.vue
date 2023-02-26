<template>
    <div id="bg-container">
        <div @click="back" class="back">back</div>
    </div>
</template>
<script>
import { Background } from "../background/background"
export default {
    name: "navbar",
    data() {
        return {
           bg:null
        }
    },
    mounted() {
        this.init()
        this.animate()
    },
    methods: {
        back() {
            this.$router.push("/")
        },
        init() {
            const container = document.querySelector("#bg-container")
            this.bg = new Background(container);
        },
        animate(){
           requestAnimationFrame(this.animate)
           this.bg.render()
        }
    }
}
</script>
<style scoped>
#bg-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.back {
    cursor: pointer;
    text-decoration: underline;
    position: absolute;
    color:#fff;
}
</style>