
let width, height
let row, col
let transformStyle
let transformDirection
let size
let backgroundImage


function getImgUrl(str){
    const hasUrl = str.match('url');
    return hasUrl ? str : `url(${str})`
}
class Background {
    constructor(bgOptions) {
        row = bgOptions.row
        col = bgOptions.col

        width = bgOptions.width ? bgOptions.width / row : window.innerWidth / row
        height = bgOptions.height ? bgOptions.height / col : window.innerHeight / col
        size =bgOptions.size ? bgOptions.size.join(" ") : '100%'

        transformStyle = bgOptions.style[0]
        transformDirection = bgOptions.style[1]

        backgroundImage = getImgUrl(bgOptions.backgroundImage)
    }

    backgroundData(tlist,plist) {
        const backgroundObj = {
            itemList:[],
            backgroundImage:backgroundImage,
            backgroundSize: size
        };

        for (let i = 0; i < row * col; i++) {
            const styleObj = {
                display: `inline-block`,
                backgroundRepeat: `no-repeat`,
                transition: `all 1.5s`,
                backgroundImage: backgroundImage,
                width: `${width}px`,
                height: `${height}px`,
                id: `bg-item${i}`,
                index: i,
                transform: tlist[i],
                backgroundPosition: plist[i]
            }
            backgroundObj.itemList.push(styleObj);
        }
        return backgroundObj;
    }
    transformer() {
        const tlist = [], plist = [];

        for (let j = 0; j < col; j++) {

            for (let i = 0; i < row; i++) {
                let tObj = null;
                let pObj = null;

                if (transformStyle == "translate") {
                    tObj = { x: 0, y: -height };
                    pObj = { x: -i * width, y: 0 }

                    if (transformDirection == "x") {
                        tObj = { x: -width, y: 0 }
                        pObj = { x: 0, y: -i * height }
                    }
                    if (transformDirection == "xy") {
                        tObj = { x: (-1 + i) * width, y: height * (j > 0 ? 1 : -1) }
                        pObj = { x: -i * width, y: -j * height }
                    }

                    tlist.push(`${transformStyle}(${tObj.x}px,${tObj.y}px)`);
                }

                if (transformStyle == "rotate") {
                    tObj = `${transformStyle}Y(90deg)`;
                    pObj = { x: -i * width, y: 0 }
                    // if (transformDirection == "x") {}
                    // if (transformDirection == "z") {}
                    tlist.push(tObj);
                }

                if (transformStyle == "scale") {
                    tObj = `scale(0)`;
                    pObj = { x: 0, y: 0 };
                    // if (transformDirection == "x") {}
                    // if (transformDirection == "y") {}
                    // if (transformDirection == "z") {}
                    // if (transformDirection == "3d") {}
                    tlist.push(tObj);
                }

                plist.push(`${pObj.x}px ${pObj.y}px`);

            }
        }

        return { tlist, plist }
    }
}

export { Background }