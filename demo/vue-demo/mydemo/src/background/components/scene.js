import { Color, Scene } from "three";

function createScene() {
    const scene = new Scene();
    scene.background = new Color("#d9d9d9");
    return scene;
}
export { createScene }