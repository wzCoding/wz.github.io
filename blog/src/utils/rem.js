import { debounce } from "./utils"

const baseFontSize = 16
const baseScreenWidth = 1920

function rem() {

    const scale = document.documentElement.clientWidth / baseScreenWidth
    const fontSize = baseFontSize * Math.min(scale, 2)
    console.log(`font-size: ${fontSize}`)
    document.documentElement.style.fontSize = fontSize < baseFontSize ? `${baseFontSize}px` : `${Math.round(fontSize)}px`
    //document.documentElement.style.fontSize = fontSize < 12 ? `12px` : `${Math.round(fontSize)}px`

}

rem()

const delay = 500
const setRem = debounce(rem, delay)

window.addEventListener("resize", function () {
    setRem()
})

