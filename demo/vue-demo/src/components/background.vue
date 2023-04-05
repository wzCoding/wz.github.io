<template>
    <div class="background-container">
        <div class="swiper swiper-container">
            <div class="swiper-wrapper">
                <div v-for="bg in bgItemList" :key="bg.id" class="swiper-slide">
                    <!-- <div v-for="(styleObj, i) in bg.itemList" :key="styleObj.id" :style="styleObj" :class="bg.itemClass[i]">
                        
                    </div> -->
                    {{ `slide${bg.id}` }}
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>

import Swiper from 'swiper'
import 'swiper/css/swiper.css'

import { Background } from '../utils/background'
import { delayTimer, loopTimer } from '../utils/timer'

export default {
    name: "background",
    data() {
        return {
            itemClass:[],
            options: [
                {
                    row: 12,
                    col: 1,
                    backgroundImage: `url(/static/background/bh1.jpg)`,
                    size: ["100%", "125%"],
                    style: ['rotate', 'y'],
                },
                {
                    row: 12,
                    col: 1,
                    backgroundImage: `url(/static/background/bh2.jpg)`,
                    size: ["100%", "125%"],
                    style: ['translate', 'y'],
                }
            ],
            delay: 3000,
            backgroundChangeInterval: 1500,
            itemChangeInterval: 100
        }
    },
    computed: {
        bgItemList: {
            get: function () {
                const list = []
                this.options.forEach((item, index) => {
                    const background = new Background(item)
                    const { tlist, plist } = background.transformer()
                    const backgroundObj = background.backgroundData(tlist, plist)
                    const bg = {
                        itemClass: this.itemClass,
                        itemList: backgroundObj.itemList,
                        backgroundImage: backgroundObj.backgroundImage,
                        backgroundSize: backgroundObj.backgroundSize,
                        transformClass: `bg-item-${item.style[0]}`,
                        id: `bg${index}`
                    }
                    list.push(bg)
                });
                return list;
            },
            set:function(val){
                console.log(val)
            }
        }
    },
    mounted() {
        console.log(this.bgItemList)
        this.bgImg = {
            backgroundImage: this.bgItemList[0].backgroundImage,
            backgroundSize: this.bgItemList[0].backgroundSize
        }
        const that = this;
        const swiper = new Swiper(".swiper-container", {
            //effect: 'fade',
            loop: true, // 循环模式
            //分页器
            direction:'vertical',
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            on: {
                slideChange: function () {
                    const index = this.activeIndex - 1
                    //that.backgroundChange(index)
                },
            },
        })
    },
    methods: {
        // animate() {
        //     let count = 0;
        //     const bgChange = setInterval(() => {
        //         count++;
        //         if (count >= this.bgList.length) {
        //             count = 0
        //         }
        //         for (let i = 0; i < this.bgList.length; i++) {
        //             this.bgList[i].active = false;
        //             this.bgList[i].itemClass = [];
        //         }
        //         this.bgList[count].active = true;

        //         this.backgroundChange(count);
        //     }, this.delay)
        // },
        backgroundChange(index) {
            this.itemClass = [];
            let sum = -1;
            const bgInterval = 1000
            const item = this.options[index];
            const background = this.bgItemList[index];
            const totalItem = item.row * item.col;
            if (item.style[1].includes('xy')) {
                const list = [];
                for (let i = 0; i < totalItem; i++) { list.push(background.transformClass) }
                setTimeout(() => {
                    this.itemClass = list
                    setTimeout(() => { this.bgImg = background }, bgInterval);
                }, bgInterval)
            } else {
                const interval = setInterval(() => {
                    sum++
                    this.itemClass.push(background.transformClass)
                    if (sum == totalItem) {
                        clearInterval(interval)
                        setTimeout(() => { this.bgImg = background }, bgInterval)
                    }
                }, this.itemChangeInterval)
            }
        },
    }

}
</script>
<style scoped>
.background-container {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    transition: all 0.5s;
    background-repeat: no-repeat;
}

.swiper {
    width:300px;
    height: 400px;
}
.swiper-slide{
    text-align: center;
}
.background-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background-size: 100% 100%;
}

.bg-item-translate {
    transform: translate(0, 0) !important;
}

.bg-item-rotate {
    transform: rotateY(0deg) !important;
}

.bg-item-scale {
    transform: scale(1) !important;
}
</style>
