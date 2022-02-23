import { DefaultRoutingModule } from './modules/default-routing/default-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconModule } from './components/icon/icon.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareModule } from './components/share/share.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US, vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DefaultRoutingModule,
    AppRoutingModule,
    ShareModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
