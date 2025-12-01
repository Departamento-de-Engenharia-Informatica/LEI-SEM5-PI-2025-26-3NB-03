import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAgentOrganization } from './shippingagentorganization';

describe('Shippingagentorganization', () => {
  let component: ShippingAgentOrganization;
  let fixture: ComponentFixture<ShippingAgentOrganization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingAgentOrganization]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingAgentOrganization);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
