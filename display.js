
import * as THREE from 'three';
import { OBJLoader } from './OBJLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
let rect = document.getElementById("showcase").getBoundingClientRect();
renderer.setSize(rect.width, rect.height);
document.getElementById("showcase").appendChild(renderer.domElement);
renderer.setClearColor(new THREE.Color(0xffffff), 0);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 20;

const loader = new OBJLoader();

let face = null;

loader.load('./canonical_face_model.obj',
    function (object) {
        face = object;
        scene.add(object);
        console.log(object);
        object.children[0].material.wireframe = true

    },
    // called when loading is in progresses
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

        console.log('An error happened', error);

    }
)

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    if (face) {
        // face.rotation.x += 0.01;
        face.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
};

animate();