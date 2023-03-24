import { SphereGeometry, MeshStandardMaterial, Mesh, MathUtils, Group } from "three"


function createMaterial() {
    const options = {
        color: "indigo",
    }
    const material = new MeshStandardMaterial(options);
    return material;
}
function createMeshGroup() {

    const group = new Group();
    const geometry = new SphereGeometry(0.5, 24, 24);
    const material = createMaterial();
    const protoSphere = new Mesh(geometry, material);

    group.add(protoSphere);

    for (let i = 0; i < 1; i += 0.05) {
       const sphere = protoSphere.clone();
       sphere.position.x = Math.cos(2*Math.PI*i);
       sphere.position.y = Math.sin(2*Math.PI*i);
       sphere.position.z = -i * 5;
       sphere.scale.multiplyScalar(0.02 + i);
       group.add(sphere);
    }
    const radainsPerSecond = MathUtils.degToRad(30)
    group.tick = (delta) => { 
        group.rotation.z -= radainsPerSecond * delta;
    }

    return group;
}

export { createMeshGroup }