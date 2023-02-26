import { DirectionalLight } from "three";

function createLights() {
    const lightColor = "#69c0ff";
    const lightStrength = 12;
    const light = new DirectionalLight(lightColor, lightStrength)
    light.position.set(-10,10,10)
    return light;
}

export { createLights }