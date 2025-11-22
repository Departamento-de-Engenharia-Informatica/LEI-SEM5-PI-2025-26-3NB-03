import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class I18n {
  private availableLangs = ['en', 'pt'];
  private defaultLang = 'pt';
  private _currentLang: string = this.defaultLang;

  constructor(private translate: TranslateService) {

    this.translate.onLangChange.subscribe(event => {
      this._currentLang = event.lang;
    });
  }

  public initLanguage(): Promise<void> {
    this.translate.addLangs(this.availableLangs);
    let langToUse: string = this.defaultLang;

    const storedLang = localStorage.getItem('language');
    const browserLang = this.translate.getBrowserLang(); 

    if (storedLang && this.availableLangs.includes(storedLang)) {
      langToUse = storedLang;
    } else if (browserLang && this.availableLangs.includes(browserLang)) {
      langToUse = browserLang;
    }

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
    localStorage.setItem('language', lang);
  }

  /**
   * Returns current language.
   * @returns current language
   */
  getCurrentLanguage(): string {
    return this._currentLang; 
  }
}
