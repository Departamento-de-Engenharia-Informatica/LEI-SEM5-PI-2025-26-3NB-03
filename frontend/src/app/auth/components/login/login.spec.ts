import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

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
        Login,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
