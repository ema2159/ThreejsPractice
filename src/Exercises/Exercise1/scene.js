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
const floorGeometry = new THREE.PlaneGeometry(60, 8);
const floor = new THREE.Mesh(floorGeometry, material1);
scene.add(floor);
floor.position.set(27, -3, -2);
floor.rotation.x -= Math.PI / 2;

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

// Create circles
// Circle 1
const circleGeometry1 = new THREE.CircleGeometry(0.5, 32);
const circle1 = new THREE.Mesh(circleGeometry1, material1);
circle1.position.set(3, -2, 0);
// Circle 2
const circleGeometry2 = new THREE.CircleGeometry(1.2, 5);
const circle2 = new THREE.Mesh(circleGeometry2, material2);
circle2.position.set(3, -2, -2);
// Circle 3
const circleGeometry3 = new THREE.CircleGeometry(1, 30, 0, Math.PI);
const circle3 = new THREE.Mesh(circleGeometry3, material3);
circle3.position.set(3, -2, -4);
// Circles
const circles = [circle1, circle2, circle3];

// Pusch  to circles primitives array
primitives.push(circles);

// Create cones
// Cone 1
const coneGeometry1 = new THREE.ConeGeometry(0.5, 2);
const cone1 = new THREE.Mesh(coneGeometry1, material1);
cone1.position.set(6, -2, 0);
// Cone 2
const coneGeometry2 = new THREE.ConeGeometry(1.2, 0.5);
const cone2 = new THREE.Mesh(coneGeometry2, material2);
cone2.position.set(6, -2, -2);
// Cone 3
const coneGeometry3 = new THREE.ConeGeometry(1, 1, 20);
const cone3 = new THREE.Mesh(coneGeometry3, material3);
cone3.position.set(6, -2, -4);
// Cones
const cones = [cone1, cone2, cone3];

// Pusch cones to primitives array
primitives.push(cones);

// Create cylinders
// Cylinder 1
const cylinderGeometry1 = new THREE.CylinderGeometry(1, 1, 1, 32);
const cylinder1 = new THREE.Mesh(cylinderGeometry1, material1);
cylinder1.position.set(9, -2, 0);
// Cylinder 2
const cylinderGeometry2 = new THREE.CylinderGeometry(1.2, 0.5, 0.3);
const cylinder2 = new THREE.Mesh(cylinderGeometry2, material2);
cylinder2.position.set(9, -2, -2);
// Cylinder 3
const cylinderGeometry3 = new THREE.CylinderGeometry(0.5, 1, 1, 5);
const cylinder3 = new THREE.Mesh(cylinderGeometry3, material3);
cylinder3.position.set(9, -2, -4);
// cylinders
const cylinders = [cylinder1, cylinder2, cylinder3];

// Pusch cylinders to primitives array
primitives.push(cylinders);

// Create dodecahedrons
// Dodecahedron 1
const dodecahedronGeometry1 = new THREE.DodecahedronGeometry(1);
const dodecahedron1 = new THREE.Mesh(dodecahedronGeometry1, material1);
dodecahedron1.position.set(12, -2, 0);
// Dodecahedron 2
const dodecahedronGeometry2 = new THREE.DodecahedronGeometry(0.7);
const dodecahedron2 = new THREE.Mesh(dodecahedronGeometry2, material2);
dodecahedron2.position.set(12, -2, -2);
// Dodecahedron 3
const dodecahedronGeometry3 = new THREE.DodecahedronGeometry(0.5, 1);
const dodecahedron3 = new THREE.Mesh(dodecahedronGeometry3, material3);
dodecahedron3.position.set(12, -2, -4);
// Dodecahedrons
const dodecahedrons = [dodecahedron1, dodecahedron2, dodecahedron3];

// Pusch dodecahedrons to primitives array
primitives.push(dodecahedrons);

// Create icosahedrons
// Icosahedron 1
const icosahedronGeometry1 = new THREE.IcosahedronGeometry(1);
const icosahedron1 = new THREE.Mesh(icosahedronGeometry1, material1);
icosahedron1.position.set(15, -2, 0);
// Icosahedron 2
const icosahedronGeometry2 = new THREE.IcosahedronGeometry(0.7);
const icosahedron2 = new THREE.Mesh(icosahedronGeometry2, material2);
icosahedron2.position.set(15, -2, -2);
// Icosahedron 3
const icosahedronGeometry3 = new THREE.IcosahedronGeometry(0.5, 1);
const icosahedron3 = new THREE.Mesh(icosahedronGeometry3, material3);
icosahedron3.position.set(15, -2, -4);
// Icosahedrons
const icosahedrons = [icosahedron1, icosahedron2, icosahedron3];

// Pusch icosahedrons to primitives array
primitives.push(icosahedrons);

// Create octahedrons
// Octahedron 1
const octahedronGeometry1 = new THREE.OctahedronGeometry(1);
const octahedron1 = new THREE.Mesh(octahedronGeometry1, material1);
octahedron1.position.set(18, -2, 0);
// Octahedron 2
const octahedronGeometry2 = new THREE.OctahedronGeometry(1, 2);
const octahedron2 = new THREE.Mesh(octahedronGeometry2, material2);
octahedron2.position.set(18, -2, -2);
// Octahedron 3
const octahedronGeometry3 = new THREE.OctahedronGeometry(1, 1);
const octahedron3 = new THREE.Mesh(octahedronGeometry3, material3);
octahedron3.position.set(18, -2, -4);
// Octahedrons
const octahedrons = [octahedron1, octahedron2, octahedron3];

// Pusch octahedrons to primitives array
primitives.push(octahedrons);

// Create tetrahedrons
// Tetrahedron 1
const tetrahedronGeometry1 = new THREE.TetrahedronGeometry(1);
const tetrahedron1 = new THREE.Mesh(tetrahedronGeometry1, material1);
tetrahedron1.position.set(21, -2, 0);
// Tetrahedron 2
const tetrahedronGeometry2 = new THREE.TetrahedronGeometry(1, 2);
const tetrahedron2 = new THREE.Mesh(tetrahedronGeometry2, material2);
tetrahedron2.position.set(21, -2, -2);
// Tetrahedron 3
const tetrahedronGeometry3 = new THREE.TetrahedronGeometry(1, 1);
const tetrahedron3 = new THREE.Mesh(tetrahedronGeometry3, material3);
tetrahedron3.position.set(21, -2, -4);
// Tetrahedrons
const tetrahedrons = [tetrahedron1, tetrahedron2, tetrahedron3];

// Pusch tetrahedrons to primitives array
primitives.push(tetrahedrons);

// Create spheres
// Sphere 1
const sphereGeometry1 = new THREE.SphereGeometry(1, 30, 30);
const sphere1 = new THREE.Mesh(sphereGeometry1, material1);
sphere1.position.set(24, -2, 0);
// Sphere 2
const sphereGeometry2 = new THREE.SphereGeometry(1, 30, 30, 0, Math.PI);
const sphere2 = new THREE.Mesh(sphereGeometry2, material2);
sphere2.position.set(24, -2, -2);
// Sphere 3
const sphereGeometry3 = new THREE.SphereGeometry(
  1,
  30,
  30,
  0,
  1.5 * Math.PI,
  0,
  0.5 * Math.PI
);
const sphere3 = new THREE.Mesh(sphereGeometry3, material3);
sphere3.position.set(24, -2, -4);
// Spheres
const spheres = [sphere1, sphere2, sphere3];

// Pusch spheres to primitives array
primitives.push(spheres);

// Create rings
// Ring 1
const ringGeometry1 = new THREE.RingGeometry(0.5, 1, 30, 30);
const ring1 = new THREE.Mesh(ringGeometry1, material1);
ring1.position.set(27, -2, 0);
// Ring 2
const ringGeometry2 = new THREE.RingGeometry(0.9, 1);
const ring2 = new THREE.Mesh(ringGeometry2, material2);
ring2.position.set(27, -2, -2);
// Ring 3
const ringGeometry3 = new THREE.RingGeometry(0.5, 1, 30, 30, 0, Math.PI);
const ring3 = new THREE.Mesh(ringGeometry3, material3);
ring3.position.set(27, -2, -4);
// Rings
const rings = [ring1, ring2, ring3];

// Pusch rings to primitives array
primitives.push(rings);

// Create toruses
// Torus 1
const torusGeometry1 = new THREE.TorusGeometry(1, 0.3, 30, 30);
const torus1 = new THREE.Mesh(torusGeometry1, material1);
torus1.position.set(30, -2, 0);
// Torus 2
const torusGeometry2 = new THREE.TorusGeometry(1, 0.1);
const torus2 = new THREE.Mesh(torusGeometry2, material2);
torus2.position.set(30, -2, -2);
// Torus 3
const torusGeometry3 = new THREE.TorusGeometry(0.5, 0.1);
const torus3 = new THREE.Mesh(torusGeometry3, material3);
torus3.position.set(30, -2, -4);
// Toruses
const toruses = [torus1, torus2, torus3];

// Pusch toruses to primitives array
primitives.push(toruses);

// Create torusKnots
// TorusKnot 1
const torusKnotGeometry1 = new THREE.TorusKnotGeometry(0.4);
const torusKnot1 = new THREE.Mesh(torusKnotGeometry1, material1);
torusKnot1.position.set(33, -2, 0);
// TorusKnot 2
const torusKnotGeometry2 = new THREE.TorusKnotGeometry(0.5, 0.1);
const torusKnot2 = new THREE.Mesh(torusKnotGeometry2, material2);
torusKnot2.position.set(33, -2, -2);
// TorusKnot 3
const torusKnotGeometry3 = new THREE.TorusKnotGeometry(0.1, 0.1);
const torusKnot3 = new THREE.Mesh(torusKnotGeometry3, material3);
torusKnot3.position.set(33, -2, -4);
// TorusKnots
const torusKnots = [torusKnot1, torusKnot2, torusKnot3];

// Pusch torusKnots to primitives array
primitives.push(torusKnots);
// Add all elements to the scene
primitives.forEach((primitive) => {
  primitive.forEach((element) => scene.add(element));
});

camera.position.x = 30;
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
