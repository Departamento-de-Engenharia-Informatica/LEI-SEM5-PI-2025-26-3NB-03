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

  constructor(private apiService: Api) { }

  ngAfterViewInit(): void {
  Promise.all([this.loadStorageAreas(), this.loadDocks()])
    .then(([areas, docks]) => {
      this.initThree(areas, docks);
      this.renderScene();

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

    /*if (this.renderer) {
      this.renderer.dispose();
    }*/
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
      const areasObservable = this.apiService.getAll<StorageAreaDto>('StorageAreas');
      const areas = await firstValueFrom(areasObservable);
      return areas || [];
    } catch (error) {
      console.error('Falha ao buscar Storage Areas:', error);
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

  private initThree(storageAreas: StorageAreaDto[], docks: DockDto[]): void {
    const container = this.canvasContainer.nativeElement as HTMLElement;
    
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.scene = new THREE.Scene();

    setupBackground(this.scene);

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(10, 8, 15);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    setupGround(this.scene);

    const warehouses = storageAreas.filter(area => area.type === 'Warehouse');
    warehouses.forEach((area: StorageAreaDto) => createWarehouse(this.scene, area));

    const yards = storageAreas.filter(area => area.type === 'Yard');
    yards.forEach((area: StorageAreaDto) => createYard(this.scene, area));

    //criar Docks
    docks.forEach((area: DockDto) => createDock(this.scene, area));



    setupLighting(this.scene);
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 30;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.1;
    this.controls.update();
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

  private renderScene(): void {
    this.animationId = requestAnimationFrame(() => this.renderScene());

    if (this.controls) {
      this.controls.update();
    }
    this.renderer.render(this.scene, this.camera);
  }
}
