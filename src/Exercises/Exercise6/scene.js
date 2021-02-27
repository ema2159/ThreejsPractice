import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three/examples/jsm/controls/OrbitControls.js";
import { Interaction } from "./vendor/three\.interaction/build/three\.interaction\.module.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';
import Kinematics from "./vendor/kinematics/dist/kinematics.js"
import createRobot from "./robot.js";
import { setRobotAngles } from "./robot.js";

// Make PI less tedious to type
const pi = Math.PI;

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

// Setup Interactive module
const interaction = new Interaction(renderer, scene, camera);

// Setup orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, -2);
controls.listenToKeyEvents(window); // optional

// Append renderer to index.html body
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(0, 0, 1).normalize();
scene.add(light);

// Create materials
const material2 = new THREE.MeshPhongMaterial({
  color: 0xba45a3,
  shininess: 150,
});

const metal =  new THREE.MeshStandardMaterial( {
  color: 0x808080,
  metalness: 1.0,
  roughness: 0.7,
  ambientIntensity: 0.2,
  aoMapIntensity: 1.0,
  envMapIntensity: 1.0,
  normalScale: 1.0
});

const coordsCalibration = [0, -2, -5]
const [normAngles, robotGeometry, robotControls] = createRobot(scene, coordsCalibration);

const RobotKin = new Kinematics(robotGeometry)

let anglesCurrent = [0, 0, 0, 0, 0, 0, -pi/4, pi/4]
setRobotAngles(robotControls, normAngles, anglesCurrent);


// Trash bin
const extrudeSettings = {
    amount : 1.2,
    steps : 1,
    bevelEnabled: false,
    curveSegments: 140
};

const arcShape = new THREE.Shape();
arcShape.absarc(0, 0, 0.7, 0, Math.PI * 2, 0, false);

const holePath = new THREE.Path();
holePath.absarc(0, 0, 0.6, 0, Math.PI * 2, true);
arcShape.holes.push(holePath);

const trashBinGeometry = new THREE.ExtrudeGeometry(arcShape, extrudeSettings);
const trashBin = new THREE.Mesh(trashBinGeometry, metal);
const trashBinCoors = [-2 + coordsCalibration[0],
		       0 + coordsCalibration[1],
		       -1 + coordsCalibration[2]];
trashBin.position.set(...trashBinCoors);
trashBin.rotation.x = -pi/2
scene.add(trashBin);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update();
}
animate();
