import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './toaster.component';



@NgModule({
  declarations: [ToasterComponent],
  imports: [
    CommonModule
  ],
  exports:[]
})
export class ToasterModule {
  static forRoot(arg0: {}): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
    throw new Error('Method not implemented.');
  }
}
