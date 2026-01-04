import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { DockDto } from '../../../core/models/dock';

export const DOCK_HEIGHT = 0.3;

/**
 * Cria e adiciona uma Dock à cena.
 * @param scene A cena Three.js.
 * @param dockData Os dados das Docks.
 */
export function createDock(scene: THREE.Scene, dockData: DockDto): void {
  const dockLength = dockData.length;
  const dockDepth = dockData.depth;

  const textureLoader = new THREE.TextureLoader();
  const dockTexture = textureLoader.load('textures/rock.jpg');
  dockTexture.wrapS = dockTexture.wrapT = THREE.RepeatWrapping;
  dockTexture.repeat.set(dockLength / 2, dockDepth / 2);

  const dockGroup = new THREE.Group();
  dockGroup.userData = {
    type: "Dock",
    id: dockData.id,
    name: dockData.name,
    locationX: dockData.locationX,
    locationZ: dockData.locationZ,
    locationOrientation: dockData.locationOrientation,
    length: dockData.length,
    depth: dockData.depth,
    maxDraft: dockData.maxDraft,
    capacity: dockData.capacity,
    vesselTypeIds: dockData.vesselTypeIds,
  };
  
  dockGroup.position.set(dockData.locationX, 0, dockData.locationZ+dockLength/2);
  dockGroup.rotation.y = dockData.locationOrientation * (Math.PI / 180);
  scene.add(dockGroup);

  const dockGeometry = new THREE.BoxGeometry(dockLength, DOCK_HEIGHT, dockDepth);
  const dockMaterial = new THREE.MeshStandardMaterial({
    map: dockTexture,
    roughness: 1,
    metalness: 0.2
  });

  const dock = new THREE.Mesh(dockGeometry, dockMaterial);
  dock.castShadow = true;
  dock.receiveShadow = true;

  dock.position.set(0, DOCK_HEIGHT / 2, 0);
  dockGroup.add(dock);

  const mtlLoader = new MTLLoader();
  mtlLoader.setPath('models/');
  mtlLoader.setResourcePath('models/textures/');
  mtlLoader.load('SurreyQuaysMooringFeature2_01_decimated.mtl', (materials) => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('models/');
    objLoader.load('SurreyQuaysMooringFeature2_01_decimated.obj', (object) => {
      object.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).scale.set(0.05, 0.05, 0.05);
          (child as THREE.Mesh).rotation.x = -Math.PI / 2;
          (child as THREE.Mesh).position.set(-dockLength / 2 + 0.4, DOCK_HEIGHT - 0.022, 0);
          (child as THREE.Mesh).castShadow = true;
          (child as THREE.Mesh).receiveShadow = true;
          dockGroup.add((child as THREE.Mesh));
        }
      });
    });
  });
}

/**
 * Verifica se um objeto é uma doca.
 * @param object O objeto a verificar.
 */
export function isDock(object: THREE.Object3D): boolean {
  if (object.userData && (object.userData as any).type === 'Dock')
    return true;

  return false;
}
