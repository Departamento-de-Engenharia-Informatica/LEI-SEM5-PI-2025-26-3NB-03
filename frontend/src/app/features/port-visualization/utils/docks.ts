import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { DockDto } from '../../../core/models/dock';

/**
 * Cria e adiciona uma Dock à cena.
 * @param scene A cena Three.js.
 * @param area Os dados das Docks.
 */


export function createDock(scene: THREE.Scene, area: DockDto): void {
  
  const dockLength = area.length;
  const dockHeight = 0.3;
  const dockDepth = area.depth;
  
  // Carregar textura da dock
  const textureLoader = new THREE.TextureLoader();
  const dockTexture = textureLoader.load('textures/rock.jpg');
  dockTexture.wrapS = dockTexture.wrapT = THREE.RepeatWrapping;
  dockTexture.repeat.set(dockLength / 2, dockDepth / 2);

  // 2. Criar geometria e material PBR
  const dockGeometry = new THREE.BoxGeometry(dockLength, dockHeight, dockDepth);
  const dockMaterial = new THREE.MeshStandardMaterial({
    map: dockTexture,
    roughness: 1,
    metalness: 0.2
  });

  const dock = new THREE.Mesh(dockGeometry, dockMaterial);
  dock.castShadow = true;
  dock.receiveShadow = true;

  // 3. Posicionar dock na cena (Global)
  dock.position.set(area.locationX, dockHeight / 2, area.locationZ);
  dock.rotation.y = area.locationOrientation * (Math.PI / 180);

  // 4. Carregar materiais e objeto (Mooring Feature)
  const mtlLoader = new MTLLoader();
  mtlLoader.setPath('models/');
  mtlLoader.setResourcePath('models/textures/'); // pasta das imagens referenciadas no .mtl
  
  mtlLoader.load('SurreyQuaysMooringFeature2_01.mtl', (materials) => {
      materials.preload();
    
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      materials.preload();
      objLoader.setMaterials(materials);
    objLoader.setPath('models/');
    
    objLoader.load('SurreyQuaysMooringFeature2_01.obj', (object) => {
      // Ajustar escala
      object.scale.set(0.05, 0.05, 0.05);
      
      // Ajustar rotação do objeto
      object.rotation.x = -Math.PI / 2; 

      // Posicionar objeto em cima da dock (Relativo ao centro da dock)
      object.position.set(-dockLength / 2 + 0.4, dockHeight / 2, 0);
      
      // Adicionar o objeto carregado como filho da dock
      dock.add(object);
    });
  });

  // 5. Adicionar dock à cena principal
  scene.add(dock);
}