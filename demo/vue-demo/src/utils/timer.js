//延时定时器
function delayTimer(callback, delay) {
    let requestRef = null;
    const animate = (timestamp) => {
        if (timestamp >= delay) {
            callback && callback();
            cancelAnimationFrame(requestRef);
            return;
        }
        requestRef = requestAnimationFrame(animate);
    };
    requestRef = requestAnimationFrame(animate);
}

//循环定时器
function loopTimer(callback, delay, clearTime) {
    let requestRef = null;
    let timeDifferance = 0; // 动画执行间隔时间的偏差值，单位ms

    //let startTime; //动画开始时间
    let prevEndTime; //上一次动画结束时间
    let prevTime;  //上一次动画开始时间
    let endTime; //动画结束时间

    let interval = delay && delay >= 0 ? delay : 1000; //时间间隔
    let nextTime = interval;

    let totalDelay = 0;
    const animate = (timestamp) => {
        if (prevTime !== undefined) {

            //计算RAF执行的时间间隔;
            const deltaTime = timestamp - prevTime;

            //如果RAF执行的时间间隔大于我们自定义的时间间隔，说明动画执行变慢了
            if (deltaTime >= nextTime) {
                //console.log(`deltaTime: ${deltaTime}`)

                if (clearTime && clearTime >= delay) {
                    totalDelay += nextTime;
                    if (totalDelay >= clearTime) {
                        totalDelay = 0;
                        cancelAnimationFrame(requestRef);
                        return;
                    }
                }

                callback && callback();

                prevTime = timestamp;
                prevEndTime = endTime;
                endTime = new Date().getTime();

                //计算动画实际执行的间隔时间与给定间隔的时间的时间差值
                timeDifferance = endTime - prevEndTime - interval;
                //console.log(`timeDifferance: ${timeDifferance}`)

                //重新调整我们定义的间隔时间（新的时间间隔在我们给定的基础值上慢减快加）
                
                if (timeDifferance > 10 || timeDifferance < -10) timeDifferance = 0;

                nextTime = interval - timeDifferance;

                // console.log(`nextTime: ${nextTime}`)
                // console.log("")

            }
        } else {
            // startTime = new Date().getTime();
            prevTime = timestamp;
            endTime = new Date().getTime();
        }
        requestRef = requestAnimationFrame(animate);
    };
    requestRef = requestAnimationFrame(animate);
}

export { delayTimer, loopTimer }