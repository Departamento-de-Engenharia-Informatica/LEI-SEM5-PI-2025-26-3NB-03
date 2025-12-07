import * as THREE from 'three';
import { StorageAreaDto } from '../../../core/models/storagearea';
import { createTeusInArea, TEU_WIDTH, TEU_HEIGHT, TEU_DEPTH, MAX_FLOORS } from './teus';
import { RectAreaLight } from 'three';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

/**
 * Cria e adiciona um Warehouse à cena.
 * @param scene A cena Three.js.
 * @param storageArea Os dados da Storage Area.
 */
export function createWarehouse(scene: THREE.Scene, storageArea: StorageAreaDto): void {
  const teusPerFloor = Math.ceil(storageArea.maximumCapacity / MAX_FLOORS);

  const internalWidth = Math.sqrt(teusPerFloor * TEU_WIDTH * TEU_DEPTH * 2) + 1;
  const internalDepth = internalWidth / 2 + 1;
  const internalHeight = TEU_HEIGHT * MAX_FLOORS;

  const wallThickness = 0.2;
  const wallHeight = internalHeight + 0.5;
  const floorHeight = 0.1;

  const extWidth = internalWidth + wallThickness * 2;
  const extDepth = internalDepth + wallThickness * 2;

  const warehouseGroup = new THREE.Group();
  warehouseGroup.userData = {
    type: storageArea.type,
    id: storageArea.id,
    locationX: storageArea.locationX,
    locationZ: storageArea.locationZ,
  };
  warehouseGroup.position.set(storageArea.locationX, 0, storageArea.locationZ);
  warehouseGroup.rotation.y = storageArea.locationOrientation * (Math.PI / 180);
  scene.add(warehouseGroup);

  const floorGeometry = new THREE.BoxGeometry(extWidth, floorHeight, extDepth);
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x808080,
    metalness: 0.2,
    roughness: 0.6
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.set(0, floorHeight / 2, 0);
  floor.castShadow = true;
  floor.receiveShadow = true;
  warehouseGroup.add(floor);

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    metalness: 0.2,
    roughness: 0.6
  });

  const longWallGeometry = new THREE.BoxGeometry(extWidth, wallHeight, wallThickness);

  const frontWall = new THREE.Mesh(longWallGeometry, wallMaterial);
  frontWall.position.set(0, floorHeight + wallHeight / 2, extDepth / 2 - wallThickness / 2);
  frontWall.castShadow = true;
  frontWall.receiveShadow = true;
  warehouseGroup.add(frontWall);

  const backWall = new THREE.Mesh(longWallGeometry, wallMaterial);
  backWall.position.set(0, floorHeight + wallHeight / 2, - extDepth / 2 + wallThickness / 2);
  backWall.castShadow = true;
  backWall.receiveShadow = true;
  warehouseGroup.add(backWall);

  const shortWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, extDepth);
  const leftWall = new THREE.Mesh(shortWallGeometry, wallMaterial);
  leftWall.position.set(- extWidth / 2 + wallThickness / 2, floorHeight + wallHeight / 2, 0);
  leftWall.castShadow = true;
  leftWall.receiveShadow = true;
  warehouseGroup.add(leftWall);

  const roofGeometry = new THREE.BoxGeometry(extWidth, wallThickness, extDepth);
  const roofMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    metalness: 0.2,
    roughness: 0.6
  });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.set(0, floorHeight + wallHeight + wallThickness / 2, 0);
  roof.castShadow = true;
  roof.receiveShadow = true;
  warehouseGroup.add(roof);

  RectAreaLightUniformsLib.init();
  const lightWidth = internalWidth * 0.1;
  const lightHeight = internalDepth * 0.1;
  const panelY = floorHeight + wallHeight - 0.01;
  const areaLight = new RectAreaLight(0xffffff, 6, lightWidth, lightHeight);
  areaLight.position.set(0, panelY, 0);
  areaLight.rotation.x = -Math.PI / 2;
  warehouseGroup.add(areaLight);
  const panelGeometry = new THREE.PlaneGeometry(lightWidth, lightHeight);
  const panelMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 2,
    roughness: 0.2,
    metalness: 0.0,
    side: THREE.FrontSide
  });
  const panelMesh = new THREE.Mesh(panelGeometry, panelMaterial);
  panelMesh.rotation.x = Math.PI / 2;
  panelMesh.position.set(0, panelY, 0);
  warehouseGroup.add(panelMesh);

  createTeusInArea(
    scene,
    storageArea,
    internalWidth - 1,
    internalDepth - 1,
    floorHeight
  );
}

/**
 * Cria e adiciona um Yard à cena.
 * @param scene A cena Three.js.
 * @param storageArea Os dados da Storage Area.
 */
export function createYard(scene: THREE.Scene, storageArea: StorageAreaDto): void {
  const teusPerFloor = Math.ceil(storageArea.maximumCapacity / MAX_FLOORS);

  const yardWidth = Math.sqrt(teusPerFloor * TEU_WIDTH * TEU_DEPTH) + 1;
  const yardDepth = yardWidth;
  const yardHeight = 0.1;

  const yardGroup = new THREE.Group();
  yardGroup.userData = {
    type: storageArea.type,
    id: storageArea.id,
    locationX: storageArea.locationX,
    locationZ: storageArea.locationZ,
  };
  yardGroup.position.set(storageArea.locationX, 0, storageArea.locationZ);
  yardGroup.rotation.y = storageArea.locationOrientation * (Math.PI / 180);
  scene.add(yardGroup);

  const yardGeometry = new THREE.BoxGeometry(yardWidth, yardHeight, yardDepth);
  const yardMaterial = new THREE.MeshStandardMaterial({ color: 0x899AA5 });
  const yard = new THREE.Mesh(yardGeometry, yardMaterial);

  yard.castShadow = true;
  yard.receiveShadow = true;

  yard.position.set(0, yardHeight / 2, 0);
  yardGroup.add(yard);

  createTeusInArea(
    scene,
    storageArea,
    yardWidth - 1,
    yardDepth - 1,
    yardHeight
  );
}
