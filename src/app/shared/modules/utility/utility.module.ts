import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TypographyComponent} from './components/typography/typography.component'
import {LoaderComponent} from './components/loader/loader.component'

@NgModule({
  declarations: [TypographyComponent, LoaderComponent],
  imports: [CommonModule],
  exports: [TypographyComponent, LoaderComponent]
})
export class UtilityModule {}
