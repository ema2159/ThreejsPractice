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

//Function to set all the angles for the robot
// These are set to comply with Kinematics API
function setRobotAngles(robotControls, normAngles, A) {
  robotControls[0].rotation.y = A[0] + normAngles[0];
  robotControls[1].rotation.y = A[1] + normAngles[1];
  robotControls[2].rotation.y = A[2] + normAngles[2];
  robotControls[3].rotation.y = A[3] + normAngles[3];
  robotControls[4].rotation.z = -A[4] + normAngles[4];
  robotControls[5].rotation.y = A[5] + normAngles[5];
  robotControls[6].rotation.x = A[6] + normAngles[6];
  robotControls[7].rotation.x = A[7] + normAngles[7];
}

const [normAngles, robotGeometry, robotControls] = createRobot(scene);
function robotAnimation(A0, A1, step) {
  let resultAngles = A0.map((angle, i) => {
    if(angle > A1[i]+step[i]) {
      return angle -= step[i];
    } else if(angle < A1[i]-step[i]){
      return angle += step[i];
    } else {
      return A1[i]
    }
  });
  return resultAngles;
}


const RobotKin = new Kinematics(robotGeometry)



function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
