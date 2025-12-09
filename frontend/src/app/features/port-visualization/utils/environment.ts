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
    const near = 10;
    const far = 200;
    const fogColor = 0xCFEFFF;
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

/**
 * Configura e adiciona a iluminação à cena.
 * @param scene A cena Three.js onde a luz deve ser adicionada.
 */
export function setupLighting(scene: THREE.Scene): void {
    // Luz Solar
    const sunLight = new THREE.DirectionalLight(0xffffff, 3); 
    sunLight.position.set(10, 15, 10); 
    sunLight.target.position.set(0, 0, 0);
    scene.add(sunLight);
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.castShadow = true;
    sunLight.shadow.camera.left = -22;
    sunLight.shadow.camera.right = 22;
    sunLight.shadow.camera.top = 16;
    sunLight.shadow.camera.bottom = -16;
    sunLight.shadow.camera.near = 0.1;
    sunLight.shadow.camera.far = 50;

    // Luz Ambiente
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
}
