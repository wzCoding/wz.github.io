import { BoxGeometry, Mesh, MeshBasicMaterial } from "three"

function createCube(x = 2, y = 2, z = 2) {
    const geometry = new BoxGeometry(x, y, z);
    const material = new MeshBasicMaterial();
    const cube = new Mesh(geometry, material);

    return cube;
}

export { createCube }