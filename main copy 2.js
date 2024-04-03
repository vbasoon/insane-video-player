import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

if ( WebGL.isWebGLAvailable() ) {

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	// camera.position.x = -1
	// camera.position.y = 0
	camera.position.z = 3;
	camera.position.y = 1; // приближує, віддаляє

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setPixelRatio(devicePixelRatio);
	document.body.appendChild( renderer.domElement );

	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshBasicMaterial({color: 'blue'});
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	const wireMaterial = new THREE.MeshBasicMaterial({
		color: "green",
		wireframe: true,
	});

	const wireMesh = new THREE.Mesh(geometry, wireMaterial)
	cube.add(wireMesh)

	function animate() {
		requestAnimationFrame( animate );
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		renderer.render( scene, camera );
	}
	animate();


} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}

