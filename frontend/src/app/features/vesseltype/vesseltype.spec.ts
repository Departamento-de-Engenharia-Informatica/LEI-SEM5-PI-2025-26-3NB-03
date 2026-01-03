import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Api } from '../../core/services/api';
import { TranslateModule } from '@ngx-translate/core';

import { VesselType } from './vesseltype';

describe('VesselType', () => {
  let component: VesselType;
  let fixture: ComponentFixture<VesselType>;

  const mockApi = {
    getAll: jasmine.createSpy('getAll').and.returnValue(of([])),
    create: jasmine.createSpy('create').and.returnValue(of({})),
    update: jasmine.createSpy('update').and.returnValue(of({})),
  };

  const mockTranslateService = {
    instant: (key: string) => key,
    get: (key: string | string[]) => of(typeof key === 'string' ? key : key[0]),
    onLangChange: of({}),
    onDefaultLangChange: of({}),
    onTranslationChange: of({})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VesselType,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: Api, useValue: mockApi },
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VesselType);
    component = fixture.componentInstance;
    component.feedbackMessage = { text: null, type: null };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
