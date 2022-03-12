import {Component, OnInit} from '@angular/core'

const PROGRESS_INTERVAL = 100
const PROGRESS_STEP = 1
const MAX_PROGRESS = 100

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  progress: number = 0
  progressInterval!: ReturnType<typeof setInterval>

  ngOnInit() {
    this.progressInterval = setInterval(() => {
      if (this.progress === MAX_PROGRESS) {
        clearInterval(this.progressInterval)
        return
      }

      this.progress += PROGRESS_STEP
    }, PROGRESS_INTERVAL)
  }
}
