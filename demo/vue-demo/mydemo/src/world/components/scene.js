import { Color, Scene } from "three";
import { createLights } from './lights';
function createScene(options) {
    const scene = new Scene();
    scene.background = new Color("#a0cfff"); //设置场景默认背景色
   
    if (options && options.color) scene.background = new Color(options.color); //设置场景的背景色
    if (options && options.needLights) {
        const { ambientLight, mainLignt } = createLights();
        scene.add(ambientLight, mainLignt);
    }
    if (options && options.sceneChild) {
        options.sceneChild.forEach(child => { scene.add(child) }); //设置向场景中添加的展示物体
    }
    return scene;
}
export { createScene }