<template>
    <div id="htmlist" class="section">
        <div class="section-content">
            <!-- <div class="">
                <div class="content-close" @click="back"><span class="iconfont icon-close"></span></div>
            </div> -->
            <top :contents="menus">
                <template #con="{ contents }">
                    <div v-for="menu in contents" :key="menu.prop" :class="menu.menuClass">
                       123
                    </div>
                </template>
            </top>
            <div class="content htmlist-content">
                <div class="content-item content-list"></div>
                <div class="content-item content-info"></div>
                <div class="content-item content-list-index"></div>
            </div>
        </div>
    </div>
</template>
<script>
import top from "../components/layout/top.vue";
export default {
    name: "htmlist",
    components: {
        top
    },
    data() {
        return {
            title: "html相关内容",
            menus: [
                {
                    menuClass: "menu-left",
                    title: "html相关内容"
                },
                {
                    icon: "icon-close",
                    menuClass: "menu-right",
                }
            ]
        }
    },
    methods: {
        back() {
            this.$router.push("/")
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../css/base.scss";

.section {
    @extend .section;

    .section-content {
        position: relative;
        direction: inherit;
        box-sizing: border-box !important;
        height: 100%;
        width: 100%;
        visibility: visible;

        .content-close {
            position: absolute;
            top: 0;
            right: 25px;
            padding: 0;
            width: 35px;
            height: 40px;
            line-height: 20px;
            background: -webkit-linear-gradient(315deg, #CB26B6, #F8B127);
            background: -o-linear-gradient(315deg, #CB26B6, #F8B127);
            background: linear-gradient(135deg, #CB26B6, #F8B127);
            color: #fff;
            font-size: 20px;
            border: 0;
            border-radius: 0 0 15px 15px;
            -webkit-box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.4);
            box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.4);
            z-index: 111;
            cursor: pointer;

            text-align: center;
            line-height: 40px;

            span {
                font-size: 24px;
            }
        }

        .content {
            width: 100%;
            height: 100%;
            position: relative;

            .content-item {
                height: 100%;
            }

            .content-list {
                width: 400px;
                background: linear-gradient(135deg, #F8B127, #CB26B6);
            }
        }
    }
}
</style>