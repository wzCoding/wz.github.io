<template>
    <div id="top">
        <div class="container">
            <div class="row justify-content-between align-items-center">
                <slot name="top" :contents="contents">
                    <div v-for="menu in contents" :key="menu.menuClass" class="col-6">
                        <div :class="menu.menuClass">
                            <span v-if="menu.icon" class="iconfont" :class="menu.icon"></span>
                            <span v-if="menu.title" class="menu-title">{{ menu.title }}</span>
                        </div>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: "top",
    
    props: {
        contents: {
            type: Array,
            default() {
                return [
                    {
                        icon: "icon-blog",
                        menuClass: "menu-left",
                        title: "wzCoding"
                    },
                    {
                        icon: "icon-sun",
                        menuClass: "menu-right",
                    }
                ]
            }
        }
    },
    data() {
        return {
            theme: "light",
        };
    }
}
</script>
<style lang="scss" scoped>
@import "../../css/base.scss";

#top {

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 15px 0;
    -webkit-box-shadow: 0px 5px 25px -5px rgba(0, 0, 0, 0.05);
    box-shadow: 0px 5px 25px -5px rgba(0, 0, 0, 0.05);
    z-index: 11;

    .iconfont {
        text-align: center;
        line-height: 35px;
        background: -webkit-linear-gradient(315deg, #CB26B6, #F8B127);
        background: -o-linear-gradient(315deg, #CB26B6, #F8B127);
        background: linear-gradient(135deg, #CB26B6, #F8B127);
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
    }

    .menu-left {

        .icon-blog,
        .menu-title {
            font-size: 2rem;
        }

        .menu-title {
            font-family: $font-family;
            font-weight: 600;
            padding-left: 10px;
        }
    }

    .menu-right {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;

        .iconfont {
            font-size: 1.5rem;
            padding: 0 5px;
        }
    }



}
</style>