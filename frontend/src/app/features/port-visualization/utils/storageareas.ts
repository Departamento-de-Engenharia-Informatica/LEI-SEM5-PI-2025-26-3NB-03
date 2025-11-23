import * as THREE from 'three';
import { StorageAreaDto } from '../../../core/models/storagearea';
import { createTeusInArea } from './teus';
import { RectAreaLight } from 'three';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

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
  floor.castShadow = true;
  floor.receiveShadow = true;
  warehouseGroup.add(floor);

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    metalness: 0.2,
    roughness: 0.6
  });

  const longWallGeo = new THREE.BoxGeometry(extWidth, wallHeight, wallThickness);

  const frontWall = new THREE.Mesh(longWallGeo, wallMaterial);
  frontWall.position.set(0, floorHeight + wallHeight / 2, extDepth / 2 - wallThickness / 2);
  frontWall.castShadow = true;
  frontWall.receiveShadow = true;
  warehouseGroup.add(frontWall);

  const backWall = new THREE.Mesh(longWallGeo, wallMaterial);
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
    side: THREE.DoubleSide
  });
  const panelMesh = new THREE.Mesh(panelGeometry, panelMaterial);
  panelMesh.rotation.x = -Math.PI / 2;
  panelMesh.position.set(0, panelY, 0);
  warehouseGroup.add(panelMesh);

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
  const yardMaterial = new THREE.MeshStandardMaterial({ color: 0x899AA5 });
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
