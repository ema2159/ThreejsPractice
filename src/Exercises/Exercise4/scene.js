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

// Arm 2 (A2)
const armGeometry2 = new THREE.BoxGeometry(0.4, 1.8, 0.15);
const arm2 = new THREE.Mesh(armGeometry2, metal1);
scene.add(arm2);
// Create pivot point between rotation disc 1 and arm 2 (A2 to D3)
const pivotPointA2toD3 = new THREE.Object3D();
rotationDisc1.add(pivotPointA2toD3);
// Set base disc 2 (D3) as reference for arm (A2)
pivotPointA2toD3.add(arm2);
arm2.position.set(0, 1, 0.15);
pivotPointA2toD3.rotation.x = -Math.PI/2

// Rotation disc 3 (D5)
const cylinderGeometry5 = new THREE.CylinderGeometry(0.25, 0.25, 0.5, 32);
const rotationDisc3 = new THREE.Mesh(cylinderGeometry5, metal1);
scene.add(rotationDisc3);
// Create pivot point between arm 2 and rotation disc 3 (A2 to D5)
const pivotPointA2toD5 = new THREE.Object3D();
arm2.add(pivotPointA2toD5);
// Set arm (A2) as reference for rotation disc 3 (D5)
pivotPointA2toD5.add(rotationDisc3);
rotationDisc3.position.set(0, 0.755, -0.15);
rotationDisc3.rotation.x = Math.PI/2

// Rotation disc 4 (D6)
const cylinderGeometry6 = new THREE.CylinderGeometry(0.15, 0.25, 0.1, 32);
const rotationDisc4 = new THREE.Mesh(cylinderGeometry6, metal1);
scene.add(rotationDisc4);
// Create pivot point between rotation disc 3 and rotation disc 4 (D5 to D6)
const pivotPointD5toD6 = new THREE.Object3D();
rotationDisc3.add(pivotPointD5toD6);
// Set rotation disc 3 (D5) as reference for rotation disc 4 (D6)
pivotPointD5toD6.add(rotationDisc4);
rotationDisc4.position.set(0, 0.3, 0);

// Upper base (UB)
const cylinderGeometry7 = new THREE.CylinderGeometry(0.2, 0.3, 0.8, 32);
const upperBase = new THREE.Mesh(cylinderGeometry7, metal1);
scene.add(upperBase);
// Create pivot point between rotation disc 3 and upper base (D5 to UB)
const pivotPointD5toUB = new THREE.Object3D();
rotationDisc3.add(pivotPointD5toUB);
// Set rotation disc 3 (D5) as reference for upper base (UB)
pivotPointD5toUB.add(upperBase);
upperBase.position.set(0.1, -0.3, 0.05);
upperBase.rotation.x = Math.PI/2
upperBase.rotation.z = -Math.PI/3

// Rotation cylinder (RC)
const cylinderGeometry8 = new THREE.CylinderGeometry(0.15, 0.15, 1, 32);
const rotationCylinder = new THREE.Mesh(cylinderGeometry8, metal1);
scene.add(rotationCylinder);
// Create pivot point between upper base and rotation cylinder (UB to RC)
const pivotPointUBtoRC = new THREE.Object3D();
upperBase.add(pivotPointUBtoRC);
// Set upper base (UB) as reference for rotation cylinder (RC)
pivotPointUBtoRC.add(rotationCylinder);
rotationCylinder.position.set(0.0, 0.7, 0.0);

// Pliers base (PB)
const pliersBaseGeometry2 = new THREE.BoxGeometry(0.4, 0.4, 0.4);
const pliersBase = new THREE.Mesh(pliersBaseGeometry2, metal1);
scene.add(pliersBase);
// Create pivot point between Rotation cylinder and pliers base (RC to PB)
const pivotPointRCtoPB = new THREE.Object3D();
rotationCylinder.add(pivotPointRCtoPB);
// Set rotation cylinder (RC) as reference for pliers base (PB)
pivotPointRCtoPB.add(pliersBase);
pliersBase.position.set(0, 0.7, 0);

// Pliers disc 1 (PD1)
const cylinderGeometry10 = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32);
const pliersDisc1 = new THREE.Mesh(cylinderGeometry10, metal1);
scene.add(pliersDisc1);
// Create pivot point between upper base and rotation cylinder (UB to RC)
const pivotPointPBtoPD1 = new THREE.Object3D();
pliersBase.add(pivotPointPBtoPD1);
// Set upper base (UB) as reference for rotation cylinder (RC)
pivotPointPBtoPD1.add(pliersDisc1);
pliersDisc1.position.set(0.0, 0.23, 0.175);
pliersDisc1.rotation.x += Math.PI/2;

// Pliers disc 2 (PD1)
const cylinderGeometry11 = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32);
const pliersDisc2 = new THREE.Mesh(cylinderGeometry11, metal1);
scene.add(pliersDisc2);
// Create pivot point between upper base and rotation cylinder (UB to RC)
const pivotPointPBtoPD2 = new THREE.Object3D();
pliersBase.add(pivotPointPBtoPD2);
// Set upper base (UB) as reference for rotation cylinder (RC)
pivotPointPBtoPD2.add(pliersDisc2);
pliersDisc2.position.set(0.0, 0.23, -0.175);
pliersDisc2.rotation.x += Math.PI/2;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
