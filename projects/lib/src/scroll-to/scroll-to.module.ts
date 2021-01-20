import { NgModule } from '@angular/core';

import { NgxSimpleScrollDirective } from './scroll-to.directive';
import { NgxSimpleScrollService } from './scroll-to.service';

@NgModule({
  declarations: [
    NgxSimpleScrollDirective,
  ],
  exports: [
    NgxSimpleScrollDirective,
  ],
  providers: [
    NgxSimpleScrollService,
  ],
})

export class NgxSimpleScrollModule {}
