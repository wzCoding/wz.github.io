<template>
    <div class="carousel">
        <div class="swiper swiper-container" :class="containerClass">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="slide in slidesList" :key="slide.id">
                    <slot :name="type" :slide="slide">
                        <div :class="slide.class" :style="type == 'background' ? { backgroundImage: slide[type] } : {}">{{
                            type == 'background' ? '' : slide[type] }}</div>
                    </slot>
                </div>
            </div>
            <div v-if="pagation" class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'

export default {
    name: "carousel",
    props: {
        type: {
            type: String,
            default: 'background',
            validator(value) {
                return ['background', 'text'].includes(value)
            }
        },
        slides: {
            type: Array,
            default() {
                return []
            }
        },
        speed: {
            type: Number,
            default: 3000,
            validator(value) {
                return !isNaN(value)
            }
        },
        direction: {
            type: String,
            default: 'horizontal',
            validator(value) {
                return ['horizontal', 'vertical'].includes(value)
            }
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        pagation: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        slidesList: function () {
            const list = []

            this.slides.forEach((slide, index) => {

                let slideObj = {
                    id: `${this.type + (index + 1)}`,
                    class: `${this.type}-slide`,
                    [this.type]: this[this.type](slide)
                }

                if (typeof slide == "object") {
                    for (let key in slide) {
                        if (!slideObj[key]) slideObj[key] = slide[key]
                    }
                }

                list.push(slideObj)
            })
            return list
        },
        containerClass: function () {
            return `${this.type}-swiper`
        }
    },
    mounted() {
        const options = {
            loop: true,
            direction: this.direction
        }
        if (this.autoplay) {
            options.autoplay = {
                delay: this.speed,
                disableOnInteraction: false,
                reverseDirection: this.type == 'text'
            }
        }
        if (this.pagation) {
            options.pagination = {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    const customClass1 = 'custom-bullet'
                    const customClass2 = 'custom-bullet-dot'
                    return `<sapn class='${className} ${customClass1}'><span class='${customClass2}'></span></sapn>`
                }
            }
        }
        new Swiper(`.${this.containerClass}`, options)
    },
    methods: {
        background(param) {
            let str = param
            if (typeof param == 'object') {
                const regexp = /\.[jpg|jpeg|png|bmp|gif|webp]*$/g
                str = Object.values(param).filter(v => { return v.match(regexp) })[0]
            }
            const hasUrl = str.match('url');
            return hasUrl ? str : `url(${str})`
        },
        text(param) {
            return typeof param == 'string' ? param : '';
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../css/base.scss";

.swiper {
    width: 100%;
    height: 100%;

    .swiper-slide {
        width: 100%;
        height: 100%;

        .text-slide {
            width: 100%;
            height: 100%;
            font-size: 1.125rem;
            color: #868686;
            @include flex(flex-start, flex-end);
        }

        .background-slide {
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
    }
}
</style>
<style lang="scss">

.swiper-pagination {
    .custom-bullet {
        display: inline-block;
        position: relative;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: 50%;
        background-color: transparent;
        transition: background-color 0.3s;
        margin: 0 .75rem !important;

        .custom-bullet-dot {
            display: inline-block;
            width: .875rem;
            height: .125rem;
            background-color: #e6e6e6;
        }
    }

    .swiper-pagination-bullet-active {
        background-color: rgba(230, 230, 230, 0.4);
    }
}
</style>