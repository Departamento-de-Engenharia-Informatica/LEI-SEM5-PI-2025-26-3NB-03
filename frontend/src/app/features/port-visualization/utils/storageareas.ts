import * as THREE from 'three';
import { StorageAreaDTO } from '../../../core/models/storagearea';

/**
 * Cria e adiciona um Warehouse à cena.
 * @param scene A cena Three.js.
 * @param area Os dados da Storage Area.
 */
export function createWarehouse(scene: THREE.Scene, area: StorageAreaDTO): void {
  const warehouseWidth = 6; 
  const warehouseHeight = 2;
  const warehouseDepth = 3;

  const warehouseGeometry = new THREE.BoxGeometry(warehouseWidth, warehouseHeight, warehouseDepth); 
  const warehouseMaterial = new THREE.MeshStandardMaterial({ color: 0x758090 });
  const warehouse = new THREE.Mesh(warehouseGeometry, warehouseMaterial);

  warehouse.castShadow = true;
  warehouse.receiveShadow = true;

  warehouse.position.set(
    area.locationX,
    warehouseHeight / 2,
    area.locationZ);
  warehouse.rotation.y = area.locationOrientation * (Math.PI / 180);

  warehouse.userData = { id: area.id, type: area.type }; 

  scene.add(warehouse);
}

/**
 * Cria e adiciona um Yard à cena.
 * @param scene A cena Three.js.
 * @param area Os dados da Storage Area.
 */
export function createYard(scene: THREE.Scene, area: StorageAreaDTO): void {
  const yardWidth = 8; 
  const yardHeight = 0.1;
  const yardDepth = 8;

  const yardGeometry = new THREE.BoxGeometry(yardWidth, yardHeight, yardDepth); 
  const yardMaterial = new THREE.MeshStandardMaterial({ color: 0x99AAB5 });
  const yard = new THREE.Mesh(yardGeometry, yardMaterial);

  yard.castShadow = true;
  yard.receiveShadow = true;

  yard.position.set(
    area.locationX,
    yardHeight / 2,
    area.locationZ);
  yard.rotation.y = area.locationOrientation * (Math.PI / 180);

  yard.userData = { id: area.id, type: area.type }; 
  
  scene.add(yard);
}
