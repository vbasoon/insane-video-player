import * as THREE from 'three'

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

const sphereGeometry = new THREE.SphereGeometry(1, 60, 60);
const sphereMaterial = new THREE.MeshBasicMaterial({color: 'orange', wireframe: true});
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

scene.add(sphereMesh);

camera.position.set(0, 0, 5); // circle orange

const animate = () => {
  sphereMesh.rotation.x +=0.01; // rotation
  sphereMesh.rotation.y +=0.01; // rotation

  requestAnimationFrame(animate);
  renderer.render(scene, camera) // first renderer
}

animate()

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'