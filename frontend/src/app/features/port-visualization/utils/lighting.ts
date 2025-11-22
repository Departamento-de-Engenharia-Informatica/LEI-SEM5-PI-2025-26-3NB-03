import * as THREE from 'three';

/**
 * Configura e adiciona a iluminação à cena.
 * @param scene A cena Three.js onde a luz deve ser adicionada.
 */
export function setupLighting(scene: THREE.Scene): void {
    // Luz Solar
    const sunLight = new THREE.DirectionalLight(0xffffff, 3); 
    sunLight.position.set(10, 20, 10); 
    sunLight.target.position.set(0, 0, 0);
    scene.add(sunLight);
    sunLight.castShadow = true;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -20;
    sunLight.shadow.camera.near = 0.1;
    sunLight.shadow.camera.far = 50;

    // Luz Ambiente
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);
}
