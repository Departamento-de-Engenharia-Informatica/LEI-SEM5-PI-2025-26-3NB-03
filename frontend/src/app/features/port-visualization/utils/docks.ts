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

      const textureLoader = new THREE.TextureLoader();
      const dockTexture = textureLoader.load('textures/rock.jpg');

      const dockGeometry = new THREE.BoxGeometry(dockLength, dockHeight, dockDepth); 
      const dockMaterial = new THREE.MeshBasicMaterial({ map: dockTexture });
      const dock = new THREE.Mesh(dockGeometry, dockMaterial);
      dock.castShadow = true;
      dock.receiveShadow = true;
      
      dock.position.set(dockData.locationX, dockHeight / 2, dockData.locationZ);
      const graus = dockData.locationOrientation;
      dock.rotation.y = graus * (Math.PI / 180);

      const mtlLoader = new MTLLoader();
      mtlLoader.load('models/SurreyQuaysMooringFeature2_01.mtl', (materials) => {
            materials.preload();

            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.load('models/SurreyQuaysMooringFeature2_01.obj', (object) => {
                  object.rotation.x = -Math.PI / 2;
                  object.scale.set(0.05, 0.05, 0.05);
                  object.position.set(-dockLength / 2 + 0.4, dockHeight / 2, 0);
                        dock.add(object);
            });
      });

      scene.add(dock);
}
