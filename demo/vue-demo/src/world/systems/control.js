import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

function createControls(camera,canvas) {
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
// controls.listenToKeyEvents(window);

// controls.autoRotate = true;
// controls.autoRotateSpeed = 2;

// controls.minDistance = 0.1;
// controls.maxDistance = 10;
controls.tick = () => controls.update();
return controls
}
export { createControls }