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
      
      
      const textureLoader = new THREE.TextureLoader();
      const dockTexture = textureLoader.load('textures/rock.jpg');


      const dockGeometry = new THREE.BoxGeometry(dockLength, dockHeight, dockDepth); 
      const dockMaterial = new THREE.MeshBasicMaterial({ map: dockTexture });
      const dock = new THREE.Mesh(dockGeometry, dockMaterial);
      dock.castShadow = true;
      dock.receiveShadow = true;
      
      dock.position.set(area.locationX, dockHeight / 2, area.locationZ);
      const graus = area.locationOrientation;
      dock.rotation.y = graus * (Math.PI / 180);


      const mtlLoader = new MTLLoader();
      mtlLoader.load('models/SurreyQuaysMooringFeature2_01.mtl', (materials) => {
      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);

      objLoader.load('models/SurreyQuaysMooringFeature2_01.obj', (object) => {
      // Ajustar escala e posição
      object.rotation.x = -Math.PI / 2; // roda 90° em torno do eixo X
      object.scale.set(0.05, 0.05, 0.05);
      object.position.set(-dockLength / 2 + 0.4, dockHeight / 2, 0); // em cima da dock
       dock.add(object);
        });
      });


      scene.add(dock);
    
}
