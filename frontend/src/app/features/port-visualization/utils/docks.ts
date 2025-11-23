import * as THREE from 'three';
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
      const dockMaterial = new THREE.MeshStandardMaterial({ map: dockTexture });
      const dock = new THREE.Mesh(dockGeometry, dockMaterial);
      dock.castShadow = true;
      dock.receiveShadow = true;
      
      dock.position.set(area.locationX, dockHeight / 2, area.locationZ);
      const graus = area.locationOrientation;
      dock.rotation.y = graus * (Math.PI / 180);

      const edges = new THREE.EdgesGeometry(dockGeometry);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
      dock.add(line);

      scene.add(dock);
    
}
