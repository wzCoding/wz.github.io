<template>
    <div id="index">
        <div class="header">
            <div class="header-avatar">
                <el-image class="avatar" :src="url" :fit="fit">
                    <div slot="error" class="avatar-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </div>
            <div class="header-text">
                <p>{{ welcome }}<span class="blog-name">{{ blogName }}</span></p>
                <carousel type="text" :slides="texts" :speed="5000" direction="vertical" class="text-carousel"></carousel>
            </div>
        </div>
        <div class="content">
            <carousel :slides="backgrounds" :pagation="true" class="background-carousel">
                <template #background="{ slide }">
                    <div class="background-slide" :style="{ backgroundImage: slide.background }">
                        <div class="slide-title">
                            <p class="title-text">{{ slide.name }}</p>
                            <el-button round @click="toSlidePage(slide.prop)">开始探索</el-button>
                        </div>
                    </div>
                </template>
            </carousel>
        </div>
    </div>
</template>
<script>
import carousel from '../components/carousel.vue';
export default {
    name: "index",
    components: {
        carousel
    },
    data() {
        return {
            url: require("../assets/head.png"),
            fit: "fit",
            welcome: "Hello,欢迎来到",
            blogName: "知识是棵树",
            texts: [
                '木欣欣以向荣，泉涓涓而始流，善万物之得时...',
                '心有所向，日复一日，必有精进...'
            ],
            backgrounds: [
                { name: "HTML相关", prop: "html", background: "../../static/backgrounds/u25.png" },
                { name: "CSS相关", prop: "css", background: "../../static/backgrounds/u32.png" },
                { name: "JavaScript相关", prop: "js", background: "../../static/backgrounds/u39.png" },
                { name: "Webpack相关", prop: "webpack", background: "../../static/backgrounds/u46.png" },
                { name: "Demo展示", prop: "demo", background: "../../static/backgrounds/u53.png" }
            ]
        }
    },
    mounted() {

    },
    methods: {
        toSlidePage(prop) {
            console.log(prop)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../css/base.scss";
#index {
    padding: 4.375rem 5rem;

    .header {
        width: 100%;
        @include flex(flex-start,flex-end);

        .avatar {
            width: 10rem;
            height: 10rem;
            border-radius: 1.25rem;
            @include border(all);
            @include flex(center, center);

            .avatar-slot {
                font-size: 2.25rem;
                color: $border-color;
            }
        }

        .header-text {
            font-size: 2.25rem;
            padding-left: 2.8125rem;

            .blog-name {
                color: $active-color;
                padding-left: .625rem;
                font-weight: 600;
            }

            .text-carousel {
                width: 100%;
                height: 40px; 
            }
        }
    }

    .content {
        padding-top: 4.6875rem;

        .background-carousel {
            width: 100%;
            height: 32.5rem;

            .background-slide {
                @include flex(flex-start,flex-end);
                .slide-title {
                    padding: 0 0 4.0625rem 4.0625rem;

                    .title-text {
                        font-size: 2rem;
                        color: #fff;
                        padding-bottom: 1.25rem;
                    }
                }
            }
        }
    }
}
</style>