import * as THREE from 'three';
import { StorageAreaDto } from '../../../core/models/storagearea';
import { createTeusInArea } from './teus';

/**
 * Cria e adiciona um Warehouse à cena.
 * @param scene A cena Three.js.
 * @param area Os dados da Storage Area.
 */
export function createWarehouse(scene: THREE.Scene, area: StorageAreaDto): void {
  const teuW = 0.15;
  const teuD = 0.3;
  const teuH = 0.15;
  const maxFloors = 3;

  const teusPerFloor = Math.ceil(area.maximumCapacity / maxFloors);
  const floorArea = teusPerFloor * (teuW * teuD);

  const internalWidth = Math.sqrt(floorArea * 2) + 1;
  const internalDepth = internalWidth / 2 + 1;
  const internalHeight = teuH * maxFloors;

  const wallThickness = 0.2;
  const wallHeight = internalHeight + 0.5;
  const floorHeight = 0.1;

  const extWidth = internalWidth + wallThickness * 2;
  const extDepth = internalDepth + wallThickness * 2;
  const extHeight = floorHeight + wallHeight;

  const warehouseGroup = new THREE.Group();
  warehouseGroup.position.set(area.locationX, 0, area.locationZ);
  warehouseGroup.rotation.y = area.locationOrientation * (Math.PI / 180);
  scene.add(warehouseGroup);

  const floorGeometry = new THREE.BoxGeometry(extWidth, floorHeight, extDepth);
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x808080,
    metalness: 0.2,
    roughness: 0.6
  });

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.set(0, floorHeight / 2, 0);
  floor.receiveShadow = true;
  warehouseGroup.add(floor);

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    metalness: 0.2,
    roughness: 0.6
  });

  const longWallGeo = new THREE.BoxGeometry(extWidth, wallHeight, wallThickness);

  const frontWall = new THREE.Mesh(longWallGeo, wallMaterial);
  frontWall.position.set(0, floorHeight + wallHeight/2, extDepth/2 - wallThickness/2);
  warehouseGroup.add(frontWall);

  const backWall = new THREE.Mesh(longWallGeo, wallMaterial);
  backWall.position.set(0, floorHeight + wallHeight/2, -extDepth/2 + wallThickness/2);
  warehouseGroup.add(backWall);

  const shortWallGeo = new THREE.BoxGeometry(wallThickness, wallHeight, extDepth);

  const leftWall = new THREE.Mesh(shortWallGeo, wallMaterial);
  leftWall.position.set(-extWidth/2 + wallThickness/2, floorHeight + wallHeight/2, 0);
  warehouseGroup.add(leftWall);

  const roofGeo = new THREE.BoxGeometry(extWidth, wallThickness, extDepth);
  const roofMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    metalness: 0.2,
    roughness: 0.6
  });
  const roof = new THREE.Mesh(roofGeo, roofMaterial);
  roof.position.set(0, floorHeight + wallHeight + wallThickness/2, 0);
  warehouseGroup.add(roof);

  createTeusInArea(
    scene,
    area,
    internalWidth - 1,
    internalDepth - 1,
    area.locationX,
    area.locationZ,
    floorHeight
  );
}

/**
 * Cria e adiciona um Yard à cena.
 * @param scene A cena Three.js.
 * @param area Os dados da Storage Area.
 */
export function createYard(scene: THREE.Scene, area: StorageAreaDto): void {
  const teuW = 0.15;
  const teuD = 0.3;
  const maxFloors = 3;
  const teusPerFloor = Math.ceil(area.maximumCapacity / maxFloors);
  const teuArea = teuW * teuD;
  const side = Math.sqrt(teusPerFloor * teuArea);

  const yardWidth = side + 1;
  const yardDepth = side + 1;
  const yardHeight = 0.1;

  const yardGeometry = new THREE.BoxGeometry(yardWidth, yardHeight, yardDepth);
  const yardMaterial = new THREE.MeshStandardMaterial({ color: 0x99AAB5 });
  const yard = new THREE.Mesh(yardGeometry, yardMaterial);

  yard.castShadow = true;
  yard.receiveShadow = true;

  yard.position.set(area.locationX, yardHeight / 2, area.locationZ);
  yard.rotation.y = area.locationOrientation * (Math.PI / 180);

  yard.userData = { id: area.id, type: area.type };
  scene.add(yard);

  const usableWidth = side;
  const usableDepth = side;
  const baseY = yardHeight;

  createTeusInArea(
    scene,
    area,
    usableWidth,
    usableDepth,
    area.locationX,
    area.locationZ,
    baseY
  );
}
