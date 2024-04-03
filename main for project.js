import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('scene')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.82, 0)
});

const groundBody = new CANNON.Body({
  mass: 0,
  material: new CANNON.Material('ground'),
  shape: new CANNON.Plane()
});
groundBody.quaternion.setFromEuler(-Math.PI/2, 0, 0);
world.addBody(groundBody);

const sphereBody = new CANNON.Body({
  mass: 5,
  shape: new CANNON.Sphere(0.5),
  material: new CANNON.Material(),
  position: new CANNON.Vec3(0, 10, 0)
});
world.addBody(sphereBody);

const controls = new OrbitControls(camera, renderer.domElement)
const cannonDebugger = new CannonDebugger(scene, world);

camera.position.set(5, 5, 5); // circle orange

const animate = () => {
  
  requestAnimationFrame(animate);

  world.fixedStep();
  controls.update();
  cannonDebugger.update();
  renderer.render(scene, camera) // first renderer
}

animate()

