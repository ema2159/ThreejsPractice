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

// Create edges
// Edges 1
const edgesGeometry1 = new THREE.EdgesGeometry(boxGeometry1);
const edges1 = new THREE.LineSegments(
  edgesGeometry1,
  new THREE.LineBasicMaterial({color: 0x0000f9})
);
edges1.position.set(36, -2, 0);
// Edges 2
const edgesGeometry2 = new THREE.EdgesGeometry(boxGeometry2);
const edges2 = new THREE.LineSegments(
  edgesGeometry2,
  new THREE.LineBasicMaterial({color: 0x0000f9})
);
edges2.position.set(36, -2, -2);
// Edges 3
const edgesGeometry3 = new THREE.EdgesGeometry(boxGeometry3);
const edges3 = new THREE.LineSegments(
  edgesGeometry3,
  new THREE.LineBasicMaterial({color: 0x0000f9})
);
edges3.position.set(36, -2, -4);
// Edges
const edges = [edges1, edges2, edges3];

// Pusch edges to primitives array
primitives.push(edges);

// Create wireframe
// Wireframe 1
const wireframeGeometry1 = new THREE.WireframeGeometry(boxGeometry1);
const wireframe1 = new THREE.LineSegments(
  wireframeGeometry1,
  new THREE.LineBasicMaterial({color: 0xf90000})
);
wireframe1.position.set(39, -2, 0);
// Wireframe 2
const wireframeGeometry2 = new THREE.WireframeGeometry(boxGeometry2);
const wireframe2 = new THREE.LineSegments(
  wireframeGeometry2,
  new THREE.LineBasicMaterial({color: 0xf90000})
);
wireframe2.position.set(39, -2, -2);
// Wireframe 3
const wireframeGeometry3 = new THREE.WireframeGeometry(boxGeometry3);
const wireframe3 = new THREE.LineSegments(
  wireframeGeometry3,
  new THREE.LineBasicMaterial({color: 0xf90000})
);
wireframe3.position.set(39, -2, -4);
// Wireframe
const wireframe = [wireframe1, wireframe2, wireframe3];

// Pusch wireframe to primitives array
primitives.push(wireframe);

// Create extrudes
// Extrude shape
const shape = new THREE.Shape();
const x = -2.5;
const y = -5;
shape.moveTo(x + 2.5, y + 2.5);
shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

// Extrude settings
const extrudeSettings = {
  steps: 2,
  depth: 2,
  bevelEnabled: true,
  bevelThickness: 1,
  bevelSize: 1,
  bevelSegments: 2,
};

// Extrude 1
const extrudeGeometry1 = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const extrude1 = new THREE.Mesh(extrudeGeometry1, material1);
extrude1.scale.set(0.1, 0.1, 0.1);
extrude1.position.set(42, -2, 0);

// Extrude 2
extrudeSettings.depth = 4;
const extrudeGeometry2 = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const extrude2 = new THREE.Mesh(extrudeGeometry2, material2);
extrude2.scale.set(0.1, 0.1, 0.1);
extrude2.position.set(42, -2, -2);

// Extrude 3
extrudeSettings.depth = 0.5;
const extrudeGeometry3 = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const extrude3 = new THREE.Mesh(extrudeGeometry3, material3);
extrude3.scale.set(0.1, 0.05, 0.05);
extrude3.position.set(42, -2, -4);

// Extrude
const extrudes = [extrude1, extrude2, extrude3];

// Pusch extrude to primitives array
primitives.push(extrudes);

// Shape geometry
// Shape 1
const shapeGeometry1 = new THREE.ShapeGeometry(shape);
const shape1 = new THREE.Mesh(shapeGeometry1, material1);
shape1.scale.set(0.1, 0.1, 0.1);
shape1.position.set(45, -2, 0);

// Shape 2
const shapeGeometry2 = new THREE.ShapeGeometry(shape);
const shape2 = new THREE.Mesh(shapeGeometry2, material2);
shape2.scale.set(0.1, 0.1, 0.1);
shape2.position.set(45, -2, -2);

// Shape 3
const shapeGeometry3 = new THREE.ShapeGeometry(shape);
const shape3 = new THREE.Mesh(shapeGeometry3, material3);
shape3.scale.set(0.1, 0.05, 0.05);
shape3.position.set(45, -2, -4);

// Shape
const shapes = [shape1, shape2, shape3];

// Pusch shape to primitives array
primitives.push(shapes);

// Create texts
const loader = new THREE.FontLoader();
loader.load(
  "https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json",
  function (font) {
    // Text 1
    const textGeometry1 = new THREE.TextGeometry("Emma", {
      font: font,
      size: 50,
      height: 10,
    });

    const text1 = new THREE.Mesh(textGeometry1, material1);
    text1.scale.set(0.01, 0.01, 0.01);
    text1.position.set(48, -2, 0);

    // Text 2
    const textGeometry2 = new THREE.TextGeometry("UJM", {
      font: font,
      size: 50,
      height: 10,
    });

    const text2 = new THREE.Mesh(textGeometry2, material2);
    text2.scale.set(0.01, 0.01, 0.01);
    text2.position.set(48, -2, -2);

    // Text 3
    const textGeometry3 = new THREE.TextGeometry("UEF", {
      font: font,
      size: 50,
      height: 10,
    });

    const text3 = new THREE.Mesh(textGeometry3, material3);
    text3.scale.set(0.01, 0.01, 0.01);
    text3.position.set(48, -2, -4);

    // Text
    const texts = [text1, text2, text3];
    primitives.push(texts);
    scene.add(text1);
    scene.add(text2);
    scene.add(text3);
  }
);

// Create polyhedrons
const verticesOfCube = [
    -1, -1, -1,    1, -1, -1,    1,  1, -1,    -1,  1, -1,
    -1, -1,  1,    1, -1,  1,    1,  1,  1,    -1,  1,  1,
];
const indicesOfFaces = [
    2, 1, 0,    0, 3, 2,
    0, 4, 7,    7, 3, 0,
    0, 1, 5,    5, 4, 0,
    1, 2, 6,    6, 5, 1,
    2, 3, 7,    7, 6, 2,
    4, 5, 6,    6, 7, 4,
];

// Polyhedron 1
const polyhedronGeometry1 = new THREE.PolyhedronGeometry(
    verticesOfCube, indicesOfFaces, 1, 1);
const polyhedron1 = new THREE.Mesh(polyhedronGeometry1, material1);
polyhedron1.position.set(51, -2, 0);

// Polyhedron 2
const polyhedronGeometry2 = new THREE.PolyhedronGeometry(
    verticesOfCube, indicesOfFaces, 1.1, 3);
const polyhedron2 = new THREE.Mesh(polyhedronGeometry2, material2);
polyhedron2.position.set(51, -2, -2);

// Polyhedron 3
const polyhedronGeometry3 = new THREE.PolyhedronGeometry(
    verticesOfCube, indicesOfFaces, 0.5, 1);
const polyhedron3 = new THREE.Mesh(polyhedronGeometry3, material3);
polyhedron3.position.set(51, -2, -4);

const polyhedrons = [polyhedron1, polyhedron2, polyhedron3];
primitives.push(polyhedrons);

// Create Lathes
// Lathes points
const points = [];
for (let i = 0; i < 10; ++i) {
  points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
}

// Lathe 1
const latheGeometry1 = new THREE.LatheGeometry(points);
const lathe1 = new THREE.Mesh(latheGeometry1, material1);
lathe1.scale.set(0.1, 0.1, 0.1);
lathe1.position.set(54, -2, 0);

// Lathe 2
const latheGeometry2 = new THREE.LatheGeometry(points);
const lathe2 = new THREE.Mesh(latheGeometry2, material2);
lathe2.scale.set(0.1, 0.1, 0.2);
lathe2.position.set(54, -2, -2);

// Lathe 1
const latheGeometry3 = new THREE.LatheGeometry(points);
const lathe3 = new THREE.Mesh(latheGeometry3, material3);
lathe3.scale.set(0.1, 0.15, 0.1);
lathe3.position.set(54, -2, -4);

const lathes = [lathe1, lathe2, lathe3];
primitives.push(lathes);
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
