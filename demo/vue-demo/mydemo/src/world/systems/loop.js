import { Clock } from "three";
const clock = new Clock();
class Loop {
    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updateList = [];
    }

    start() {
        console.log("animation start !!!")
        this.renderer.setAnimationLoop(() => {
            this.tick();
            this.renderer.render(this.scene, this.camera);
        })
    }
    stop() {
        console.log("animation stop !!!")
        this.renderer.setAnimationLoop(null)
    }
    tick() {
        const delta = clock.getDelta();
        //console.log(`The last frame rendered in ${delta * 1000}ms`);
        for (const obj of this.updateList) {
            obj.tick(delta)
        }
    }
}

export { Loop }