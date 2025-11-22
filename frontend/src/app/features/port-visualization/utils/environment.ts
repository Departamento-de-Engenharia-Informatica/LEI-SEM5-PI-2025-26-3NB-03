import * as THREE from 'three';

/**
 * Configura e adiciona céu e nevoeiro.
 * @param scene A cena Three.js.
 */
export function setupBackground(scene: THREE.Scene): void {
    // Céu
    const skyColor = 0x87CEEB;
    scene.background = new THREE.Color(skyColor);
    // Nevoeiro
    const near = 0.1;
    const far = 80;
    const fogColor = 0x97DEFB;
    scene.fog = new THREE.Fog(fogColor, near, far);
}

/**
 * Configura e adiciona o chão da cena. O porto no centro, água de um lado e terra do outro.
 * @param scene A cena Three.js.
 */
export function setupGround(scene: THREE.Scene): void {
    const groundRotation = -Math.PI / 2;

    // Porto
    const portColor = 0x555555;
    const portSize = 30;
    const portGeometry = new THREE.PlaneGeometry(portSize, portSize);
    const portMaterial = new THREE.MeshLambertMaterial({ color: portColor });
    const port = new THREE.Mesh(portGeometry, portMaterial);
    port.rotation.x = groundRotation;
    port.receiveShadow = true;
    scene.add(port);

    // Água
    const waterSize = 1000;
    const waterGeometry = new THREE.PlaneGeometry(waterSize, waterSize); 
    const waterMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x004477, 
        metalness: 0.5, 
        roughness: 0.5 
    }); 
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = groundRotation;
    water.position.z = portSize / 2 + waterSize / 2;
    water.position.y = -0.01;
    water.receiveShadow = true;
    scene.add(water);

    // Terra
    const landSize = 1000;
    const landGeometry = new THREE.PlaneGeometry(landSize, landSize);
    const landMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); 
    const land = new THREE.Mesh(landGeometry, landMaterial);
    land.rotation.x = groundRotation;
    land.position.z = -(-(portSize / 2) + landSize / 2);
    land.position.y = -0.01;
    land.receiveShadow = true;
    scene.add(land);
}
