<template>
    <div id="index">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6 nav-col">
                    <div class="nav-wrap">
                        <div class="nav-grid">
                            <div v-for="menu in menus" :key="menu.prop" class="single-item">
                                <div class="item-content" @click="toMenuPage(menu.prop)">
                                    <span class="iconfont" :class="menu.icon"></span>
                                    <span class="title">{{ menu.title }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="blog-description">
                        <h3>{{ descriptions.greetText }}</h3>
                        <h1>{{ descriptions.blogName[0] }}<span class="blog-name">{{ descriptions.blogName[1] }}</span></h1>
                        <h2>
                            <carousel type="text" :slides="descriptions.blogTexts" :speed="5000" direction="vertical"
                                class="text-carousel">
                            </carousel>
                        </h2>
                        <p>{{ descriptions.blogInfo[0] }}<span>{{ descriptions.blogName[1] }}</span>，{{
                            descriptions.blogInfo[1] }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import carousel from "../components/carousel.vue"
export default {
    name: "index",
    components: {
        carousel
    },
    data() {
        return {
            menus: [
                {
                    icon: "icon-html",
                    prop: "htmlist",
                    title: "html相关"
                },
                {
                    icon: "icon-css",
                    prop: "csslist",
                    title: "css相关"
                },
                {
                    icon: "icon-js",
                    prop: "jslist",
                    title: "js相关"
                },
                {
                    icon: "icon-other",
                    prop: "otherlist",
                    title: "其他"
                },
                {
                    icon: "icon-project",
                    prop: "demolist",
                    title: "demo展示"
                }

            ],
            descriptions: {
                greetText: "Hello !",
                blogName: ["欢迎来到", "芝士是棵树"],
                blogInfo: ["我是一名前端开发者，这是我的个人博客", "这里记录了一些前端开发相关的知识技巧，希望这些知识能够帮助到您。欢迎您的到来，祝您访问愉快！"],
                blogTexts: ['木欣欣以向荣，泉涓涓而始流，善万物之得时...', '心有所向，日复一日，必有精进...']
            }
        }
    },
    methods: {
        toMenuPage(menu) {
            console.log(menu)
            this.$router.push(menu);
        }
    }
}
</script>
<style lang="scss" scoped>
#index {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 4.2813rem;
    padding-bottom: 1.3125rem;
    z-index: 2;
    //background-image: url("/static/backgrounds/u53.png");
    background-repeat: no-repeat;
    background-size: 110% 110%;
    background-position: -10px -10px;

    .nav-wrap {
        -webkit-transform: translateY(95px);
        -ms-transform: translateY(95px);
        transform: translateY(95px);

        .nav-grid {
            width: auto;
            max-width: 220px;
            float: none;
            display: block;
            margin-left: 65px;
            margin-top: -125px;
            padding-left: 0;
            padding-right: 0;
            height: 220px;
            -webkit-filter: drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.35));
            filter: drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.35));
            -webkit-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            transform: rotate(-45deg);
            position: relative;
            z-index: 2;

            &::after {
                content: "";
                position: absolute;
                top: -55px;
                left: -5px;
                width: 170px;
                height: 170px;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
                opacity: 0.4;
                z-index: -1;
            }

            .single-item {
                float: left;
                clear: none;
                text-align: inherit;
                width: 50%;
                margin-left: 0%;
                margin-right: 0%;
                height: 110px;
                background: -webkit-linear-gradient(315deg, #F8B127, #CB26B6);
                background: -o-linear-gradient(315deg, #F8B127, #CB26B6);
                background: linear-gradient(135deg, #F8B127, #CB26B6);
                //background: linear-gradient(135deg, #0acffe 0%, #1890ff 100%);
                overflow: hidden;
                -webkit-transition: .3s;
                -o-transition: .3s;
                transition: .3s;
                cursor: pointer;

                &::before,
                &::after {
                    content: "";
                    display: table;
                }

                &::after {
                    clear: both;
                }

                &:nth-child(1) {
                    border-radius: 10px 10px 0 0;
                }

                &:nth-child(2) {
                    position: relative;
                    top: 50%;
                    border-radius: 0 10px 0 0;
                }

                &:nth-child(3) {
                    border-radius: 0 0 0 10px;
                }

                &:nth-child(4) {
                    position: relative;
                    top: 50%;
                    left: 50%;
                    border-radius: 0 10px 10px 0;
                }

                &:nth-child(5) {
                    position: relative;
                    left: 50%;
                    border-radius: 0 0 0 10px;
                }

                .item-content {
                    display: block;
                    height: calc(100% + 62px);
                    width: calc(100% + 62px);
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-orient: vertical;
                    -webkit-box-direction: normal;
                    -ms-flex-direction: column;
                    flex-direction: column;
                    -webkit-box-pack: center;
                    -ms-flex-pack: center;
                    justify-content: center;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    text-align: center;
                    color: #fff;
                    text-decoration: none;
                    -webkit-transform: rotate(45deg) translate(-43px, 0);
                    -ms-transform: rotate(45deg) translate(-43px, 0);
                    transform: rotate(45deg) translate(-43px, 0);
                    -webkit-transition: .3s;
                    -o-transition: .3s;
                    transition: .3s;

                    &:hover {
                        background: #9f2b83;
                        //background: rgba(0,81,255,0.5);
                    }

                    .iconfont {
                        font-size: 1.5rem;
                        line-height: 100%;
                        margin-bottom: 8px;
                    }

                    .title {
                        font-size: 1rem;
                    }
                }
            }
        }
    }

    .blog-description {
        padding-left: 20px;
        position: relative;
        z-index: 2;

        .blog-name {
            color: #CB26B6;
            color: transparent;
            background: -webkit-linear-gradient(315deg, #F8B127, #CB26B6);
            background: -o-linear-gradient(315deg, #F8B127, #CB26B6);
            background: linear-gradient(135deg, #F8B127, #CB26B6);
            -webkit-background-clip: text;
            background-clip: text;
            font-weight: 700;
            text-transform: uppercase;
        }

        h3 {
            font-size: 30px;
            line-height: 100%;
            font-weight: 600;
            color: #424242;
            margin-top: -3px;
            margin-bottom: 26px;
        }

        h1 {
            font-family: "Josefin Sans", sans-serif;
            font-size: 55px;
            line-height: 100%;
            font-weight: 600;
            color: #424242;
            margin-bottom: 14px;

            span {
                @extend .blog-name;
                padding-left: 20px;
            }

        }

        h2 {
            font-size: 25px;
            line-height: 100%;
            font-weight: 500;
            color: #424242;
            margin-bottom: 29px;

            .text-carousel {
                height: 40px;
            }
        }

        p {
            font-size: 16px;
            line-height: 26px;
            color: #424242;
            margin-bottom: 20px;

            span {
                @extend .blog-name;
                padding-left: 10px;
            }
        }


    }
}
</style>