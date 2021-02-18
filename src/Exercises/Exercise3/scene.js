import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
import vertexes from './vertexes.js'

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

  const vertices = vertexes;
  const numVertices = vertices.length;
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
    28, 29, 30,  30, 29, 31,
    32, 33, 34,  34, 33, 35, // right
    36, 37, 38,  38, 37, 39,
    40, 41, 42,  42, 41, 43,
    44, 45, 46,  46, 45, 47,
    48, 49, 50,  50, 49, 51,
    52, 53, 54,  54, 53, 55,
    56, 57, 58,  58, 57, 59,
    60, 61, 62,  62, 61, 63,
    64, 65, 66,  66, 65, 67, // back
    68, 69, 70,  70, 69, 71,
    72, 73, 74,  74, 73, 75,
    76, 77, 78,  78, 77, 79,
    80, 81, 82,  82, 81, 83,
    84, 85, 86,  86, 85, 87,
    88, 89, 90,  90, 89, 91,
    92, 93, 94,  94, 93, 95,
    96, 97, 98,  98, 97, 99, // left
    100, 101, 102,  102, 101, 103,
    104, 105, 106,  106, 105, 107,
    108, 109, 110,  110, 109, 111,
    112, 113, 114,  114, 113, 115,
    116, 117, 118,  118, 117, 119,
    120, 121, 122,  122, 121, 123,
    124, 125, 126,  126, 125, 127,
    128, 129, 130,  130, 129, 131, // top
    132, 133, 134,  134, 133, 135,
    136, 137, 138,  138, 137, 139,
    140, 141, 142,  142, 141, 143,
    144, 145, 146,  146, 145, 147,
    148, 149, 150,  150, 149, 151,
    152, 153, 154,  154, 153, 155,
    156, 157, 158,  158, 157, 159,
    160, 161, 162,  162, 161, 163, // bottom
    164, 165, 166,  166, 165, 167,
    168, 169, 170,  170, 169, 171,
    172, 173, 174,  174, 173, 175,
    176, 177, 178,  178, 177, 179,
    180, 181, 182,  182, 181, 183,
    184, 185, 186,  186, 185, 187,
    188, 189, 190,  190, 189, 191,
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
