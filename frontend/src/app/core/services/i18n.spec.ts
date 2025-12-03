import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { I18n } from './i18n';

describe('I18n', () => {
  let service: I18n;

  const mockTranslateService = {
    instant: (key: string) => key,
    get: (key: string | string[]) => of(typeof key === 'string' ? key : key[0]),
    onLangChange: of({}),
    onDefaultLangChange: of({}),
    onTranslationChange: of({})
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        I18n
      ]
    });
    service = TestBed.inject(I18n);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
