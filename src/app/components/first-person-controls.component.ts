import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

import { Camera, Vector3 } from 'three';

import { NgtRenderState, NgtStore } from '@angular-three/core';

//
// adapted from three.js games fps example https://github.com/mrdoob/three.js/blob/master/examples/games_fps.html
//
@Component({
  selector: 'first-person-controls',
  template: '<ngt-group (ready)="ready()" (animateReady)="animate($event.state)"></ngt-group>',
  providers: [NgtStore]
})
export class FirstPersonControlsComponent implements OnDestroy {
  @Input() container: HTMLElement = document.body;
  @Input() viewerheight = 1.5;
  @Input() movespeed = 1;
  @Input() rotatefactor = 2000;

  @Output() shoot = new EventEmitter();

  private keyStates = new Map<string, boolean>([]);
  private camera!: Camera;

  private cleanup!: () => void;

  constructor(private canvasStore: NgtStore) { }

  ngOnDestroy(): void {
    this.cleanup();
  }

  ready() {
    const camera = this.canvasStore.get((s) => s.camera);
    camera.rotation.order = 'YXZ';
    this.camera = camera;

    // movement
    const keydown = (event: KeyboardEvent) => {
      this.keyStates.set(event.code, true);
    }
    document.addEventListener('keydown', keydown);

    const keyup = (event: KeyboardEvent) => {
      this.keyStates.set(event.code, false);
    }
    document.addEventListener('keyup', keyup);

    const mousedown = () => {
      document.body.requestPointerLock();
    }
    this.container.addEventListener('mousedown', mousedown);

    const mouseup = () => {
      this.shoot.emit();
    }
    document.body.addEventListener('mouseup', mouseup);

    // rotation
    const mousemove = (event: MouseEvent) => {
      if (document.pointerLockElement === document.body) {
        camera.rotation.y -= event.movementX / this.rotatefactor;
        camera.rotation.x -= event.movementY / this.rotatefactor;
      }
    }
    document.body.addEventListener('mousemove', mousemove);

    this.cleanup = () => {
      document.exitPointerLock();
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('keyup', keyup);
      this.container.removeEventListener('mousedown', mousedown);
      document.body.removeEventListener('mouseup', mouseup);
      document.body.removeEventListener('mousemove', mousemove);
    }
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

  animate({ delta }: NgtRenderState) {
    this.updateVelocity(delta * this.movespeed);  // check for input
    this.moveCamera(delta); // move player
  }
}
