import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { firstValueFrom } from 'rxjs';
import { StorageAreaDto } from '../../core/models/storagearea';
import { DockDto } from '../../core/models/dock';
import { Api } from '../../core/services/api';
import { createWarehouse, createYard } from './utils/storageareas';
import { createDock} from './utils/docks';
import { setupLighting } from './utils/lighting';
import { setupBackground, setupGround } from './utils/environment';

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
  private highlightedType: string | null = null;
  private highlightedID: string | null = null;

  constructor(private apiService: Api) { }

  ngAfterViewInit(): void {
    Promise.all([this.loadStorageAreas(), this.loadDocks()])
      .then(([storageAreas, docks]) => {
        this.initThree(storageAreas, docks);
        this.renderScene();

        window.addEventListener('click', this.onMouseClick.bind(this));

        window.addEventListener('resize', this.onWindowResize.bind(this));
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
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentElement) {
        this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
      }
    }

    window.removeEventListener('resize', this.onWindowResize.bind(this));
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
    this.renderer.render(this.scene, this.camera);
  }

  private onMouseClick(event: MouseEvent): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.ray.origin.setFromMatrixPosition(this.camera.matrixWorld);
    this.raycaster.ray.direction.set(this.mouse.x, this.mouse.y, 1)
      .unproject(this.camera)
      .sub(this.camera.position)
      .normalize();

    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    if (intersects.length > 0) {
      const object = intersects[0].object;

      let group: THREE.Object3D | null = object;
      if (object instanceof THREE.Mesh) {
        group = object.parent;
      }
      if (group && group.userData) {
        if ((group.userData as any).type === 'Warehouse') {
          this.highlightedType = "Warehouse";
          this.highlightedID = group.userData['id'];
          this.moveCamera(group);
        }
        else if ((group.userData as any).type === 'Yard') {
          this.highlightedType = "Yard";
          this.highlightedID = group.userData['id'];
          this.moveCamera(group);
        }
        else if ((group.userData as any).type === 'Dock') {
          this.highlightedType = "Dock";
          this.highlightedID = group.userData['id'];
          this.moveCamera(group);
        }
      }
    }
  }

  private moveCamera(object: THREE.Object3D): void {
    const targetX = object.userData['locationX'];
    const targetZ = object.userData['locationZ'];

    const cameraDirection = new THREE.Vector3().subVectors(this.camera.position, this.controls.target);

    this.camera.position.copy(new THREE.Vector3(
      targetX + cameraDirection.x,
      this.camera.position.y,
      targetZ + cameraDirection.z
    ));

    this.controls.target.set(targetX, 0, targetZ);
    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }

  private initThree(storageAreas: StorageAreaDto[], docks: DockDto[]): void {
    const container = this.canvasContainer.nativeElement as HTMLElement;

    const width = container.clientWidth;
    const height = container.clientHeight;

    this.scene = new THREE.Scene();

    setupBackground(this.scene);

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(20, 10, 20);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    setupGround(this.scene);

    const warehouses = storageAreas.filter(area => area.type === 'Warehouse');
    warehouses.forEach((area: StorageAreaDto) => createWarehouse(this.scene, area));

    const yards = storageAreas.filter(area => area.type === 'Yard');
    yards.forEach((area: StorageAreaDto) => createYard(this.scene, area));

    docks.forEach((area: DockDto) => createDock(this.scene, area));

    setupLighting(this.scene);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE
    };
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 30;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.1;
    this.controls.update();
  }
}
