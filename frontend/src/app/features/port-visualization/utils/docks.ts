import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { DockDto } from '../../../core/models/dock';

/**
 * Cria e adiciona uma Dock à cena.
 * @param scene A cena Three.js.
 * @param dockData Os dados das Docks.
 */
export function createDock(scene: THREE.Scene, dockData: DockDto): void {
  const dockLength = dockData.length;
  const dockHeight = 0.3;
  const dockDepth = dockData.depth;
  
  // 1. Carregar textura da dock
  const textureLoader = new THREE.TextureLoader();
  const dockTexture = textureLoader.load('textures/rock.jpg');
  dockTexture.wrapS = dockTexture.wrapT = THREE.RepeatWrapping;
  dockTexture.repeat.set(dockLength / 2, dockDepth / 2);

  // 2. Criar geometria e material
  const dockGeometry = new THREE.BoxGeometry(dockLength, dockHeight, dockDepth);
  const dockMaterial = new THREE.MeshStandardMaterial({
    map: dockTexture,
    roughness: 1,
    metalness: 0.2
  });

  const dock = new THREE.Mesh(dockGeometry, dockMaterial);
  dock.castShadow = true;
  dock.receiveShadow = true;

  // 3. Posicionar dock na cena
  dock.position.set(dockData.locationX, dockHeight / 2, dockData.locationZ);
  dock.rotation.y = dockData.locationOrientation * (Math.PI / 180);

  // 4. Carregar materiais e objeto
  const mtlLoader = new MTLLoader();
  mtlLoader.setPath('models/');
  mtlLoader.setResourcePath('models/textures/');
  
  mtlLoader.load('SurreyQuaysMooringFeature2_01.mtl', (materials) => {
    materials.preload();
    
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('models/');
    
    objLoader.load('SurreyQuaysMooringFeature2_01.obj', (object) => {
      object.scale.set(0.05, 0.05, 0.05);
      object.rotation.x = -Math.PI / 2; 
      object.position.set(-dockLength / 2 + 0.4, dockHeight / 2, 0);

      dock.add(object);
    });
  });

  // 5. Adicionar dock à cena principal
  scene.add(dock);
}
