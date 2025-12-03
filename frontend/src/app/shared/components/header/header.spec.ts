import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

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
        Header,
        TranslateModule.forRoot()
      ],
      providers: [
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
