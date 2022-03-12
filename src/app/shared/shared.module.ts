import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {UtilityModule} from './modules/utility/utility.module'

@NgModule({
  imports: [CommonModule],
  exports: [UtilityModule]
})
export class SharedModule {}
