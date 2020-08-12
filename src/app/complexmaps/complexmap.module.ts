import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ComplexmapsComponent } from './complexmaps.component';
import { ComplexmapService } from './complexmap.service';



@NgModule({
  declarations: [ComplexmapsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers: [ComplexmapService]
})
export class ComplexmapModule { }
