<template>
    <!-- <div class="background-container" :style="bgImg">
        <div class="background-box" v-for="bg in bgList" :key="bg.id" v-show="bg.active">
            <div v-for="(styleObj, i) in bg.itemList" :key="styleObj.id" :style="styleObj" :class="bg.itemClass[i]">
            </div>
        </div>
    </div> -->
    <div class="background-container">
        <div class="swiper swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">slide1</div>
                <div class="swiper-slide">slide2</div>
                <div class="swiper-slide">slide3</div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default {
    data() {
        return {
            bgImg: null,
            bgList: [],
            options: [
                {
                    row: 3,
                    col: 2,
                    backgroundImage: `url(/static/background/bh1.jpg)`,
                    style: ['translate', 'xy'],
                },
                {
                    row: 12,
                    col: 1,
                    backgroundImage: `url(/static/background/bh4.png)`,
                    style: ['rotate', 'y']
                },
                {
                    row: 12,
                    col: 1,
                    backgroundImage: `url(/static/background/bh2.jpg)`,
                    style: ['translate', 'y']
                }
            ],
            delay: 3000,
            backgroundChangeInterval: 1500,
            itemChangeInterval: 100
        }
    },
    computed: {
        bgImgList: function () {
            const list = [];
            this.options.forEach(o => { list.push({ backgroundImage: o.backgroundImage }) })
            return list;
        }
    },
    mounted() {
        const swiper = new Swiper(".swiper", {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
                clickable :true,
            },
        })
        // this.initBackground();
        // this.animate();
    },
    methods: {
        initBackground() {
            this.bgImg = { backgroundImage: this.options[0].backgroundImage }
            this.options.forEach((item, index) => {
                const bg = {
                    active: index == 0,
                    itemList: this.setBackgroundList(item),
                    itemClass: [],
                    id: `bg${index}`
                }
                this.bgList.push(bg)
            });
        },
        animate() {
            let count = 0;
            const bgChange = setInterval(() => {
                count++;
                if (count >= this.bgList.length) {
                    count = 0
                }
                for (let i = 0; i < this.bgList.length; i++) {
                    this.bgList[i].active = false;
                    this.bgList[i].itemClass = [];
                }
                this.bgList[count].active = true;

                this.backgroundChange(count);
            }, this.delay)
        },
        backgroundChange(index) {
            let sum = -1;
            const bgInterval = 1000
            const item = this.options[index];
            const background = this.bgImgList[index];
            const totalItem = item.row * item.col;
            if (item.style[1].includes('xy')) {
                const list = [];
                for (let i = 0; i < totalItem; i++) { list.push(`bg-item${index}`) }
                setTimeout(() => {
                    this.bgList[index].itemClass = list
                    setTimeout(() => { this.bgImg = background }, bgInterval);
                }, bgInterval)
            } else {
                const interval = setInterval(() => {
                    sum++
                    this.bgList[index].itemClass.push(`bg-item${index}`)
                    if (sum == totalItem) {
                        clearInterval(interval)
                        setTimeout(() => { this.bgImg = background }, bgInterval)
                    }
                }, this.itemChangeInterval)
            }
        },
        setBackgroundList(item) {
            const slist = [];
            const { row, col, style } = item;
            const w = window.innerWidth / row, h = window.innerHeight / col;

            const { tlist, plist } = this[`${style[0]}Style`](row, col, style);
            for (let i = 0; i < row * col; i++) {
                const styleObj = {
                    display: `inline-block`,
                    backgroundRepeat: `no-repeat`,
                    transition: `all ${this.backgroundChangeInterval / 1000}s`,
                    backgroundSize: `${window.innerWidth}px ${window.innerHeight}px`,
                    backgroundImage: item.backgroundImage,
                    width: `${w}px`,
                    height: `${h}px`,
                    id: `bg-item${i}`,
                    index: i,
                    transform: tlist[i],
                    backgroundPosition: plist[i]
                }
                slist.push(styleObj);
            }
            return slist;
        },
        translateStyle(row, col, style) {
            const tlist = [], plist = [];
            const w = window.innerWidth / row, h = window.innerHeight / col;
            for (let j = 0; j < col; j++) {
                for (let i = 0; i < row; i++) {
                    let tObj = { x: 0, y: -h };
                    let pObj = { x: -i * w, y: 0 }
                    if (style[1] == "x") {
                        tObj = { x: -w, y: 0 }
                        pObj = { x: 0, y: -i * h }
                    }
                    if (style[1] == "xy") {
                        tObj = { x: (-1 + i) * w, y: h * (j > 0 ? 1 : -1) }
                        pObj = { x: -i * w, y: -j * h }
                    }
                    tlist.push(`${style[0]}(${tObj.x}px,${tObj.y}px)`);
                    plist.push(`${pObj.x}px ${pObj.y}px`);
                }
            }
            return { tlist, plist }
        },
        rotateStyle(row, col) {
            const tlist = [], plist = [];
            const w = window.innerWidth / row, h = window.innerHeight / col;
            for (let j = 0; j < col; j++) {
                for (let i = 0; i < row; i++) {
                    let tObj = `rotateY(90deg)`;
                    let pObj = { x: -i * w, y: 0 }
                    /*  */
                    // if (style[1] == "x") {}
                    // if (style[1] == "z") {}
                    tlist.push(tObj);
                    plist.push(`${pObj.x}px ${pObj.y}px`);
                }
            }
            return { tlist, plist }
        },
        scaleStyle(row, col) {
            const tlist = [], plist = [];
            //const w = window.innerWidth / row, h = window.innerHeight / col;
            for (let j = 0; j < col; j++) {
                for (let i = 0; i < row; i++) {
                    let tObj = `scale(0)`;
                    let pObj = { x: 0, y: 0 }
                    /*  */
                    // if (style[1] == "x") {}
                    // if (style[1] == "y") {}
                    // if (style[1] == "z") {}
                    // if (style[1] == "3d") {}
                    tlist.push(tObj);
                    plist.push(`${pObj.x}px ${pObj.y}px`);
                }
            }
            return { tlist, plist }
        },
    }

}
</script>
<style scoped>
.background-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    transition: all 0.5s;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.background-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 0;
    box-sizing: border-box;
}

.bg-item0,
.bg-item2 {
    transform: translate(0, 0) !important;
}

.bg-item1 {
    transform: rotateY(0deg) !important;
}
</style>
