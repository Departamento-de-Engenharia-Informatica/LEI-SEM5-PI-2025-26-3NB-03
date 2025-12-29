import * as THREE from 'three';
import { PhysicalResourceDto } from '../../../core/models/physicalresource';
import { DockDto } from '../../../core/models/dock';
import { DOCK_HEIGHT } from './docks';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

/**
 * Cria e adiciona uma grua fixa à cena.
 * @param scene A cena Three.js.
 * @param storageArea Os dados do recurso físico.
 */
export function createFixedCrane(scene: THREE.Scene, physicalResource: PhysicalResourceDto, dock: DockDto): void {
  const fixedCraneGroup = new THREE.Group();
  fixedCraneGroup.userData = {
    type: physicalResource.type,
    id: physicalResource.id,
    locationX: dock.locationX,
    locationZ: dock.locationZ,
  };
  fixedCraneGroup.position.set(dock.locationX, 0, dock.locationZ);
  fixedCraneGroup.rotation.y = dock.locationOrientation * (Math.PI / 180);
  scene.add(fixedCraneGroup);

  const mtlLoader = new MTLLoader();
  mtlLoader.setPath('models/');
  mtlLoader.setResourcePath('models/textures/');
  mtlLoader.load('Takraf_Crane.mtl', (materials) => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('models/');
    objLoader.load('Takraf_Crane.obj', (object) => {
      object.traverse((child) => {
        child.scale.set(0.06, 0.06, 0.06);
        child.position.set(0, DOCK_HEIGHT, 0);
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).castShadow = true;
          (child as THREE.Mesh).receiveShadow = true;
        }
        fixedCraneGroup.add(child);
      });
    });
    fixedCraneGroup.rotation.y = -Math.PI / 2;
  });
}

/**
 * Verifica se um objeto é uma grua fixa.
 * @param object O objeto a verificar.
 */
export function isFixedCrane(object: THREE.Object3D): boolean {
  if (object.userData && (object.userData as any).type === 'Fixed Crane')
    return true;

  return false;
}
