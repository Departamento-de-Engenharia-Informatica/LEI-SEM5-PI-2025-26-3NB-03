import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortVisualization } from './port-visualization';

describe('PortVisualization', () => {
  let component: PortVisualization;
  let fixture: ComponentFixture<PortVisualization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortVisualization]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortVisualization);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
