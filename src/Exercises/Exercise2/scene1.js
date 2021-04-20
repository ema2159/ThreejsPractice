import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";
import {FlyControls} from "https://unpkg.com/three@0.126.1/examples/jsm/controls/FlyControls.js";
import addPrimitives from "./primitives.js";

// Setup scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x21272e);

// Renderers setup
// Select rendering spaces
const renderingBoxUp = document.getElementById("upper");
const renderingBoxDown = document.getElementById("lower");
// Create new renderers
const rendererUp = new THREE.WebGLRenderer();
const rendererDown = new THREE.WebGLRenderer();
// Set renderers size
rendererUp.setSize(renderingBoxUp.offsetWidth, renderingBoxUp.offsetHeight);
rendererDown.setSize(renderingBoxDown.offsetWidth, renderingBoxDown.offsetHeight);

// Camera configuration
// Parameters: FOV, aspect ratio, minimum rendering distance, maximum rendering distance
const perspectiveCamera = new THREE.PerspectiveCamera(75,
					   window.innerWidth / window.innerHeight,
                                           0.1,
                                           1000);

const ortographicCamera = new THREE.OrthographicCamera(-5, 5, 5, -5, 1, 1000);

// Setup orbit controls
// Fly controls
// Set the clock for the fly controls 
const clock = new THREE.Clock();
const controls = new FlyControls(perspectiveCamera, rendererUp.domElement);
controls.movementSpeed = 1000;
controls.domElement = rendererUp.domElement;
controls.rollSpeed = Math.PI / 24;
controls.autoForward = false;
controls.dragToLook = false;

// Orbit controls
const controls2 = new OrbitControls(ortographicCamera, rendererDown.domElement);
controls2.target.set(27, 0, 0);
controls2.listenToKeyEvents(window); // optional


// Append renderers to index.html elements
renderingBoxUp.appendChild(rendererUp.domElement);
renderingBoxDown.appendChild(rendererDown.domElement);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 1, 1).normalize();
scene.add(light);

const primitives = addPrimitives();

// Add all elements to the scene
primitives.forEach((primitive) => {
  primitive.forEach((element) => scene.add(element));
});

// Function for drawing a cross on a x, y, z coordinate
function createCross(center, material) {
  let x, y, z;
  [x, y, z] = center;
  let vectorPoints = [];
  vectorPoints.push(new THREE.Vector3(x, y, z));
  vectorPoints.push(new THREE.Vector3(x + 0.5, y, z));
  vectorPoints.push(new THREE.Vector3(x + 0.25, y, z));
  vectorPoints.push(new THREE.Vector3(x + 0.25, y, z + 0.25));
  vectorPoints.push(new THREE.Vector3(x + 0.25, y, z - 0.25));

  let geometry = new THREE.BufferGeometry().setFromPoints(vectorPoints);

  let line = new THREE.Line(geometry, material);
  scene.add(line);
}

const lineMaterial = new THREE.LineBasicMaterial({
  color: 0xeaeaea,
  linewidth: 2,
});

for (var i = -4; i < 56; i++) {
  for (var j = -19; j < 19; j++) {
    createCross([i, -3, j], lineMaterial);
  }
}

perspectiveCamera.position.set(27, 0, 5);

ortographicCamera.position.set(4.7, 3, 5);
ortographicCamera.lookAt(27, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  primitives.forEach((primitive) => {
    primitive.forEach((element, i) => {
      element.rotation.x += 0.01 + 0.001 * i;
      element.rotation.y += 0.01;
    });
  });
  controls.movementSpeed = 10;
  controls.rollSpeed = 1;
  controls.update( clock.getDelta() );
  rendererUp.render(scene, perspectiveCamera);
  rendererDown.render(scene,ortographicCamera);
}
animate();
