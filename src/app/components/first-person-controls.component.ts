import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Camera, Vector3 } from 'three';
import { NgtCanvasStore, NgtRender } from '@angular-three/core';

//
// adapted from three.js games fps example https://github.com/mrdoob/three.js/blob/master/examples/games_fps.html
//
@Component({
  selector: 'first-person-controls',
  template: '<ngt-group (ready)="ready()" (animateReady)="animate($event.state)"></ngt-group>'
})
export class FirstPersonControlsComponent {
  @Input() container?: HTMLElement;
  @Input() viewerheight = 1.5;
  @Input() movespeed = 1;
  @Input() rotatefactor = 2000;

  @Output() shoot = new EventEmitter();

  private keyStates = new Map<string, boolean>([]);
  private camera!: Camera;

  constructor(private canvasStore: NgtCanvasStore) { }

  ready() {
    const camera = this.canvasStore.get((s) => s.camera);
    camera.rotation.order = 'YXZ';
    this.camera = camera;

    // movement
    document.addEventListener('keydown', (event) => {
      this.keyStates.set(event.code, true);
    });
    document.addEventListener('keyup', (event) => {
      this.keyStates.set(event.code, false);
    });

    if (!this.container) {
      this.container = document.body;
    }

    this.container.addEventListener('mousedown', () => {
      document.body.requestPointerLock();
    });

    this.container.addEventListener('mouseup', () => {
      this.shoot.emit();
    });

    // rotation
    document.body.addEventListener('mousemove', (event) => {
      if (document.pointerLockElement === document.body) {
        camera.rotation.y -= event.movementX / this.rotatefactor;
        camera.rotation.x -= event.movementY / this.rotatefactor;
      }
    });
  }

  private getForwardVector(): Vector3 {
    const playerDirection = new Vector3()

    this.camera.getWorldDirection(playerDirection);
    playerDirection.y = 0;
    playerDirection.normalize();

    return playerDirection;
  }

  private getSideVector(): Vector3 {
    const playerDirection = new Vector3()

    this.camera.getWorldDirection(playerDirection);
    playerDirection.y = 0;
    playerDirection.normalize();
    playerDirection.cross(this.camera.up);

    return playerDirection;
  }

  private playerVelocity = new Vector3();

  private updateVelocity(deltaTime: number) {
    const speedDelta = deltaTime * 8;

    if (this.keyStates.get('KeyW') || this.keyStates.get('ArrowUp')) {
      this.playerVelocity.add(this.getForwardVector().multiplyScalar(speedDelta));
    }

    if (this.keyStates.get('KeyS') || this.keyStates.get('ArrowDown')) {
      this.playerVelocity.add(this.getForwardVector().multiplyScalar(-speedDelta));
    }

    if (this.keyStates.get('KeyA' || this.keyStates.get('ArrowLeft'))) {
      this.playerVelocity.add(this.getSideVector().multiplyScalar(-speedDelta));
    }

    if (this.keyStates.get('KeyD') || this.keyStates.get('ArrowRight')) {
      this.playerVelocity.add(this.getSideVector().multiplyScalar(speedDelta));
    }
  }

  private moveCamera(deltaTime: number) {
    // slow after mouse up
    let damping = Math.exp(-3 * deltaTime) - 1;

    this.playerVelocity.addScaledVector(this.playerVelocity, damping);

    const deltaPosition = this.playerVelocity.clone().multiplyScalar(deltaTime);
    if (this.camera) {
      this.camera.position.add(deltaPosition);
      this.camera.position.y = this.viewerheight;
    }
  }

  animate({ delta }: NgtRender) {
    this.updateVelocity(delta*this.movespeed);  // check for input
    this.moveCamera(delta); // move player
  }
}
