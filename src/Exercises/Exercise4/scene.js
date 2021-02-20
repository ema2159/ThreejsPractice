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

camera.position.x = 0;
camera.position.z = 0;

// Renderer setup
const renderer = new THREE.WebGLRenderer();
// Set renderer size (window size)
renderer.setSize(window.innerWidth, window.innerHeight);

// Setup orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, -2);
controls.listenToKeyEvents(window); // optional

// Append renderer to index.html body
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 1, 1).normalize();
scene.add(light);

// Materials
const metal1 = new THREE.MeshNormalMaterial();

// Base disc (D1)
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 0.3, 32);
const baseDisc = new THREE.Mesh(cylinderGeometry, metal1);
baseDisc.position.set(0, -2, -5);
scene.add(baseDisc);
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
