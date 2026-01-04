import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const FOV = 60;

/**
 * Configura os controlos.
 * @param controls Os controlos.
 */
export function setupControls(controls: OrbitControls): void {
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE
    };
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 30;
    controls.maxPolarAngle = Math.PI / 2 - 0.1;
    controls.update();
}

/**
 * Configura a câmara com os parâmetros iniciais.
 * @param camera A câmara.
 */
export function initialCamera(camera: THREE.PerspectiveCamera, controls: OrbitControls): void {
    camera.position.set(20, 10, 20);
    controls.target.set(0, 0, 0);
    controls.update();
}

/**
 * Move horizontalmente e aponta a câmara para o objeto.
 * @param object O objeto para o qual a câmara se irá mover e apontar.
 * @param camera A câmara.
 * @param controls Os controlos.
 * @param renderer O renderizador.
 * @param scene A cena.
 */
export function moveCamera(
    object: THREE.Object3D, 
    camera: THREE.PerspectiveCamera, 
    controls: OrbitControls, 
    renderer: THREE.WebGLRenderer, 
    scene: THREE.Scene
): void {
    let targetX = object.userData['locationX'];
    let targetZ = object.userData['locationZ'];

    // 2) se não existirem (caso do Vessel/OBJ), usa world position
    if (!Number.isFinite(targetX) || !Number.isFinite(targetZ)) {
    const worldPos = new THREE.Vector3();
    object.getWorldPosition(worldPos);
    targetX = worldPos.x;
    targetZ = worldPos.z;
    }

    const cameraDirection = new THREE.Vector3().subVectors(camera.position, controls.target);

    camera.position.copy(new THREE.Vector3(
        targetX + cameraDirection.x,
        camera.position.y,
        targetZ + cameraDirection.z
    ));

    controls.target.set(targetX, 0, targetZ);
    controls.update();

    renderer.render(scene, camera);
}
