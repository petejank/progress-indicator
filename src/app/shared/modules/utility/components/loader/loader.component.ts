import {Component, ChangeDetectionStrategy, Input, OnChanges} from '@angular/core'
import formatDeg from 'src/app/shared/utils/formatDeg'
import formatPixels from 'src/app/shared/utils/formatPixels'
import {PropertyChanges} from './types/change'

const MIN_RADIUS = 50
const RADIUS_TO_WIDTH_MULTIPLIER = 2
const MIN_PROGRESS = 0
const MAX_PROGRESS = 100
const MAX_DEG_VALUE = 180
const CORRECTION_THRESHOLD = 85

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnChanges {
  currentRadius!: number
  currentProgress!: number

  @Input() radius!: number
  @Input() progress!: number
  @Input() color!: string

  ngOnChanges({progress, radius}: PropertyChanges): void {
    if (radius) {
      this.currentRadius = Math.max(MIN_RADIUS, radius.currentValue)
    }

    if (progress) {
      const minValueCheck = Math.max(progress.currentValue, MIN_PROGRESS)
      this.currentProgress = Math.floor(Math.min(minValueCheck, MAX_PROGRESS))
    }
  }

  loaderStyle() {
    const fullSize = formatPixels(this.getSize())

    return {
      height: fullSize,
      width: fullSize
    }
  }

  maskStyle(fullMask?: boolean) {
    const size = formatPixels(this.getRadiusValue(fullMask))
    const fullSize = formatPixels(this.getSize())
    const zeroValue = formatPixels(0)

    return {
      clip: `rect(${zeroValue}, ${fullSize}, ${fullSize}, ${size})`,
      transform: fullMask && this.getRotationDeg()
    }
  }

  fillStyle(fullMask?: boolean) {
    const size = formatPixels(this.getRadiusValue(fullMask))
    const fullSize = formatPixels(this.getSize())
    const zeroValue = formatPixels(0)

    return {
      clip: `rect(${zeroValue}, ${size}, ${fullSize}, ${zeroValue})`,
      transform: this.getRotationDeg(),
      background: this.color
    }
  }

  private getRotationDeg() {
    const rotation = Math.floor(MAX_DEG_VALUE * (this.currentProgress / MAX_PROGRESS))
    return `rotate(${formatDeg(rotation)})`
  }

  private getSize() {
    return this.currentRadius * RADIUS_TO_WIDTH_MULTIPLIER
  }

  // Fixes a 1px gap between two halves of the circle rotation
  private getRadiusValue(fullMask?: boolean) {
    if (!fullMask) return this.currentRadius
    if (this.currentProgress > CORRECTION_THRESHOLD) return this.currentRadius

    return this.currentRadius - 1
  }
}
