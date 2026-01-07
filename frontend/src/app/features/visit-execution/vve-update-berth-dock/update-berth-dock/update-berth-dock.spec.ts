import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Api } from '../../../../core/services/api';
import { TranslateModule } from '@ngx-translate/core';
import { VisitExecutionService } from '../../../../core/services/visit-execution.service';

import { UpdateBerthDock } from './update-berth-dock';

describe('UpdateBerthDock', () => {
  let component: UpdateBerthDock;
  let fixture: ComponentFixture<UpdateBerthDock>;

  const mockOEMApi = {
    getAll: jasmine.createSpy('getAll').and.returnValue(of([])),
    updateBerthAndDock: jasmine.createSpy('updateBerthAndDock').and.returnValue(of({}))
  };

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
        UpdateBerthDock,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: Api, useValue: mockApi },
        { provide: VisitExecutionService, useValue: mockOEMApi }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBerthDock);
    component = fixture.componentInstance;
    component.feedbackMessage = { text: null, type: null };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
