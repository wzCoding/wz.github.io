import { DirectionalLight, AmbientLight, HemisphereLight } from "three";

function createLights() {
    // const lightColor = "#fff";
    // const lightStrength = 8;
    // const light = new DirectionalLight(lightColor, lightStrength);
    const ambientLight = new HemisphereLight("white","darkslategrey", 10);
    const mainLignt = new DirectionalLight("white", 5);
    mainLignt.position.set(10, 10, 10);
    // light.position.set(-10, 10, 10)
    return { ambientLight, mainLignt };
}

export { createLights }