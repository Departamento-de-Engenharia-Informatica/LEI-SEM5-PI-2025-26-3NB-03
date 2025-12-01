import * as THREE from 'three';
import { StorageAreaDto } from '../../../core/models/storagearea';

export const TEU_WIDTH = 0.15;
export const TEU_HEIGHT = 0.15;
export const TEU_DEPTH = 0.3;
export const MAX_FLOORS = 3;

/**
 * Cria TEUs empilhados dentro de uma área retangular.
 * 
 * @param scene Cena Three.js
 * @param storageArea DTO com Current Occupancy e Localização (X, Z e Orientação).
 * @param usableWidth Largura disponível para os TEUs
 * @param usableDepth Profundidade disponível para os TEUs
 * @param baseY Altura da base onde os TEUs começam
 */
export function createTeusInArea(
  scene: THREE.Scene,
  storageArea: StorageAreaDto,
  usableWidth: number,
  usableDepth: number,
  baseY: number
): void {
  const rowGap = 0.15;
  
  let remaining = storageArea.currentOccupancy;

  const cols = Math.floor(usableWidth / TEU_WIDTH);
  const rows = Math.floor(usableDepth / (TEU_DEPTH + rowGap));

  if (cols <= 0 || rows <= 0) return;

  const teusGroup = new THREE.Group();
  teusGroup.position.set(storageArea.locationX, 0, storageArea.locationZ);
  scene.add(teusGroup);

  for (let floor = 0; floor < MAX_FLOORS && remaining > 0; floor++) {
    for (let r = 0; r < rows && remaining > 0; r++) {
      for (let c = 0; c < cols && remaining > 0; c++) {
        const geometry = new THREE.BoxGeometry(TEU_WIDTH, TEU_HEIGHT, TEU_DEPTH);
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(
            0.05 + Math.random() * 0.25,
            0.05 + Math.random() * 0.25,
            0.05 + Math.random() * 0.25),
          metalness: 0.8,
          roughness: 0.3
        });

        const teu = new THREE.Mesh(geometry, material);
        teu.castShadow = true;
        teu.receiveShadow = true;

        const x = -usableWidth / 2 + (c + 0.5) * TEU_WIDTH;
        const y = baseY + TEU_HEIGHT / 2 + floor * TEU_HEIGHT;
        const z = -usableDepth / 2 + r * (TEU_DEPTH + rowGap) + TEU_DEPTH / 2;

        teu.position.set(x, y, z);

        teusGroup.add(teu);
        remaining--;
      }
    }
  }
  teusGroup.rotation.y = (storageArea.locationOrientation || 0) * (Math.PI / 180);
}
