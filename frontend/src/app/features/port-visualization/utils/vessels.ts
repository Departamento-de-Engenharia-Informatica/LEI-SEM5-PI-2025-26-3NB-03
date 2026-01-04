import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { VesselDto } from '../../../core/models/vessel';
import { DockDto } from '../../../core/models/dock';

const SHIP_SCALE = 0.05/2.5;

let cachedShip: THREE.Object3D | null = null;
let loadingPromise: Promise<THREE.Object3D> | null = null;

function loadShipModel(): Promise<THREE.Object3D> {
  if (cachedShip) return Promise.resolve(cachedShip);
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve, reject) => {
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath('models/');
    mtlLoader.setResourcePath('models/textures/');

    mtlLoader.load(
      'Ship.mtl',
      (materials) => {
        materials.preload();

        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('models/');

        objLoader.load(
          'Ship.obj',
          (object) => {
            object.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
              }
            });

            object.scale.set(SHIP_SCALE, SHIP_SCALE, SHIP_SCALE);
            object.rotation.x = Math.PI/0.5;
            object.position.y = 0.7;

            cachedShip = object;
            resolve(object);
          },
          undefined,
          (err) => reject(err)
        );
      },
      undefined,
      (err) => reject(err)
    );
  });

  return loadingPromise;
}

export async function createVessel(
  scene: THREE.Scene,
  vesselData: VesselDto,
  opts: {
    dock?: DockDto;
    position?: { x: number; z: number };
    orientationDeg?: number;
    clearance?: number;
    alongOffset?: number;
    side?: 1 | -1;
  } = {}
): Promise<THREE.Group> {
  const vesselGroup = new THREE.Group();

  vesselGroup.userData = {
    type: 'Vessel',
    id: vesselData.id,
    imoNumber: vesselData.imoNumber,
    name: vesselData.name,
    vesselType: vesselData.vesselType,
    operator: vesselData.operator,
  };

  if (opts.position) {
    vesselGroup.position.set(opts.position.x, 0, opts.position.z);
  } else if (opts.dock) {
    const dock = opts.dock;

    const dockCenter = new THREE.Vector3(
      dock.locationX,
      0,
      dock.locationZ + dock.length / 2
    );

    const theta = dock.locationOrientation * (Math.PI / 180);
    const along = new THREE.Vector3(Math.cos(theta), 0, Math.sin(theta));
    const perp = new THREE.Vector3(-Math.sin(theta), 0, Math.cos(theta));
    const clearance = opts.clearance ?? 5;
    const alongOffset = opts.alongOffset ?? 1;
    const side = opts.side ?? 1;
    const outward = (dock.depth / 2) + clearance;

    const vesselPos = dockCenter
      .clone()
      .add(along.clone().multiplyScalar(alongOffset))
      .add(perp.clone().multiplyScalar(outward * side));

    vesselGroup.position.copy(vesselPos);
    vesselGroup.rotation.y = theta;
  } else {
    vesselGroup.position.set(0, 0, 0);
  }

  const orientationDeg =
    opts.orientationDeg ??
    opts.dock?.locationOrientation ??
    0;

  vesselGroup.rotation.y = orientationDeg * (Math.PI / 90);

  scene.add(vesselGroup);

  const baseModel = await loadShipModel();
  const shipInstance = baseModel.clone(true);

  vesselGroup.add(shipInstance);

  return vesselGroup;
}

export function isVessel(object: THREE.Object3D): boolean {
  return !!(object.userData && (object.userData as any).type === 'Vessel');
}
