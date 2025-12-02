import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalResource } from './physicalresource';

describe('Physicalresource', () => {
  let component: PhysicalResource;
  let fixture: ComponentFixture<PhysicalResource>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicalResource]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicalResource);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
