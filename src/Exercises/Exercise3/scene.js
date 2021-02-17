import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 5;

  var controls = new OrbitControls( camera, renderer.domElement );
  controls.listenToKeyEvents( window ); // optional

  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xDADADA );


  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }


  // NOT A GOOD EXAMPLE OF HOW TO MAKE A CUBE!
  // Only trying to make it clear most vertices are unique
  const vertices = [
    // front
    // 1
    { pos: [-1,   -1,  1], norm: [0,  0,  1], uv: [0,    0], }, // 0
    { pos: [-0.5, -1,  1], norm: [0,  0,  1], uv: [0.25, 0], }, // 1
    { pos: [-1,    1,  1], norm: [0,  0,  1], uv: [0,    1], }, // 2
    { pos: [-0.5,  1,  1], norm: [0,  0,  1], uv: [0.25, 1], }, // 3
    // 2
    { pos: [0.5, -1,  1], norm: [0,  0,  1], uv: [0.75, 0], }, // 4
    { pos: [1,   -1,  1], norm: [0,  0,  1], uv: [1,    0], }, // 5
    { pos: [0.5,  1,  1], norm: [0,  0,  1], uv: [0.75, 1], }, // 6
    { pos: [1,    1,  1], norm: [0,  0,  1], uv: [1,    1], }, // 7
    // 3
    { pos: [-0.5, -1,    1], norm: [0,  0,  1], uv: [0.25, 0], }, // 8
    { pos: [0.5,  -1,    1], norm: [0,  0,  1], uv: [0.75, 0], }, // 9
    { pos: [-0.5, -0.5,  1], norm: [0,  0,  1], uv: [0.25, 0.25], }, // 10
    { pos: [0.5,  -0.5,  1], norm: [0,  0,  1], uv: [0.75, 0.25], }, // 11
    // 4
    { pos: [-0.5, 0.5,  1], norm: [0,  0,  1], uv: [0.25, 0.75], }, // 12
    { pos: [0.5,  0.5,  1], norm: [0,  0,  1], uv: [0.75, 0.75], }, // 13
    { pos: [-0.5, 1,    1], norm: [0,  0,  1], uv: [0.25, 1], }, // 14
    { pos: [0.5,  1,    1], norm: [0,  0,  1], uv: [0.75, 1], }, // 15
    // 5
    { pos: [-0.5, -0.5,  1],   norm: [0,   1,  0], uv: [0.25, 0.25], }, // 16
    { pos: [0.5,  -0.5,  1],   norm: [0,   1,  0], uv: [0.75, 0.25], }, // 17
    { pos: [-0.5, -0.5,  0.5], norm: [0,   1,  0], uv: [0.25, 0.5], }, // 18
    { pos: [0.5,  -0.5,  0.5], norm: [0,   1,  0], uv: [0.75, 0.5], }, // 19
    // 6
    { pos: [-0.5, 0.5,  0.5], norm: [0,  -1,  0], uv: [0.25, 0.5], }, // 20
    { pos: [0.5,  0.5,  0.5], norm: [0,  -1,  0], uv: [0.75, 0.5], }, // 21
    { pos: [-0.5, 0.5,  1],   norm: [0,  -1,  0], uv: [0.25, 0.75], }, // 22
    { pos: [0.5,  0.5,  1],   norm: [0,  -1,  0], uv: [0.75, 0.75], }, // 23
    // 7
    { pos: [0.5, -0.5,  1],   norm: [-1,   0,  0], uv: [0.75, 0.25], }, // 24
    { pos: [0.5,  0.5,  1],   norm: [-1,   0,  0], uv: [0.75, 0.75], }, // 25
    { pos: [0.5, -0.5,  0.5], norm: [-1,   0,  0], uv: [0.5,  0.25], }, // 26
    { pos: [0.5,  0.5,  0.5], norm: [-1,   0,  0], uv: [0.5,  0.75], }, // 27
    // 8
    { pos: [-0.5, -0.5,  0.5], norm: [1,  0,  0], uv: [0.5,  0.25], }, // 28
    { pos: [-0.5,  0.5,  0.5], norm: [1,  0,  0], uv: [0.5,  0.75], }, // 29
    { pos: [-0.5, -0.5,  1],   norm: [1,  0,  0], uv: [0.25, 0.25], }, // 30
    { pos: [-0.5,  0.5,  1],   norm: [1,  0,  0], uv: [0.25, 0.75], }, // 31
    // right
    // 1
    { pos: [1,   -1,  1], norm: [1,  0,  0], uv: [0,    0], }, // 32
    { pos: [1, -1,  0.5], norm: [1,  0,  0], uv: [0.25, 0], }, // 33
    { pos: [1,    1,  1], norm: [1,  0,  0], uv: [0,    1], }, // 34
    { pos: [1,  1,  0.5], norm: [1,  0,  0], uv: [0.25, 1], }, // 35
    // 2
    { pos: [1, -1, -0.5], norm: [1,  0,  0], uv: [0.75, 0], }, // 36
    { pos: [1, -1, -1  ], norm: [1,  0,  0], uv: [1,    0], }, // 37
    { pos: [1,  1, -0.5], norm: [1,  0,  0], uv: [0.75, 1], }, // 38
    { pos: [1,  1, -1  ], norm: [1,  0,  0], uv: [1,    1], }, // 39
    // 3
    { pos: [1,  -1,    0.5], norm: [1,  0,  0], uv: [0.25, 0], }, // 40
    { pos: [1,  -1,   -0.5], norm: [1,  0,  0], uv: [0.75, 0], }, // 41
    { pos: [1,  -0.5,  0.5], norm: [1,  0,  0], uv: [0.25, 0.25], }, // 42
    { pos: [1,  -0.5, -0.5], norm: [1,  0,  0], uv: [0.75, 0.25], }, // 43
    // 4
    { pos: [1, 0.5,   0.5], norm: [1,  0,  0], uv: [0.25, 0.75], }, // 44
    { pos: [1, 0.5,  -0.5], norm: [1,  0,  0], uv: [0.75, 0.75], }, // 45
    { pos: [1, 1,     0.5], norm: [1,  0,  0], uv: [0.25, 1], }, // 46
    { pos: [1, 1,    -0.5], norm: [1,  0,  0], uv: [0.75, 1], }, // 47
    // 5
    { pos: [1,   -0.5,  0.5], norm: [0,  1,  0], uv: [0.25, 0.25], }, // 48
    { pos: [1,   -0.5, -0.5], norm: [0,  1,  0], uv: [0.75, 0.25], }, // 49
    { pos: [0.5, -0.5,  0.5], norm: [0,  1,  0], uv: [0.25, 0.5], }, // 50
    { pos: [0.5, -0.5, -0.5], norm: [0,  1,  0], uv: [0.75, 0.5], }, // 51
    // 6
    { pos: [0.5, 0.5,  0.5], norm: [0,  -1,  0], uv: [0.25, 0.5], }, // 52
    { pos: [0.5, 0.5, -0.5], norm: [0,  -1,  0], uv: [0.75, 0.5], }, // 53
    { pos: [1,   0.5,  0.5], norm: [0,  -1,  0], uv: [0.25, 0.75], }, // 54
    { pos: [1,   0.5, -0.5], norm: [0,  -1,  0], uv: [0.75, 0.75], }, // 55
    // 7
    { pos: [1, -0.5, -0.5],   norm: [0,  0, -1], uv: [0.75, 0.25], }, // 56
    { pos: [1,  0.5, -0.5],   norm: [0,  0, -1], uv: [0.75, 0.75], }, // 57
    { pos: [0.5, -0.5, -0.5], norm: [0,  0, -1], uv: [0.5,  0.25], }, // 58
    { pos: [0.5,  0.5, -0.5], norm: [0,  0, -1], uv: [0.5,  0.75], }, // 59
    // 8
    { pos: [0.5, -0.5, 0.5], norm: [0,  0,  1], uv: [0.5,  0.25], }, // 60
    { pos: [0.5,  0.5, 0.5], norm: [0,  0,  1], uv: [0.5,  0.75], }, // 61
    { pos: [1,   -0.5, 0.5], norm: [0,  0,  1], uv: [0.25, 0.25], }, // 62
    { pos: [1,    0.5, 0.5], norm: [0,  0,  1], uv: [0.25, 0.75], }, // 63
    // back
    { pos: [ 1, -1, -1], norm: [ 0,  0, -1], uv: [0, 0], }, // 27
    { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 0], }, // 28 
    { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 1], }, // 29 
    { pos: [-1,  1, -1], norm: [ 0,  0, -1], uv: [1, 1], }, // 30 
    // left
    { pos: [-1, -1, -1], norm: [-1,  0,  0], uv: [0, 0], }, // 31
    { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 0], }, // 32 
    { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 1], }, // 33 
    { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [1, 1], }, // 34 
    // top
    { pos: [ 1,  1, -1], norm: [ 0,  1,  0], uv: [0, 0], }, // 35
    { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 0], }, // 36 
    { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 1], }, // 37 
    { pos: [-1,  1,  1], norm: [ 0,  1,  0], uv: [1, 1], }, // 38 
    // bottom
    { pos: [ 1, -1,  1], norm: [ 0, -1,  0], uv: [0, 0], }, // 39
    { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 0], }, // 40 
    { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 1], }, // 41 
    { pos: [-1, -1, -1], norm: [ 0, -1,  0], uv: [1, 1], }, // 42 
  ];
  const numVertices = vertices.length;
  console.log(numVertices);
  const positionNumComponents = 3;
  const normalNumComponents = 3;
  const uvNumComponents = 2;
  const positions = new Float32Array(numVertices * positionNumComponents);
  const normals = new Float32Array(numVertices * normalNumComponents);
  const uvs = new Float32Array(numVertices * uvNumComponents);
  let posNdx = 0;
  let nrmNdx = 0;
  let uvNdx = 0;
  for (const vertex of vertices) {
    positions.set(vertex.pos, posNdx);
    normals.set(vertex.norm, nrmNdx);
    uvs.set(vertex.uv, uvNdx);
    posNdx += positionNumComponents;
    nrmNdx += normalNumComponents;
    uvNdx += uvNumComponents;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, positionNumComponents));
  geometry.setAttribute(
      'normal',
      new THREE.BufferAttribute(normals, normalNumComponents));
  geometry.setAttribute(
      'uv',
      new THREE.BufferAttribute(uvs, uvNumComponents));

  geometry.setIndex([
     0,  1,  2,   2,  1,  3,  // front
     4,  5,  6,   6,  5,  7,
     8,  9, 10,  10,  9, 11,
    12, 13, 14,  14, 13, 15,
    16, 17, 18,  18, 17, 19,
    20, 21, 22,  22, 21, 23,
    24, 25, 26,  26, 25, 27,
    28, 29, 30,  30, 29, 31, // right
    32, 33, 34,  34, 33, 35,
    36, 37, 38,  38, 37, 39,
    40, 41, 42,  42, 41, 43,
    44, 45, 46,  46, 45, 47,
    48, 49, 50,  50, 49, 51,
    52, 53, 54,  54, 53, 55,
    56, 57, 58,  58, 57, 59,
    60, 61, 62,  62, 61, 63,
  ]);

  const loader = new THREE.TextureLoader();
  const texture = loader.load('grenouille.jpg');

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color: color, map: texture});

    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    cube.position.x = x;
    cube.rotation.y = -Math.PI/2;
    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0xFFFFFF,  0),
  ];

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.0004;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
