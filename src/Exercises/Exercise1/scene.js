import * as THREE from "https://unpkg.com/three/build/three.module.js";
import {OrbitControls} from "https://unpkg.com/three/examples/jsm/controls/OrbitControls.js";

// Setup scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x21272e);

// Camera configuration
// Parameters: FOV, aspect ratio, minimum rendering distance, maximum rendering distance
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer setup
const renderer = new THREE.WebGLRenderer();
// Set renderer size (window size)
renderer.setSize(window.innerWidth, window.innerHeight);

// Setup orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(30, 0, 0);
controls.listenToKeyEvents(window); // optional

// Append renderer to index.html body
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 1, 1).normalize();
scene.add(light);

// Materials
const material1 = new THREE.MeshNormalMaterial();
const material2 = new THREE.MeshPhongMaterial({
  color: 0xba45a3,
  shininess: 150,
});
const material3 = new THREE.MeshToonMaterial({color: 0x1ea8fc});

// Create floor
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floor = new THREE.Mesh(floorGeometry, material1);
scene.add(floor);
floor.position.set(0, -4, 0);
floor.rotation.x -= Math.PI/2;

const primitives = [];

// Create cubes
// Box 1
const boxGeometry1 = new THREE.BoxGeometry();
const box1 = new THREE.Mesh(boxGeometry1, material1);
box1.position.set(0, -2, 0);
// Box 2
const boxGeometry2 = new THREE.BoxGeometry(1, 1, 0.3);
const box2 = new THREE.Mesh(boxGeometry2, material2);
box2.position.set(0, -2, -2);
// Box 3
const boxGeometry3 = new THREE.BoxGeometry(0.1, 1, 1, 1, 1, 1);
const box3 = new THREE.Mesh(boxGeometry3, material3);
box3.position.set(0, -2, -4);
// Boxes
const boxes = [box1, box2, box3];

// Pusch boxes to primitives array
primitives.push(boxes);

// Add all elements to the scene
primitives.forEach((primitive) => {
  primitive.forEach((element) => scene.add(element));
});

camera.position.x = 30;
camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
