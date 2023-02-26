import { BoxGeometry, Mesh, MeshStandardMaterial } from "three"

function createCube(x = 2, y = 2, z = 2) {
    const options = {
        color:"#fff"
    }
    const geometry = new BoxGeometry(x, y, z);
    const material = new MeshStandardMaterial(options);
    const cube = new Mesh(geometry, material);

    return cube;
}

export { createCube }