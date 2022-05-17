import { Component, EventEmitter, HostListener, Inject, Input, OnDestroy, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Camera, Vector3 } from 'three';

import { NgtRenderState, NgtStore } from '@angular-three/core';

//
// adapted from three.js games fps example https://github.com/mrdoob/three.js/blob/master/examples/games_fps.html
//
@Component({
  selector: 'first-person-controls',
  template: '<ngt-group (ready)="ready()" (beforeRender)="animate($event.state)"></ngt-group>',
})
export class FirstPersonControlsComponent implements OnDestroy {
  @Input() container: HTMLElement = this.document.body;
  @Input() viewerheight = 1.5;
  @Input() movespeed = 1;
  @Input() rotatefactor = 2000;

  @Output() shoot = new EventEmitter();

  private keyStates = new Map<string, boolean>([]);
  private camera!: Camera;


  constructor(
    private canvasStore: NgtStore,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnDestroy(): void {
    this.document.exitPointerLock();
  }

  ready() {
    const camera = this.canvasStore.get((s) => s.camera);
    camera.rotation.order = 'YXZ';
    this.camera = camera;
  }

  @HostListener('document:keydown', ['$event'])
  private onKeyDown(event: KeyboardEvent) {
    this.keyStates.set(event.code, true);
  }

  @HostListener('document:keyup', ['$event'])
  private onKeyUp(event: KeyboardEvent) {
    this.keyStates.set(event.code, false);
  }

  @HostListener('document:mousedown', ['$event'])
  private onMouseDown(event: MouseEvent) {
    this.document.body.requestPointerLock();
  }

  @HostListener('document:mouseup', ['$event'])
  private onMouseUp(event: MouseEvent) {
    this.shoot.emit();
  }

  @HostListener('document:mousemove', ['$event'])
  private onMouseMove(event: MouseEvent) {
    if (this.document.pointerLockElement === this.document.body) {
      this.camera.rotation.y -= event.movementX / this.rotatefactor;
      this.camera.rotation.x -= event.movementY / this.rotatefactor;
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

    if (this.keyStates.get('KeyA') || this.keyStates.get('ArrowLeft')) {
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
