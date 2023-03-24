import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createRenderer } from "./components/renderer";

import { Resizer } from "./systems/resizer";
import { Loop } from "./systems/loop";
import { createControls } from "./systems/control";
import { loadBirds } from "./birds/birds";
let camera, scene, renderer;
let loop, control;

class World {
    constructor(options) {
        camera = createCamera(options && options.cameraOption ? options.cameraOption : {});
        scene = createScene(options && options.sceneOption ? options.sceneOption : {});
        renderer = createRenderer(options && options.rendererOption ? options.rendererOption : {});

        options.el.append(renderer.domElement);
        loop = new Loop(camera, scene, renderer);

        control = createControls(camera, renderer.domElement);
        loop.updateList.push(control);
        if (options && options.animationList) {
            options.animationList.forEach(element => {
                loop.updateList.push(element)
            });
        }
        const resizer = new Resizer(container, camera, renderer);


    }
    render() {
        renderer.render(scene, camera);
    }
    async init() {
        console.log("animation init !!!");
        const { parrot, flamingo, stork } = await loadBirds();
        control.target.copy(parrot.position);
        scene.add(parrot, flamingo, stork);
        loop.updateList.push(parrot, flamingo, stork);
    }
    start() {
        loop.start();
    }
    stop() {
        loop.stop();
    }
    getComponents() {
        return { renderer, scene, camera,control }
    }
}

export { World }