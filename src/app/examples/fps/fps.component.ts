import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild } from "@angular/core";

import { Camera, Ray, Vector3 } from "three";

import { NgtState, NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

class Projectile {
  constructor(public position: NgtTriple, public ttl: number = 30) { }
}
class Target {
  constructor(public position: NgtTriple, public color: string) { }
}

@Component({
  templateUrl: './fps.component.html',
  providers: [NgtPhysicBody],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FPSComponent implements AfterViewInit, OnDestroy {

  projectiles: Array<Projectile> = [];
  cubes: Array<Target> = [];

  playerRadius = 0.5;
  ballRadius = 0.1;

  private camera!: Camera;

  constructor(
    private physicBody: NgtPhysicBody,
    private cd: ChangeDetectorRef,
  ) {
    for (let i = 0; i < 30; i++) {
      this.cubes.push(new Target([
        -10 + Math.random() * 20,
        Math.random() + 1,
        -10 + Math.random() * 20
      ], '#' + Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0')));
    }
  }

  private timer!: any;
  ngAfterViewInit(): void {
    // if setInterval is removed, will need to call detectChanges below
    this.timer = setInterval(() => {
      this.projectiles.forEach((item, index) => {
        item.ttl--;
        if (item.ttl <= 0) {
          this.projectiles.splice(index, 1)
        }
      })
    }, 100);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }


  created(event: NgtState) {
    this.camera = event.camera;
  }

  cubeProps = this.physicBody.useBox(() => ({
    mass: 1,
    material: { friction: 0, restitution: 0.3 },
    args: [1, 1, 1],
  }));

  ballProps = this.physicBody.useSphere(() => ({
    mass: 2,
    args: [this.ballRadius]
  }));

  player = this.physicBody.useSphere(() => ({
    mass: 0,
    args: [this.playerRadius]
  }));

  private getShootDirection(): Vector3 {
    const vector = new Vector3(0, 0, 1)
    vector.unproject(this.camera)
    const ray = new Ray(this.camera.position, vector.sub(this.camera.position).normalize())
    return ray.direction;
  }


  shoot() {
    const shootDirection = this.getShootDirection()

    // position the ball to bounce off the player sphere
    const position = [
      this.camera.position.x + shootDirection.x * (this.playerRadius * 1.01 + this.ballRadius),
      this.camera.position.y + shootDirection.y * (this.playerRadius * 1.01 + this.ballRadius),
      this.camera.position.z + shootDirection.z * (this.playerRadius * 1.01 + this.ballRadius),
    ] as NgtTriple;

    this.projectiles.push(new Projectile(position));

    // if setInterval is removed above, need to uncomment for ball to appear
    //this.cd.detectChanges();
  }

  tick() {
    this.player.api.position.copy(this.camera.position);
  }
}
