import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { PrimeNGModule } from '../Utilitarios/PrimeNG/primeng.module';   
import { AppMenuComponent } from '../Shared/components/menu/app.menu.component';
import { AppMenuitemComponent } from '../Shared/components/menuitem/app.menuitem.component';
import { AppTopBarComponent } from '../Shared/components/topbar/app.topbar.component';

@NgModule({
  declarations: [   
    AppMenuComponent,
    AppMenuitemComponent,
    AppTopBarComponent, 
  ],
  imports: [
    CommonModule, 
    PrimeNGModule,
  ],
  exports:[   
    AppMenuComponent,
    AppMenuitemComponent,
    AppTopBarComponent, 
  ]
})
export class SharedModule { }
