import { PerspectiveCamera } from "three";

function createCamera(
    { fov = 35,
        aspect = window.innerWidth / window.innerHeight,
        near = 0.1,
        far = 100,
        x = 0,
        y = 0,
        z = 10
    } = {}) {

    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(x, y, z);

    return camera;
}
export { createCamera }