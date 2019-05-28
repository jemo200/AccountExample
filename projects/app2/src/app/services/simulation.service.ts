import { Injectable, Input } from '@angular/core';

import * as CONFIG from './../config/config';
import { Obstacles } from './../interfaces/obstacles';
import { SingleObstacles } from './../interfaces/single-obstacle';
import { EntityPosition } from './../interfaces/entity-position';

@Injectable()
export class SimulationService {
  @Input() public width: number = CONFIG.playGroundWidth;
  @Input() public height: number = CONFIG.playGroundHeight;
  frameNumber: number = CONFIG.frameNumber;
  entity: EntityPosition = {
    x: CONFIG.playGroundWidth / 2 - CONFIG.entity.width,
    y:
      CONFIG.playGroundHeight -
      (CONFIG.entity.height + CONFIG.entity.height / 2)
  };

  context: CanvasRenderingContext2D;
  obstacles: Array<Obstacles> = [];
  gameLoop = null;
  moveUP = false;
  moveDown = false;
  moveLeft = false;
  moveRight = false;

  loadAssets(canvasElement: HTMLCanvasElement): Promise<void> {
    this.context = canvasElement.getContext('2d');
    canvasElement.width = this.width;
    canvasElement.height = this.height;
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  startGameLoop() {
    this.gameLoop = setInterval(() => {
      this.suffleProperties();
      this.cleanGround();
      this.createObstacles();
      this.moveObstacles();
      this.createEntity();
    }, 10);
  }

  animationFrame(n: number): boolean {
    if ((this.frameNumber / n) % 1 === 0) {
      return true;
    }
    return false;
  }

  suffleProperties(): void {
    this.frameNumber += 1;
  }

  createObstacles(): void {
    if (this.frameNumber === 1 || this.animationFrame(100)) {
      if (this.obstacles.length > 20) {
        this.obstacles.splice(0, 5);
      }
      this.getSingleObstacle();
    }
  }

  getSingleObstacle(): void {
    const context: CanvasRenderingContext2D = this.context;
    const randomVehicle: SingleObstacles =
      CONFIG.vehicles[Math.floor(Math.random() * CONFIG.vehicles.length)];

    this.obstacles.push(
      new function() {
        (this.x = Math.floor(Math.random() * 450) + 0),
          (this.y = Math.floor(Math.random() * -15) + 0),
          (this.width = randomVehicle.width);
        this.height = randomVehicle.height;
        this.update = () => {
          context.fillStyle = randomVehicle.color;
          context.fillRect(
            this.x,
            this.y,
            randomVehicle.width,
            randomVehicle.height
          );
        };
      }()
    );
  }

  moveObstacles(): void {
    this.obstacles.forEach((element: Obstacles, index: number) => {
      element.y += 3;
      element.update();
      this.detectCrash(element);
      if (element.y > this.height) {
        this.obstacles.splice(index, 1);
      }
    });
  }

  createEntity(): void {
    if (this.moveUP) {
      if (this.entity.y === 0) {
        this.entity.y = 0;
      } else {
        this.entity.y -= CONFIG.entitySpeed;
      }
    } else if (this.moveDown) {
      if (
        this.entity.y + CONFIG.entity.height === CONFIG.playGroundHeight ||
        this.entity.y + CONFIG.entity.height > CONFIG.playGroundHeight
      ) {
        this.entity.y = CONFIG.playGroundHeight - CONFIG.entity.height;
      } else {
        this.entity.y += CONFIG.entitySpeed;
      }
    } else if (this.moveLeft) {
      if (this.entity.x === 0 || this.entity.x < 0) {
        this.entity.x = 0;
      } else {
        this.entity.x -= CONFIG.entitySpeed;
      }
    } else if (this.moveRight) {
      if (
        this.entity.x + CONFIG.entity.width === CONFIG.playGroundWidth ||
        this.entity.x + CONFIG.entity.width > CONFIG.playGroundWidth
      ) {
        this.entity.x = CONFIG.playGroundWidth - CONFIG.entity.width;
      } else {
        this.entity.x += CONFIG.entitySpeed;
      }
    }
    this.context.fillStyle = CONFIG.entity.color;
    this.context.fillRect(
      this.entity.x,
      this.entity.y,
      CONFIG.entity.width,
      CONFIG.entity.height
    );
  }

  detectCrash(obstacle: Obstacles): void {
    const componentLeftSide = obstacle.x;
    const componentRightSide = obstacle.x + obstacle.width;
    const componentTop = obstacle.y;
    const componentBottom = obstacle.y + obstacle.height;

    const carRightSide = this.entity.x + CONFIG.entity.width;
    const carLeftSide = this.entity.x;
    const carTop = this.entity.y;
    const carBottom = this.entity.y + CONFIG.entity.height;

    if (
      carRightSide > componentLeftSide &&
      carTop < componentBottom &&
      (carLeftSide < componentRightSide && carTop < componentBottom) &&
      (carRightSide > componentLeftSide && carBottom > componentTop) &&
      (carLeftSide < componentRightSide && carBottom > componentTop)
    ) {
      clearInterval(this.gameLoop);
      alert('Simulation Ended');
      window.location.reload();
    }
  }

  cleanGround(): void {
    this.context.clearRect(
      0,
      0,
      CONFIG.playGroundWidth,
      CONFIG.playGroundHeight
    );
  }
}
