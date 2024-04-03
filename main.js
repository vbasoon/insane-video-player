import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import Stadium from './objects/Stadium';
import Football from './objects/Football';


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

// const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
// const sphereMaterial = new THREE.MeshBasicMaterial({
// 	color: 'orange',
// 	wireframe: true,
// });
// const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

// scene.add(sphereMesh);

const world = new CANNON.World({
	gravity: new CANNON.Vec3(0, -9.8, 0),

})




const gltfLoader = new GLTFLoader();


Stadium.create(scene, world, gltfLoader);
Football.create(scene, world, gltfLoader);

// gltfLoader.load('football/scene.gltf', (gltf) => {
// 	football = gltf.scene;
// 	const scale = 0.003;
// 	football.scale.set(scale, scale, scale);
// 	scene.add(gltf.scene);
// });

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 7);
scene.add(directionalLight);
directionalLight.position.set(0, 10, 0);

const controls = new OrbitControls(camera, renderer.domElement)

const cannonDebugger = new CannonDebugger(scene, world)

camera.position.set(5, 5, 5);
// camera.lookAt(0, 0, 0);

const animate = () => {
	// sphereMesh.rotation.x += 0.01;
	// sphereMesh.rotation.y += 0.01;
	Football.animate(camera);

	requestAnimationFrame(animate);

	world.fixedStep();
	controls.update();
	cannonDebugger.update();
	renderer.render(scene, camera);

}

animate();

window.onresize = () => {
	renderer.setSize(window.innerWidth, window.innerHeight)
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
}

