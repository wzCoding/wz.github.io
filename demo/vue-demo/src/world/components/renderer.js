import { WebGLRenderer } from "three";

function createRenderer(options) {
    const aa = { antialias:true }
    const renderer = new WebGLRenderer(aa);
    renderer.physicallyCorrectLights = true;

    if(options && options.setPixelRatio) renderer.setPixelRatio(options.setPixelRatio);
    if(options && options.setSize) renderer.setSize(options.setSize);
    if(options && options.toneMapping) renderer.toneMapping = options.toneMapping;
    return renderer;
}
export { createRenderer }