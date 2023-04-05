//防抖函数
function debounce(func, delay) {
    let timer
    return function () {
     
        const that = this
        const args = arguments
       
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.call(that, args)
        }, delay)
    }
}
//节流函数
function throttle(func, delay) {
    let timer
    return function () {

        const that = this
        const args = arguments

        if (timer) return
        timer = setTimeout(() => {
            func.call(that, args)
            timer = null
        }, delay)
    }
}

export {
    debounce,
    throttle
}