import * as THREE from 'three';

// --- Three.js Scene, Camera, Renderer ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// --- Starfield Variables ---
const starCount = 1000;
const starSpeed = 0.035;

const starsGeometry = new THREE.BufferGeometry();
const positions = [];
const velocities = [];

for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    const z = (Math.random() - 0.5) * 200;

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

        if (positions[i] > 100 || positions[i] < -100) positions[i] = (Math.random() - 0.5) * 200;
        if (positions[i + 1] > 100 || positions[i + 1] < -100) positions[i + 1] = (Math.random() - 0.5) * 200;
        if (positions[i + 2] > 100 || positions[i + 2] < -100) positions[i + 2] = (Math.random() - 0.5) * 200;
    }

    starField.geometry.attributes.position.needsUpdate = true;
}

// --- Handle Cursor Movement and Glow Effect ---
// const glowText = document.getElementById('glowText');

// document.addEventListener('mousemove', (e) => {
//     const mouseX = (e.clientX / window.innerWidth) * 2 - 1; // Normalize X
//     const mouseY = -(e.clientY / window.innerHeight) * 2 + 1; // Normalize Y

//     const glowX = Math.floor(mouseX * 20);
//     const glowY = -Math.floor(mouseY * 20);

//     glowText.style.textShadow = `
//         ${glowX}px ${glowY}px 20px #b0c4de,
//         ${glowX * 1}px ${glowY * 1}px 40px #87CEFA,
//         ${glowX * 1.2}px ${glowY * 1.2}px 60px #6495ED
//     `;
// });

// --- Animation Loop ---
function animate() {
    requestAnimationFrame(animate);
    animateStars();
    renderer.render(scene, camera);
}

animate();

// --- Resize Event ---
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
