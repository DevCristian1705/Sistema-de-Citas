import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module'; 
import {AppComponent} from './app.component'; 
import { MenuService } from './Shared/services/app.menu.service'; 
  
import { registerLocaleData } from '@angular/common';  
import localePy from '@angular/common/locales/es-Pe';   
import { InterceptorService } from './Auth/services/interceptor.service'; 
registerLocaleData(localePy, 'es');


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
    ], 
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
         MenuService,  
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true,    
        },   
   ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
