import * as THREE from "https://unpkg.com/three/build/three.module.js";
import {OrbitControls} from "https://unpkg.com/three/examples/jsm/controls/OrbitControls.js";
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
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer setup
const renderingBox = document.getElementById("upper");
const renderer = new THREE.WebGLRenderer();
// Set renderer size (window size)
renderer.setSize(renderingBox.offsetWidth, renderingBox.offsetHeight);

// Setup orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(27, 0, 0);
controls.listenToKeyEvents(window); // optional

// Append renderer to index.html body
renderingBox.appendChild(renderer.domElement);

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

camera.position.x = 27;
camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  primitives.forEach((primitive) => {
    primitive.forEach((element, i) => {
      element.rotation.x += 0.01 + 0.001 * i;
      element.rotation.y += 0.01;
    });
  });
  renderer.render(scene, camera);
}
animate();
