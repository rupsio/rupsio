import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

// --- Three.js Scene, Camera, Renderer ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// --- Postprocessing Setup ---
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, // Bloom strength
    0.4, // Bloom radius
    0.85 // Bloom threshold
);
composer.addPass(bloomPass);

// --- Starfield Variables ---
const starCount = 1000;
const starSpeed = 0.035;

const starsGeometry = new THREE.BufferGeometry();
const positions = [];
const velocities = [];

for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 100; // Reduced space
    const y = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 100;

    positions.push(x, y, z);

    const vx = (Math.random() - 0.5) * starSpeed;
    const vy = (Math.random() - 0.5) * starSpeed;
    const vz = (Math.random() - 0.5) * starSpeed;

    velocities.push(vx, vy, vz);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.2,
    transparent: true,
});

const starField = new THREE.Points(starsGeometry, starMaterial);
scene.add(starField);

camera.position.z = 50;


// --- Animate the Starfield ---
function animateStars() {
    const positions = starField.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i / 3 * 3]; // X
        positions[i + 1] += velocities[i / 3 * 3 + 1]; // Y
        positions[i + 2] += velocities[i / 3 * 3 + 2]; // Z

        if (positions[i] > 50 || positions[i] < -50) positions[i] = (Math.random() - 0.5) * 100;
        if (positions[i + 1] > 50 || positions[i + 1] < -50) positions[i + 1] = (Math.random() - 0.5) * 100;
        if (positions[i + 2] > 50 || positions[i + 2] < -50) positions[i + 2] = (Math.random() - 0.5) * 100;
    }

    starField.geometry.attributes.position.needsUpdate = true;
}

// --- Animation Loop ---
function animate() {
    requestAnimationFrame(animate);
    animateStars();
    composer.render(); // Use composer for rendering with post-processing
}

animate();

// --- Resize Event ---
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    composer.setSize(window.innerWidth, window.innerHeight); // Update composer size
});
