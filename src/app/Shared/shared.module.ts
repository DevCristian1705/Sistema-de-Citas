import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { PrimeNGModule } from '../Utilitarios/PrimeNG/primeng.module';  
import { AppBreadcrumbComponent } from '../Shared/components/breadcrumb/app.breadcrumb.component';
import { AppMenuComponent } from '../Shared/components/menu/app.menu.component';
import { AppMenuitemComponent } from '../Shared/components/menuitem/app.menuitem.component';
import { AppTopBarComponent } from '../Shared/components/topbar/app.topbar.component';

@NgModule({
  declarations: [  
    AppBreadcrumbComponent,  
    AppMenuComponent,
    AppMenuitemComponent,
    AppTopBarComponent, 
  ],
  imports: [
    CommonModule, 
    PrimeNGModule,
  ],
  exports:[  
    AppBreadcrumbComponent,  
    AppMenuComponent,
    AppMenuitemComponent,
    AppTopBarComponent, 
  ]
})
export class SharedModule { }
