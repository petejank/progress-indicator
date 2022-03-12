import {ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick} from '@angular/core/testing'
import {SharedModule} from 'src/app/shared/shared.module'
import {HomeComponent} from './home.component'

const TIME_INCREMENT = 100
const TIME_INCREMENTATIONS = 100

// Integration tests suite, courtesy of Kent C. Dodds
describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [HomeComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(HomeComponent)
  })

  it('render initial loader value at 0%', fakeAsync(() => {
    fixture.detectChanges()

    const compiled = fixture.nativeElement as HTMLElement
    discardPeriodicTasks()

    expect(compiled.querySelector('[data-testid="loader-progress"]')?.textContent).toContain('0%')
  }))

  describe('when time moves forward', () => {
    it('render incremented loader value from 0% to 100%', fakeAsync(() => {
      fixture.detectChanges()

      // Usually loops are not recommended in tests as they obscure error output readability.
      // They do come in handy for testing the timers
      for (let i = 1; i <= TIME_INCREMENTATIONS; i++) {
        tick(TIME_INCREMENT)
        fixture.detectChanges()
        const compiled = fixture.nativeElement as HTMLElement

        expect(compiled.querySelector('[data-testid="loader-progress"]')?.textContent).toContain(`${i}%`)
      }

      discardPeriodicTasks()
    }))
  })
})
