<template>
    <div id="container">
        <div @click="go" class="go">go</div>
    </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js"

export default {
    name: "background",
    data() {
        return {
            scene: null,
            camera: null,
            renderer: null,
            water: null
        }
    },
    computed: {
        container() {
            return document.querySelector("#container")
        }
    },
    mounted() {
        this.init();
        this.animate();
    },
    methods: {
        go() {
            this.$router.push("/navbar")
        },
        init() {
            let camera, scene, renderer;
            let water, sun;
            let controls;
            const w = window.innerWidth, h = window.innerHeight;

            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(w, h);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;

            this.container.appendChild(renderer.domElement);

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(55, w / h, 1, 20000);
            camera.position.set(30, 30, 100);

            sun = new THREE.Vector3();

            const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
            const waterImg = require("../assets/waternormals.jpg");
            water = new Water(waterGeometry, {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load(waterImg, function (texture) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                }, function (error) {
                    console.log(error)
                }),
                sunDirection: new THREE.Vector3(),
                sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: 3.7,
                fog: scene.fog !== undefined
            });
            water.rotation.x = - Math.PI / 2;

            scene.add(water);

            const sky = new Sky();
            sky.scale.setScalar(10000);

            scene.add(sky);

            const skyUniforms = sky.material.uniforms;

            skyUniforms['turbidity'].value = 0;
            skyUniforms['rayleigh'].value = 2;
            skyUniforms['mieCoefficient'].value = 0.005;
            skyUniforms['mieDirectionalG'].value = 0.8;

            const parameters = {
                elevation: 3,
                azimuth: 180
            };

            const pmremGenerator = new THREE.PMREMGenerator(renderer);
            let renderTarget;

            function updateSun() {

                const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
                const theta = THREE.MathUtils.degToRad(parameters.azimuth);

                sun.setFromSphericalCoords(1, phi, theta);

                sky.material.uniforms['sunPosition'].value.copy(sun);
                water.material.uniforms['sunDirection'].value.copy(sun).normalize();

                if (renderTarget !== undefined) renderTarget.dispose();

                renderTarget = pmremGenerator.fromScene(sky);

                scene.environment = renderTarget.texture;

            }

            updateSun();


            controls = new OrbitControls(camera, renderer.domElement);
            controls.maxPolarAngle = Math.PI * 0.495;
            controls.target.set(0, 10, 0);
            controls.minDistance = 50.0;
            controls.maxDistance = 200.0;
            controls.update();

            this.scene = scene;
            this.camera = camera;
            this.renderer = renderer;
            this.water = water;

            const _this = this;
            window.addEventListener('resize', _this.onWindowResize);

        },
        onWindowResize() {

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);

        },
        animate() {
            requestAnimationFrame(this.animate);
            this.render();
        },
        render() {
            this.water.material.uniforms['time'].value += 1.0 / 60.0;
            this.renderer.render(this.scene, this.camera);
        }
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
.go{
    position: absolute;
    z-index: 10;
    cursor: pointer;
    text-decoration: underline;
}
</style>