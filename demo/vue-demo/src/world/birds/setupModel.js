import { MathUtils, AnimationMixer } from "three";

function setupModel(data) {
    //console.log(data)
    const model = data.scene.children[0];
    const clip = data.animations[0];
    model.scale.set(0.03, 0.03, 0.03);
    model.rotation.y = MathUtils.degToRad(30);
    //model.material.flatShading = false;

    const mixer = new AnimationMixer(model);
    const action = mixer.clipAction(clip);
    console.log(model);
    action.play();

    model.tick = (delta) => mixer.update(delta);
    return model;
}

export { setupModel }