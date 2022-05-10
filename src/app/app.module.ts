import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module'; 
import {AppComponent} from './app.component'; 
import { MenuService } from './Shared/services/app.menu.service';
import { AppBreadcrumbService } from './Shared/services/app.breadcrumb.service';
import { InterceptorService } from './Auth/services/interceptor.service';
 

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
        AppBreadcrumbService,
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
