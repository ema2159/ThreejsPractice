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

// Rotation base disc (D2)
const cylinderGeometry2 = new THREE.CylinderGeometry(0.6, 0.6, 0.2, 32);
const baseDisc2 = new THREE.Mesh(cylinderGeometry2, metal1);
scene.add(baseDisc2);
// Create pivot point between base disc and rotation base disc (D1 to D2)
const pivotPointD1toD2 = new THREE.Object3D();
baseDisc.add(pivotPointD1toD2);
// Set base disc 1 (D1) as reference for base disc 2 (D2)
pivotPointD1toD2.add(baseDisc2);
// Set position from base disc 2
baseDisc2.position.set(0, 0.2, 0);

// Arm 1 (A1)
const armGeometry1 = new THREE.BoxGeometry(0.4, 0.8, 0.3);
const arm1 = new THREE.Mesh(armGeometry1, metal1);
scene.add(arm1);
// Create pivot point between base disc 2 and arm 1 (D2 to A1)
const pivotPointD2toA1 = new THREE.Object3D();
baseDisc2.add(pivotPointD2toA1);
// Set base disc 2 (D2) as reference for arm (A1)
pivotPointD2toA1.add(arm1);
arm1.position.set(0, 0.3, 0);
pivotPointD2toA1.rotation.z = Math.PI/4

// Rotation disc 1 (D3)
const cylinderGeometry3 = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32);
const rotationDisc1 = new THREE.Mesh(cylinderGeometry3, metal1);
scene.add(rotationDisc1);
// Create pivot point between arm 1 and rotation disc 1 (A1 to D3)
const pivotPointA1toD3 = new THREE.Object3D();
arm1.add(pivotPointA1toD3);
// Set arm (A1) as reference for rotation disc 1 (D3)
pivotPointA1toD3.add(rotationDisc1);
rotationDisc1.position.set(0, 0.4, 0.1);
rotationDisc1.rotation.x = Math.PI/2

// Rotation disc 2 (D4)
const cylinderGeometry4 = new THREE.CylinderGeometry(0.2, 0.3, 0.1, 32);
const rotationDisc2 = new THREE.Mesh(cylinderGeometry4, metal1);
scene.add(rotationDisc2);
// Create pivot point between rotation disc 1 and rotation disc 2 (D3 to D4)
const pivotPointD3toD4 = new THREE.Object3D();
rotationDisc1.add(pivotPointD3toD4);
// Set rotation disc 1 (D3) as reference for rotation disc 2 (D4)
pivotPointD3toD4.add(rotationDisc2);
rotationDisc2.position.set(0, 0.3, 0);
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
