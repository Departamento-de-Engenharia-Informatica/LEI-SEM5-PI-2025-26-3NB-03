import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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

  constructor() { }

  ngAfterViewInit(): void {
    this.initThree();
    this.renderScene();

    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.setupResizeObserver();
  }

  ngOnDestroy(): void {
    if (this.controls) {
      this.controls.dispose();
    }
    if (this.renderer) {
      this.renderer.dispose();
    }

    window.removeEventListener('resize', this.onWindowResize.bind(this));
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
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

  private initThree(): void {
    const container = this.canvasContainer.nativeElement as HTMLElement;
    
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.scene = new THREE.Scene();
    const skyColor = 0x87CEEB;
    const fogColor = 0x97DEFB;
    this.scene.background = new THREE.Color(skyColor);
    const near = 0.1;
    const far = 80;
    this.scene.fog = new THREE.Fog(fogColor, near, far);

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(10, 8, 15);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    const groundRotation = -Math.PI / 2;
    const portColor = 0x555555;
    const portSize = 30;
    const portGeometry = new THREE.PlaneGeometry(portSize, portSize);
    const portMaterial = new THREE.MeshLambertMaterial({ color: portColor });
    const port = new THREE.Mesh(portGeometry, portMaterial);
    port.rotation.x = groundRotation;
    port.receiveShadow = true;
    this.scene.add(port);

    const waterSize = 1000;
    const waterGeometry = new THREE.PlaneGeometry(waterSize, waterSize); 
    const waterMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x004477, 
        metalness: 0.5, 
        roughness: 0.5 
    }); 
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = groundRotation;
    water.position.z = portSize / 2 + waterSize / 2;
    water.position.y = -0.01;
    water.receiveShadow = true;
    this.scene.add(water);

    const landSize = 1000;
    const landGeometry = new THREE.PlaneGeometry(landSize, landSize);
    const landMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); 
    const land = new THREE.Mesh(landGeometry, landMaterial);
    land.rotation.x = groundRotation;
    land.position.z = -(-(portSize / 2) + landSize / 2);
    land.position.y = -0.01;
    land.receiveShadow = true;
    this.scene.add(land);

    const warehouseWidth = 6; 
    const warehouseHeight = 2;
    const warehouseDepth = 3;
    const warehouseGeometry = new THREE.BoxGeometry(warehouseWidth, warehouseHeight, warehouseDepth); 
    const warehouseMaterial = new THREE.MeshStandardMaterial({ color: 0x758090 });
    const warehouse = new THREE.Mesh(warehouseGeometry, warehouseMaterial);
    warehouse.castShadow = true;
    warehouse.receiveShadow = true;
    warehouse.position.set(7.2, warehouseHeight / 2, 1.3);
    warehouse.rotation.y = 10.7;
    this.scene.add(warehouse);

    const dockWidth = 7; 
    const dockHeight = 0.3;
    const dockDepth = 4;
    const dockGeometry = new THREE.BoxGeometry(dockWidth, dockHeight, dockDepth); 
    const dockMaterial = new THREE.MeshStandardMaterial({ color: 0x657080 });
    const dock = new THREE.Mesh(dockGeometry, dockMaterial);
    dock.castShadow = true;
    dock.receiveShadow = true;
    dock.position.set(-3.5, dockHeight / 2, 13.1);
    const graus = 90;
    dock.rotation.y = graus * (Math.PI / 180);
    this.scene.add(dock);

    const sunLight = new THREE.DirectionalLight(0xffffff, 3); 
    sunLight.position.set(10, 20, 10); 
    sunLight.target.position.set(0, 0, 0);
    this.scene.add(sunLight);
    sunLight.castShadow = true;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -20;
    sunLight.shadow.camera.near = 0.1;
    sunLight.shadow.camera.far = 50;
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 3)
    this.scene.add(ambientLight);
    
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

  private renderScene(): void {
    requestAnimationFrame(() => this.renderScene());

    if (this.controls) {
      this.controls.update();
    }
    this.renderer.render(this.scene, this.camera);
  }
}
