import * as THREE from "https://unpkg.com/three/build/three.module.js";
import {OrbitControls} from "https://unpkg.com/three/examples/jsm/controls/OrbitControls.js";
import createRobot from "./robot.js";
import Kinematics from "./node_modules/kinematics/dist/kinematics.js"

// Setup scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xDADADA);

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

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(0, 0, 1).normalize();
scene.add(light);

let robotControls = createRobot(scene);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // baseDisc2.rotation.y += 0.01;
  // rotationDisc1.rotation.y += 0.01
  // rotationDisc4.rotation.y += 0.01
  // rotationCylinder.rotation.y += 0.01;
  // pivotPointPBtoPRC.rotation.z += 0.01;
  // pliersRotationCylinder.rotation.y += 0.1;
  // pivotPointPH1toPGB2.rotation.x += 0.01;
  // pivotPointPH1toPGB1.rotation.x -= 0.01;
}
animate();
