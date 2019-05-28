import { Injectable, EventEmitter } from '@angular/core';
import { SimulationService } from './simulation.service';

@Injectable()
export class AppService {
  isImageLoaded: EventEmitter<number> = new EventEmitter();
  constructor(private simulationService: SimulationService) {}

  createPlayGround(canvasElement): void {
    this.simulationService.loadAssets(canvasElement).then(image => {
      this.isImageLoaded.emit();
    });
  }

  getImageLoadEmitter() {
    return this.isImageLoaded;
  }

  moveEntity(event: KeyboardEvent, type: string): void {
    if (type === 'keydown') {
      if (event.keyCode === 37) {
        this.simulationService.moveLeft = true;
        this.simulationService.moveUP = false;
        this.simulationService.moveDown = false;
      } else if (event.keyCode === 39) {
        this.simulationService.moveRight = true;
        this.simulationService.moveLeft = false;
        this.simulationService.moveUP = false;
        this.simulationService.moveDown = false;
      } else if (event.keyCode === 38) {
        this.simulationService.moveUP = true;
        this.simulationService.moveLeft = false;
        this.simulationService.moveRight = false;
        this.simulationService.moveDown = false;
      } else if (event.keyCode === 40) {
        this.simulationService.moveDown = true;
        this.simulationService.moveLeft = false;
        this.simulationService.moveRight = false;
        this.simulationService.moveUP = false;
      }
    } else if (type === 'keyup') {
      this.simulationService.moveDown = false;
      this.simulationService.moveLeft = false;
      this.simulationService.moveRight = false;
      this.simulationService.moveUP = false;
    }
  }
}
