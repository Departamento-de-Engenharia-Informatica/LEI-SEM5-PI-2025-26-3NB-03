import * as THREE from 'three';
import { StorageAreaDto } from '../../../core/models/storagearea';

/**
 * Cria TEUs empilhados dentro de uma área retangular.
 * 
 * @param scene Cena Three.js
 * @param area DTO com currentOccupancy
 * @param usableWidth Largura disponível para os TEUs
 * @param usableDepth Profundidade disponível para os TEUs
 * @param baseX Posição X do centro da área
 * @param baseZ Posição Z do centro da área
 * @param baseY Altura da base onde os TEUs começam
 */
export function createTeusInArea(
  scene: THREE.Scene,
  area: StorageAreaDto,
  usableWidth: number,
  usableDepth: number,
  baseX: number,
  baseZ: number,
  baseY: number
): void {

  const teuW = 0.15;
  const teuH = 0.15;
  const teuD = 0.3;

  const rowGap = 0.15;
  const maxFloors = 3;
  let remaining = area.currentOccupancy;

  const cols = Math.floor(usableWidth / teuW);
  const rows = Math.floor(usableDepth / (teuD + rowGap));

  if (cols <= 0 || rows <= 0) return;

  const teusGroup = new THREE.Group();
  teusGroup.position.set(baseX, 0, baseZ);
  scene.add(teusGroup);

  for (let floor = 0; floor < maxFloors && remaining > 0; floor++) {
    for (let r = 0; r < rows && remaining > 0; r++) {
      for (let c = 0; c < cols && remaining > 0; c++) {
        const geometry = new THREE.BoxGeometry(teuW, teuH, teuD);
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

        const x = -usableWidth / 2 + (c + 0.5) * teuW;
        const y = + baseY + teuH / 2 + floor * teuH;
        const z = -usableDepth / 2 + r * (teuD + rowGap) + teuD / 2;

        teu.position.set(x, y, z);

        teusGroup.add(teu);
        remaining--;
      }
    }
  }
  teusGroup.rotation.y = (area.locationOrientation || 0) * (Math.PI / 180);
}