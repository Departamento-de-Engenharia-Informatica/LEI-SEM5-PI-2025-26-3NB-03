import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { firstValueFrom } from 'rxjs';
import { StorageAreaDto } from '../../core/models/storagearea';
import { DockDto } from '../../core/models/dock';
import { Api } from '../../core/services/api';
import { createWarehouse, createYard, isWarehouse, isYard } from './utils/storageareas';
import { createDock, isDock} from './utils/docks';
import { createVessel } from './utils/vessels';
import { createFixedCrane, isFixedCrane} from './utils/physicalresources';
import { setupBackground, setupGround, setupLighting } from './utils/environment';
import { FOV, setupControls, initialCamera, moveCamera } from './utils/controls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { PhysicalResourceDto } from '../../core/models/physicalresource';
import { VesselDto } from '../../core/models/vessel';
import { isVessel } from './utils/vessels';


@Component({
  selector: 'app-port-visualization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './port-visualization.html',
  styleUrl: './port-visualization.css',
})
export class PortVisualization implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer') private canvasContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private resizeObserver!: ResizeObserver;
  private animationId: number | null = null;

  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private mouse: THREE.Vector2 = new THREE.Vector2();
  private highlightedObject: THREE.Object3D | null = null;
  private composer!: EffectComposer;
  private outlinePass!: OutlinePass;

  // Variáveis para mostrar informações das docks e storage areas
selectedDock: DockDto | null = null;
selectedStorageArea: StorageAreaDto | null = null;
selectedVessel: VesselDto | null = null;
selectedPhysicalResource: PhysicalResourceDto | null = null;
infoVisible = false;
labelVisible = false;
labelText = '';
labelX = 0;
labelY = 0;

  private onClickHandler = this.onMouseClick.bind(this);
  private onResizeHandler = this.onWindowResize.bind(this);
  private onKeyDownHandler = this.onKeyDown.bind(this);



  constructor(private apiService: Api) { }

  ngAfterViewInit(): void {
    Promise.all([this.loadStorageAreas(), this.loadDocks(), this.loadVessels(), this.loadPhysicalResources()])
      .then(([storageAreas, docks, vessels, physicalResources]) => {
        this.initThree(storageAreas, docks, vessels, physicalResources);
        this.renderScene();

        this.renderer.domElement.addEventListener('click', this.onClickHandler);

        window.addEventListener('keydown', this.onKeyDownHandler);

        window.addEventListener('resize', this.onResizeHandler);
        this.setupResizeObserver();
      })
      .catch(error => {
        console.error('Erro ao carregar dados:', error);
      });
  }

  ngOnDestroy(): void {
    if (this.animationId !== null) cancelAnimationFrame(this.animationId);

    if (this.controls) {
      this.controls.dispose();
    }

    if (this.outlinePass) {
      (this.outlinePass as any).renderTargetMaskBuffer?.dispose();
      (this.outlinePass as any).renderTargetDepthBuffer?.dispose();
      (this.outlinePass as any).renderTargetEdgeBuffer1?.dispose();
      (this.outlinePass as any).renderTargetEdgeBuffer2?.dispose();
      (this.outlinePass as any).renderTargetBlurBuffer1?.dispose();
      (this.outlinePass as any).renderTargetBlurBuffer2?.dispose();
    }

    if (this.composer) {
      this.composer.renderTarget1.dispose();
      this.composer.renderTarget2.dispose();
    }

    this.renderer.forceContextLoss();

    if (this.scene) {
      this.scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
        if ((obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material;
          if (Array.isArray(mat)) {
            mat.forEach(m => m.dispose());
          } else {
            mat.dispose();
          }
        }
      });
    }

    if (this.renderer) {
      this.renderer.domElement.removeEventListener('click', this.onClickHandler);
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentElement) {
        this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
      }
    }

    window.removeEventListener('keydown', this.onKeyDownHandler);

    window.removeEventListener('resize', this.onResizeHandler);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private async loadStorageAreas(): Promise<StorageAreaDto[]> {
    try {
      const storageAreasObservable = this.apiService.getAll<StorageAreaDto>('StorageAreas');
      const storageAreas = await firstValueFrom(storageAreasObservable);
      return storageAreas || [];
    } catch (error) {
      console.error('Falha ao buscar Storage Areas:', error);
      return [];
    }
  }

  private async loadDocks(): Promise<DockDto[]> {
    try {
      const docksObservable = this.apiService.getAll<DockDto>('docks');
      const docks = await firstValueFrom(docksObservable);
      return docks || [];
    } catch (error) {
      console.error('Falha ao buscar Docks:', error);
      return [];
    }
  }

  private async loadPhysicalResources(): Promise<PhysicalResourceDto[]> {
    try {
      const physicalResourcesObservable = this.apiService.getAll<PhysicalResourceDto>('physicalResources');
      const physicalResources = await firstValueFrom(physicalResourcesObservable);
      return physicalResources || [];
    } catch (error) {
      console.error('Falha ao buscar Physical Resources:', error);
      return [];
    }
  }


  private async loadVessels(): Promise<VesselDto[]> {
    try {
      const vessels$ = this.apiService.getAll<VesselDto>('vessels');
      const vessels = await firstValueFrom(vessels$);
      return vessels || [];
    } catch (error) {
      console.error('Falha ao buscar Vessels:', error);
      return [];
    }
  }

  private setupResizeObserver(): void {
    const container = this.canvasContainer.nativeElement as HTMLElement;

    this.resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === container) {
          const width = entry.contentRect.width;
          const height = entry.contentRect.height;
          this.updateCanvasSize(width, height);
        }
      }
    });

    this.resizeObserver.observe(container);
  }

  private updateCanvasSize(width: number, height: number): void {
    if (!this.renderer || !this.camera || width === 0 || height === 0) {
      return;
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);

    this.renderScene(); 
  }

  private onWindowResize(): void {
    const container = this.canvasContainer.nativeElement as HTMLElement;
    this.updateCanvasSize(container.clientWidth, container.clientHeight);
  }

  private renderScene(): void {
    this.animationId = requestAnimationFrame(() => this.renderScene());

    if (this.controls) {
      this.controls.update();
    }
     // Atualiza posição da label se houver algo selecionado
    if (this.labelVisible && this.highlightedObject) {
      this.updateLabelPosition(this.highlightedObject);
    }
    this.composer.render();
  }

  private onMouseClick(event: MouseEvent): void {
    
    // Reset visual state on any click
    this.labelVisible = false;
    this.infoVisible = false;
    this.selectedDock = null;
    this.selectedVessel = null;
    this.selectedStorageArea = null;
    this.selectedPhysicalResource = null;
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.ray.origin.setFromMatrixPosition(this.camera.matrixWorld);
    this.raycaster.ray.direction.set(this.mouse.x, this.mouse.y, 1)
      .unproject(this.camera)
      .sub(this.camera.position)
      .normalize();

    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    this.outlinePass.selectedObjects = [];
    this.highlightedObject = null;

    if (intersects.length > 0) {
      const object = intersects[0].object;

      let group: THREE.Object3D | null = object;
      // sobe na hierarquia até encontrar um objeto com userData.type
    while (group && !(isWarehouse(group) || isYard(group) || isDock(group) || isFixedCrane(group) || isVessel(group))) {
    group = group.parent;
      }

      if (!group) return; // nada selecionável

      if (group && (isWarehouse(group) || isYard(group) || isDock(group) || isFixedCrane(group) || isVessel(group))) {
        if (isWarehouse(group)) {
           //Mostra sublinhado
          this.outlinePass.visibleEdgeColor.set('#FFA500');
          this.outlinePass.hiddenEdgeColor.set('#FFA500');
          
          // Mostra label
          this.labelText = group.userData['type'];
          this.labelVisible = true;

          // Armazena a storagearea selecionada
          this.selectedStorageArea = {
          id: group.userData['id'],
          type: group.userData['type'],
          locationX: group.userData['locationX'],
          locationZ: group.userData['locationZ'],
          locationOrientation: group.userData['locationOrientation'],
          maximumCapacity: group.userData['maximumCapacity'],
          currentOccupancy: group.userData['currentOccupancy'],
          docks: group.userData['docks']
          };
          this.infoVisible = false; // painel só aparece ao pressionar 'i'

        }
        else if (isYard(group)) {
          this.outlinePass.visibleEdgeColor.set('#7CE40D');
          this.outlinePass.hiddenEdgeColor.set('#7CE40D');
          // Mostra label
          this.labelText = group.userData['type'];
          this.labelVisible = true;

          // Armazena a storagearea selecionada
          this.selectedStorageArea = {
          id: group.userData['id'],
          type: group.userData['type'],
          locationX: group.userData['locationX'],
          locationZ: group.userData['locationZ'],
          locationOrientation: group.userData['locationOrientation'],
          maximumCapacity: group.userData['maximumCapacity'],
          currentOccupancy: group.userData['currentOccupancy'],
          docks: group.userData['docks']
          };
          this.infoVisible = false; // painel só aparece ao pressionar 'i'
  
        }
        else if (isDock(group)) {

          //Mostra sublinhado
          this.outlinePass.visibleEdgeColor.set('#159AD3');
          this.outlinePass.hiddenEdgeColor.set('#159AD3');

          // Mostra label
          this.labelText = group.userData['name'];
          this.labelVisible = true;

          // Armazena a dock selecionada
          this.selectedDock = {
          id: group.userData['id'],
          name: group.userData['name'],
          locationX: group.userData['locationX'],
          locationZ: group.userData['locationZ'],
          locationOrientation: group.userData['locationOrientation'],
          length: group.userData['length'],
          depth: group.userData['depth'],
          maxDraft: group.userData['maxDraft'],
          capacity: group.userData['capacity'],
          vesselTypeIds: group.userData['vesselTypeIds'],
          };
          this.infoVisible = false; // painel só aparece ao pressionar 'i'
        }
        else if (isVessel(group)) {
          this.outlinePass.visibleEdgeColor.set('#FF3B3B');
          this.outlinePass.hiddenEdgeColor.set('#FF3B3B');

          this.labelText = group.userData['name'];
          this.labelVisible = true;
          this.infoVisible = false;
          this.selectedVessel = {
            id: group.userData['id'],
            imoNumber: group.userData['imoNumber'],
            name: group.userData['name'],
            vesselType: group.userData['vesselType'],
            operator: group.userData['operator'],
          };
          this.infoVisible = false; // painel só aparece ao pressionar 'i'
        }
        else if (isFixedCrane(group)) {
          this.outlinePass.visibleEdgeColor.set('#3B06CA');
          this.outlinePass.hiddenEdgeColor.set('#3B06CA');

          const pr = group.userData['resource'] as PhysicalResourceDto | undefined;

          this.selectedPhysicalResource = pr ?? null;

          this.labelText = this.selectedPhysicalResource?.code ?? this.selectedPhysicalResource?.id ?? 'Fixed Crane';
          this.labelVisible = true;

          this.infoVisible = false; // painel só aparece ao pressionar 'i'
        }
        this.outlinePass.selectedObjects = [group];        
        this.highlightedObject = group;
        moveCamera(group, this.camera, this.controls, this.renderer, this.scene);
      }
    }
  
  }

  private updateLabelPosition(object: THREE.Object3D): void {
    const vector = new THREE.Vector3();
    object.getWorldPosition(vector);
    vector.project(this.camera);

    const container = this.canvasContainer.nativeElement as HTMLElement;
    const rect = container.getBoundingClientRect();

    this.labelX = ((vector.x + 1) / 2) * rect.width;
    this.labelY = ((-vector.y + 1) / 2) * rect.height;
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'r' || event.key === 'R') {
      initialCamera(this.camera, this.controls);

      this.outlinePass.selectedObjects = [];
      this.highlightedObject = null;
    }

    if ((event.key === 'i' || event.key === 'I') && (this.selectedDock || this.selectedStorageArea || this.selectedVessel || this.selectedPhysicalResource)) {
    this.infoVisible = !this.infoVisible; // alterna visibilidade do painel
  }
}

  private initThree(storageAreas: StorageAreaDto[], docks: DockDto[], vessels: VesselDto[], physicalResources: PhysicalResourceDto[]): void {
    const container = this.canvasContainer.nativeElement as HTMLElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.scene = new THREE.Scene();
    setupBackground(this.scene);
    setupGround(this.scene);
    setupLighting(this.scene);

    const warehouses = storageAreas.filter(storageArea => storageArea.type === 'Warehouse');
    warehouses.forEach((storageArea: StorageAreaDto) => createWarehouse(this.scene, storageArea));

    const yards = storageAreas.filter(storageArea => storageArea.type === 'Yard');
    yards.forEach((storageArea: StorageAreaDto) => createYard(this.scene, storageArea));

    docks.forEach((dock: DockDto) => createDock(this.scene, dock));

    // --- VESSELS ---
    vessels.forEach((v, idx) => {
      const dock = docks[idx % Math.max(docks.length, 1)];

      createVessel(this.scene, v, { dock, clearance: 1, side: 1, alongOffset: 0.5   })
        .catch(err => console.error('Erro a carregar Ship.obj/mtl:', err));
    });


    const fixedCranes = physicalResources.filter(physicalResource => physicalResource.type === 'Fixed Crane');
    fixedCranes.forEach((physicalResource: PhysicalResourceDto) => {
      const dock = docks.find(d => d.id === physicalResource.dock);
      if (!dock) {
        console.warn('Dock não encontrado para Fixed Crane ${physicalResource.id}');
        return;
      }
      createFixedCrane(this.scene, physicalResource, dock);
    });

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 1000);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    setupControls(this.controls);
    initialCamera(this.camera, this.controls);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.outlinePass = new OutlinePass(
      new THREE.Vector2(this.renderer.domElement.width, this.renderer.domElement.height),
      this.scene,
      this.camera
    );
    this.outlinePass.usePatternTexture = false;
    this.outlinePass.edgeStrength = 3.0;
    this.outlinePass.edgeGlow = 0.3;
    this.outlinePass.edgeThickness = 1.8;
    this.outlinePass.pulsePeriod = 0;
    this.outlinePass.visibleEdgeColor.set('#FFA500');
    this.outlinePass.hiddenEdgeColor.set('#FFA500');
    this.outlinePass.selectedObjects = [];
    this.composer.addPass(this.outlinePass);
    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.material.uniforms['resolution'].value.set(
      1 / this.renderer.domElement.width,
      1 / this.renderer.domElement.height
    );
    this.composer.addPass(fxaaPass);
    const outputPass = new OutputPass();
    this.composer.addPass(outputPass);
  }
}
