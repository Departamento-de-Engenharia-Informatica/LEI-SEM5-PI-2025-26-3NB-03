import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { VesselDto } from '../../../core/models/vessel';
import { DockDto } from '../../../core/models/dock';

// Ajusta isto à tua escala
const SHIP_SCALE = 0.05/2.5;

// Cache: carregamos o modelo 1x e depois clonamos (bom para vários vessels)
let cachedShip: THREE.Object3D | null = null;
let loadingPromise: Promise<THREE.Object3D> | null = null;

function loadShipModel(): Promise<THREE.Object3D> {
  if (cachedShip) return Promise.resolve(cachedShip);
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve, reject) => {
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath('models/');
    mtlLoader.setResourcePath('models/textures/'); // tem de bater com as texturas referenciadas no .mtl

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

            // Ajustes comuns em OBJ
            object.scale.set(SHIP_SCALE, SHIP_SCALE, SHIP_SCALE);

            // muitos OBJ vêm “deitados”; ajusta se necessário:
            object.rotation.x = Math.PI/0.5 ;

            // evita ficar enterrado
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
    // como o teu DTO ainda não tem posição, damos opções:
    dock?: DockDto;
    position?: { x: number; z: number };
    orientationDeg?: number;
    clearance?: number;     // aproximação
    alongOffset?: number;   // deslocar ao longo do cais
    side?: 1 | -1;          // 👈 escolher lado
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

  // 1) Posição
  if (opts.position) {
    vesselGroup.position.set(opts.position.x, 0, opts.position.z);
  } else if (opts.dock) {
    const dock = opts.dock;

  // o teu dockGroup usa esta base:
  const dockCenter = new THREE.Vector3(
    dock.locationX,
    0,
    dock.locationZ + dock.length / 2
  );

  const theta = dock.locationOrientation * (Math.PI / 180);

  // eixo ao longo da dock (comprimento). No teu dock, o comprimento é o X local.
  const along = new THREE.Vector3(Math.cos(theta), 0, Math.sin(theta));

  // eixo perpendicular (profundidade). No teu dock, a profundidade é o Z local.
  const perp = new THREE.Vector3(-Math.sin(theta), 0, Math.cos(theta));

  // Quanto queres afastar/encostar (metros/unidades da tua cena)
  // menor = mais perto. Pode ser 0.2, 0.5, 1.0...
  const clearance = opts.clearance ?? 5;

  // Opcional: deslocar ao longo do cais (0 = meio do cais)
  const alongOffset = opts.alongOffset ?? 1;

  // Lado: +1 ou -1 (se ficar do lado errado, troca para -1)
  const side = opts.side ?? 1;

  // Distância para ficar mesmo ao lado do cais:
  // dock.depth/2 leva-te ao bordo do dock.
  const outward = (dock.depth / 2) + clearance;

  const vesselPos = dockCenter
    .clone()
    .add(along.clone().multiplyScalar(alongOffset))
    .add(perp.clone().multiplyScalar(outward * side));

  vesselGroup.position.copy(vesselPos);

  // Se quiseres que o navio acompanhe a orientação do cais:
  vesselGroup.rotation.y = theta;
  } else {
    vesselGroup.position.set(0, 0, 0);
  }

  // 2) Orientação (graus → rad)
  const orientationDeg =
    opts.orientationDeg ??
    opts.dock?.locationOrientation ??
    0;

  vesselGroup.rotation.y = orientationDeg * (Math.PI / 90);

  scene.add(vesselGroup);

  // 3) Modelo (clonar para permitir vários navios)
  const baseModel = await loadShipModel();
  const shipInstance = baseModel.clone(true);

  // Se quiseres garantir materiais independentes (para mudar cor por vessel), poderias clonar materiais aqui
  vesselGroup.add(shipInstance);

  return vesselGroup;
}

export function isVessel(object: THREE.Object3D): boolean {
  return !!(object.userData && (object.userData as any).type === 'Vessel');
}
