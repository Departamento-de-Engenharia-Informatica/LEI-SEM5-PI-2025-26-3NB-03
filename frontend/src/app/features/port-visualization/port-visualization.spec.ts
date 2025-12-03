import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Api } from '../../core/services/api';

import { PortVisualization } from './port-visualization';

describe('PortVisualization', () => {
  let component: PortVisualization;
  let fixture: ComponentFixture<PortVisualization>;

  const mockApi = {
    getAll: jasmine.createSpy('getAll').and.returnValue(of([])),
    create: jasmine.createSpy('create').and.returnValue(of({})),
    update: jasmine.createSpy('update').and.returnValue(of({})),
  };

  beforeAll(() => {
    (globalThis as any).ResizeObserver = class {
      observe() {}
      disconnect() {}
    };
    
    spyOn(window, 'requestAnimationFrame').and.callFake((cb: FrameRequestCallback) => 0);
    spyOn(window, 'cancelAnimationFrame').and.callFake(() => {});
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PortVisualization
      ],
      providers: [
        { provide: Api, useValue: mockApi },
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortVisualization);
    component = fixture.componentInstance;
    const div = document.createElement('div');
    Object.defineProperty(component, 'canvasContainer', { value: { nativeElement: div } });
    component['renderer'] = {
      forceContextLoss: jasmine.createSpy(),
      dispose: jasmine.createSpy(),
      domElement: document.createElement('canvas'),
      setSize: jasmine.createSpy()
    } as any;
    component['scene'] = { traverse: jasmine.createSpy() } as any;
    component['controls'] = { dispose: jasmine.createSpy(), update: jasmine.createSpy() } as any;
    spyOn(component as any, 'initThree').and.returnValue(undefined);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
