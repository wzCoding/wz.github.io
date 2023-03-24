<template>
    <div id="container"></div>
</template>

<script>
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { Vector3, PlaneGeometry, TextureLoader, ACESFilmicToneMapping, RepeatWrapping, PMREMGenerator, MathUtils } from 'three';
import { World } from '../world/world';
export default {
    name: "sea",
    data() {
        return {
            world: null,
            // turbidity: 0.05,
            // rayleigh: 1,
            // mieCoefficient: 0.05,
            // mieDirectionalG: 0.8
            
            turbidity: 0,
            rayleigh: 0.05,
            mieCoefficient: 0.05,
            mieDirectionalG: 0.8
        }
    },
    computed: {

    },
    mounted() {
        this.init();
    },
    destroyed() { this.world.stop() },
    methods: {
        init() {
            const waterGeometry = new PlaneGeometry(10000, 10000);
            const waterTexture = "../../static/texture/waternormals.jpg";
            const water = new Water(waterGeometry, {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new TextureLoader().load(waterTexture, function (texture) {
                    texture.wrapS = texture.wrapT = RepeatWrapping;
                }, function (error) {
                    console.log(error)
                }),
                sunDirection: new Vector3(),
                sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: 3.7,
                fog: true
            });
            water.rotation.x = - Math.PI / 2;

            const sky = new Sky();
            const sun = new Vector3();

            sky.scale.setScalar(10000);
            const skyUniforms = sky.material.uniforms;
            skyUniforms['turbidity'].value = this.turbidity;
            skyUniforms['rayleigh'].value = this.rayleigh;
            skyUniforms['mieCoefficient'].value = this.mieCoefficient;
            skyUniforms['mieDirectionalG'].value = this.mieDirectionalG;
            const parameters = {
                elevation: 3,
                azimuth: 180
            };
            water.tick = () => {
                water.material.uniforms['time'].value += 1.0 / 60.0;
            }
            const options = {
                el: document.querySelector("#container"),
                cameraOption: {
                    fov: 35,
                    near: 10,
                    far: 20000,
                    x: 30, y: 0, z: 100
                },
                rendererOption: {
                    setPixelRatio: window.devicePixelRatio,
                    setSize: { width: window.innerWidth, height: window.innerHeight },
                    toneMapping: ACESFilmicToneMapping
                },
                sceneOption: {
                    sceneChild: [water, sky]
                },
                animationList: [water]
            }
            const world = new World(options);
            const { renderer, scene, control } = world.getComponents();

            control.maxPolarAngle = Math.PI * 0.495;
            control.target.set(0, 10, 0);
            control.minDistance = 40.0;
            control.maxDistance = 200.0;
            world.start();

            const pmremGenerator = new PMREMGenerator(renderer);
            let renderTarget;
            function updateSun() {
                const phi = MathUtils.degToRad(90 - parameters.elevation);
                const theta = MathUtils.degToRad(parameters.azimuth);
                sun.setFromSphericalCoords(1, phi, theta);
                sky.material.uniforms['sunPosition'].value.copy(sun);
                water.material.uniforms['sunDirection'].value.copy(sun).normalize();
                if (renderTarget !== undefined) renderTarget.dispose();
                renderTarget = pmremGenerator.fromScene(sky);
                scene.environment = renderTarget.texture;
            }
            updateSun();
            this.world = world;
        },
    }
}
</script>
<style scoped>
#container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
}

.go {
    position: absolute;
    z-index: 10;
    cursor: pointer;
    text-decoration: underline;
}
</style>
