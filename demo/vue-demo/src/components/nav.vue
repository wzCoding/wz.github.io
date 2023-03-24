<template>
    <div id="bg-container">
        <el-button-group class="btn-group">
            <el-button type="primary" icon="el-icon-arrow-left" @click="back">back</el-button>
            <el-button type="primary" @click="startAnimate">{{ dynamicText }}<i :class="dynamicIcon"
                    class="dynamic-icon"></i></el-button>
        </el-button-group>

    </div>
</template>
<script>
import { World } from "../world/world"
export default {
    name: "navbar",
    data() {
        return {
            bg: null,
            animate: true,
            dynamicText: "start",
            dynamicIcon: "el-icon-video-pause"
        }
    },
    mounted() {
        this.init().catch(err => {console.log(err)})
        //this.startAnimate()
        console.log(this.bg)
    },
    destroyed() { this.bg.stop() },
    methods: {
        back() {
            this.$router.push("/");
        },
        async init() {
            const container = document.querySelector("#bg-container");
            this.bg = new World(container);
            //this.bg.render();

            await this.bg.init();

            this.bg.start();
        },
        startAnimate() {
            this.dynamicText = this.animate ? "stop" : "start";
            this.dynamicIcon = this.animate ? "el-icon-video-play" : "el-icon-video-pause";
            // this.bg[this.animate ? "start" : "stop"]();
            // this.animate = !this.animate;
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

.btn-group {
    position: absolute;
    color: #fff;
}

.dynamic-icon {
    left: 3px;
    top: 1px;
    position: relative;
}
</style>