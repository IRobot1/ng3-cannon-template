import { Component, Input, OnDestroy } from '@angular/core';

import { Mesh, Texture, Vector3 } from 'three';

import { NgtRenderState, NgtStore, NgtTriple } from '@angular-three/core';

import { NgtPhysicBody } from '@angular-three/cannon';

@Component({
  selector: 'rolling-controls',
  templateUrl: 'rolling-controls.component.html',
  providers: [NgtPhysicBody],
})
export class RollingControlsComponent implements OnDestroy {
  @Input() container: HTMLElement = document.body;
  @Input() cameraoffset = [10, 10, 0] as NgtTriple;
  @Input() movespeed = 0.2;
  @Input() texture!: Texture;
  @Input() ballsize = 1;

  ball = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [this.ballsize],
    position: [0, 1, 0] as NgtTriple,
    angularDamping: 0.5,
    linearDamping: 0.5,
    onCollide: () => {
      this.canJump = true;
    }
  }));


  private keyStates = new Map<string, boolean>([]);
  private canJump = true;

  private cleanup!: () => void;


  constructor(
    private physicBody: NgtPhysicBody,
    private store: NgtStore,
  ) { }

  ngOnDestroy(): void {
    this.cleanup();
  }

  ready(mesh: Mesh) {
    const camera = this.store.get((s) => s.camera);
    camera.rotation.order = 'YXZ';

    // move camera relative to ball 
    camera.position.copy(mesh.position.clone().add(new Vector3(this.cameraoffset[0], this.cameraoffset[1], 0)));
    camera.lookAt(mesh.position);

    // move the camera as the ball change position
    this.ball.api.position.subscribe(next => {
      camera.position.set(next[0] + this.cameraoffset[0], next[1] + this.cameraoffset[1], next[2]);
    });

    // movement
    const keydown = (event: KeyboardEvent) => {
      this.keyStates.set(event.code, true);
    }
    document.addEventListener('keydown', keydown);

    const keyup = (event: KeyboardEvent) => {
      this.keyStates.set(event.code, false);

      // bring ball to a stop
      this.ball.api.applyImpulse(this.playerTorque.multiplyScalar(-1).toArray(), [0, 1, 0]);
      this.playerTorque.set(0, 0, 0);
    }
    document.addEventListener('keyup', keyup);

    const mousedown = () => {
      document.body.requestPointerLock();
    }
    this.container.addEventListener('mousedown', mousedown);

    this.cleanup = () => {
      document.exitPointerLock();
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('keyup', keyup);
      this.container.removeEventListener('mousedown', mousedown);
    }
  }

  private playerTorque = new Vector3();

  private jump() {
    if (this.canJump) {
      this.ball.api.applyImpulse([0, 10, 0], [0, 1, 0]);
      this.canJump = false;
    }
  }
  private moveBall(deltaTime: number) {
    if (this.keyStates.get('KeyW') || this.keyStates.get('ArrowUp')) {
      this.playerTorque.add(new Vector3(-deltaTime));
    }

    if (this.keyStates.get('KeyS') || this.keyStates.get('ArrowDown')) {
      this.playerTorque.add(new Vector3(deltaTime));
    }

    if (this.keyStates.get('KeyA') || this.keyStates.get('ArrowLeft')) {
      this.playerTorque.add(new Vector3(0, 0, deltaTime));
    }

    if (this.keyStates.get('KeyD') || this.keyStates.get('ArrowRight')) {
      this.playerTorque.add(new Vector3(0, 0, -deltaTime));
    }
    if (this.keyStates.get('Space')) {
      this.jump();
    }

    // push ball from the top
    this.ball.api.applyImpulse(this.playerTorque.toArray(), [0, 1, 0]);
  }


  animate({ delta }: NgtRenderState) {
    this.moveBall(delta * this.movespeed);  // check for input
  }
}
