import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three/examples/jsm/controls/OrbitControls.js";
import { VRButton } from 'https://unpkg.com/three/examples/jsm/webxr/VRButton.js';
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';
import { Interaction } from "./vendor/three\.interaction/build/three\.interaction\.module.js";
import Kinematics from "./vendor/kinematics/dist/kinematics.js"
import createRobot from "./robot.js";
import { setRobotAngles } from "./robot.js";

// Constants:
// Make PI less tedious to type
const pi = Math.PI;
// Reference position using robot arm's base as reference
const coordsCalibration = [0, -2, -5]

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

// Add VRButton
document.body.appendChild( VRButton.createButton( renderer ) );
renderer.xr.enabled = true;

// Setup orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, -2);
controls.listenToKeyEvents(window); // optional

// Append renderer to index.html body
document.body.appendChild(renderer.domElement);

// Configure lights
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(0, 0, 1).normalize();
scene.add(light);

// Create materials
const material2 = new THREE.MeshPhongMaterial({
  color: 0xba45a3,
  shininess: 150,
});

const metal =  new THREE.MeshStandardMaterial( {
  color: 0x303030,
  metalness: 1.0,
  roughness: 0.7,
  ambientIntensity: 0.2,
  aoMapIntensity: 1.0,
  envMapIntensity: 1.0,
  normalScale: 1.0
});

// Create robot and provide robot controls, geometry (for Kinematics) and holding point
const [normAngles, robotGeometry, robotControls, holdingPoint] = createRobot(scene, coordsCalibration);

// Initialize Kinematics object for calculating the angles
const RobotKin = new Kinematics(robotGeometry)

// Put robot in initial position
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

// Function for creating a set of clickable spheres which start a pickup animation when clicked
function createSpheres(sphereAmount, rRange, theetaRange) {
  // Sphere position calculation according to given range in poolar coordinates
  const sphereDims = [0.3, 30, 30];
  const spherePositions = [];
  let r;
  let theeta;
  for (let i = 0; i < sphereAmount; i++) {
    r = Math.random() * (rRange[1] - rRange[0]) + rRange[0];
    theeta = Math.random() * (theetaRange[1] - theetaRange[0]) + theetaRange[0];
    if(spherePositions
       .filter(pos =>
	 // Calculate if the spheres don't overlap
	 {return Math.sqrt(pos[0]**2 + r**2 - 2*pos[0]*r*Math.cos(pos[1]-theeta)) < 2*sphereDims[0]})
       .length === 0) {
      spherePositions.push([r, theeta]);
    }
  }

  // Create spheres given the positions
  // Sphere properties
  const sphereGeometry1 = new THREE.SphereGeometry(...sphereDims);

  // Animation blocking variable
  let runningAnimation = false;
 
  spherePositions.map(pos => {
    const sphere = new THREE.Mesh(sphereGeometry1, material2);
    const sphereCoors = [pos[0]*Math.cos(pos[1]) + coordsCalibration[0],
			0 + coordsCalibration[1],
			-pos[0]*Math.sin(pos[1]) + coordsCalibration[2]];
    sphere.position.set(...sphereCoors);
    scene.add(sphere);

    sphere.cursor = 'pointer';
    sphere.on('click', function(ev) {
      // Block other animations when animation already in place
      if(runningAnimation) {
	return;
      } else {
	runningAnimation = true;
      }
      // Sphere coordinates
      let currSphere = this;
      let {x, y, z} = currSphere.position;
      x -= coordsCalibration[0];
      y -= coordsCalibration[1] - sphereDims[0];
      z -= coordsCalibration[2];
      // Create angles for the sphere grabbing animation 
      let angles1 = [...RobotKin.inverse(x, y, z, 0, 0, -pi/2), -pi/6, pi/6];
      let angles2 = [...RobotKin.inverse(x, y, z, 0, 0, -pi/2), -pi/16, pi/16];
      // Create the sphere grabbing animation with tween and tween2
      let tween = new TWEEN.Tween(anglesCurrent)
	  .to(angles1, 600)
	  .easing(TWEEN.Easing.Quadratic.Out)
	  .onUpdate(function() {
	    setRobotAngles(robotControls, normAngles, anglesCurrent);
	  });
      let tween2 = new TWEEN.Tween(anglesCurrent)
	  .to(angles2, 200)
	  .easing(TWEEN.Easing.Quadratic.Out)
	  .onUpdate(function() {
	    setRobotAngles(robotControls, normAngles, anglesCurrent);
	  })
	  .onComplete(function() {
	    currSphere.position.set(0, 0, 0)
	    holdingPoint.add(currSphere);
	  });
      // Trashbin coordinates
      ({x, y, z} = trashBin.position);
      x -= coordsCalibration[0];
      y -= coordsCalibration[1]-2;
      z -= coordsCalibration[2];
      // Create angles for the sphere grabbing animation 
      let angles3 = [...RobotKin.inverse(x, y, z, 0, 0, -pi/2), -pi/16, pi/16];
      let angles4 = [...RobotKin.inverse(x, y, z, 0, 0, -pi/2), -pi/6, pi/6];
      // Create throwing the trash animation
      let tween3 = new TWEEN.Tween(anglesCurrent)
	  .to(angles3, 800)
	  .easing(TWEEN.Easing.Quadratic.In)
	  .onUpdate(function(){
	    setRobotAngles(robotControls, normAngles, anglesCurrent);
	  });
      let tween4 = new TWEEN.Tween(anglesCurrent)
	  .to(angles4, 200)
	  .easing(TWEEN.Easing.Quadratic.In)
	  .onUpdate(function(){
	    setRobotAngles(robotControls, normAngles, anglesCurrent);
	  })
	  .onComplete(function(){
	    holdingPoint.remove(currSphere);
	    x += coordsCalibration[0]+0.07;
	    y += coordsCalibration[1]-0.25;
	    z += coordsCalibration[2];
	    currSphere.position.set(x, y, z);
	    scene.add(currSphere);
	  });
      let tween5 = new TWEEN.Tween({y: y+coordsCalibration[1]-0.25})
	  .to({y: -1.5}, 200)
	  .easing(TWEEN.Easing.Quadratic.In)
	  .onUpdate(function(object){
	    currSphere.position.setY(object.y);
	  })
	  .onComplete(function(){
	    scene.remove(currSphere);
	    runningAnimation = false;
	  });
      // Animation chain
      tween4.chain(tween5);
      tween3.chain(tween4);
      tween2.chain(tween3);
      tween.chain(tween2);
      tween.start();
    });
  });
}

createSpheres(20, [1.3, 2.9], [-5*pi/6, pi/2]);


renderer.setAnimationLoop( function () {
  renderer.render(scene, camera);
  TWEEN.update();
});
