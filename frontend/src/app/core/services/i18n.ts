import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class I18n {
  private availableLangs = ['en', 'pt'];
  private defaultLang = 'pt';
  private _currentLang: string = this.defaultLang;
  private isBrowser: boolean;

  constructor(private translate: TranslateService, @Inject(PLATFORM_ID) platformId: Object ) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.translate.onLangChange.subscribe(event => {
      this._currentLang = event.lang;
    });
  }

  /*ngOnInit() {
    this.initLanguage();
  }*/

  public initLanguage(): Promise<void> {
    this.translate.addLangs(this.availableLangs);
    let langToUse: string = this.defaultLang;

    if (this.isBrowser) { 
      const storedLang = localStorage.getItem('language');
      const browserLang = this.translate.getBrowserLang(); 

      if (storedLang && this.availableLangs.includes(storedLang)) {
        langToUse = storedLang;
      } else if (browserLang && this.availableLangs.includes(browserLang)) {
        langToUse = browserLang;
      }
    }

    /*setTimeout(() => {
        this.translate.use(langToUse); 
    }, 10);*/

    return new Promise((resolve) => {
      this.translate.use(langToUse).subscribe({
        next: () => resolve(),
        error: () => resolve(), 
        complete: () => resolve()
      });
    });
  }

  /**
   * Defines and saves the new language.
   * @param lang language code ('pt' or 'en')
   */
  setLanguage(lang: string) {
    this.translate.use(lang);
    if (this.isBrowser) {
      localStorage.setItem('language', lang);
    }
  }

  /**
   * Returns current language.
   * @returns current language
   */
  getCurrentLanguage(): string {
    return this._currentLang; 
  }
}
