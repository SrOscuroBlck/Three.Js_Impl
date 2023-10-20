import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { GUI } from 'dat.gui';

let camera, scene, renderer;
let cube, controls, transformControls;
let gui, cubeSettings;

init();
animate();

function init() {
    // Creación del renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Creación de la cámara
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 40);

    // Creación de la escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaaaaa);

    // Creación del cubo
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0x44aa88 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Añadir luz a la escena
    const ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1, 10000);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // Controles para rotar/mover/zoom la cámara
    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // Controles de transformación para el cubo
    transformControls = new TransformControls(camera, renderer.domElement);
    transformControls.attach(cube);
    scene.add(transformControls);
    transformControls.addEventListener('dragging-changed', (event) => {
        controls.enabled = !event.value; // Desactiva OrbitControls mientras se manipula el cubo
    });

    // GUI
    gui = new GUI();
    cubeSettings = {
        translate: () => transformControls.setMode('translate'),
        rotate: () => transformControls.setMode('rotate'),
        scale: () => transformControls.setMode('scale')
    };
    gui.add(cubeSettings, 'translate');
    gui.add(cubeSettings, 'rotate');
    gui.add(cubeSettings, 'scale');

    // Redimensionar el canvas cuando se cambie el tamaño de la ventana
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
