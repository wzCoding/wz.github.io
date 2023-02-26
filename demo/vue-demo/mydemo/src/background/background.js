import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createRenderer } from "./components/renderer";
import { createLights } from "./components/lights";
import { createCube } from "./components/cube";
import { Resizer } from "./systems/resizer";

let camera, scene, renderer;

class Background {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);
        
        const cube = createCube(1, 1, 1);
        const light = createLights();
        scene.add(cube,light);

        this.cube = cube;

        const resizer = new Resizer(container, camera, renderer);
    }
    render() {
        this.cube.rotation.x += 0.003;
        this.cube.rotation.y += 0.003;
        renderer.render(scene,camera);
    }
}

export { Background }