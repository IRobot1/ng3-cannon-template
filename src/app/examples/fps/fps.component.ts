import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild } from "@angular/core";

import { Camera, Ray, Vector3 } from "three";

import { NgtCreatedState, NgtTriplet } from "@angular-three/core";

import { BoxProps, GetByIndex, SphereProps } from "@angular-three/cannon";
import { NgtPhysicSphere } from "@angular-three/cannon/bodies";

class Projectile {
  constructor(public position: NgtTriplet, public ttl: number = 30) { }
}
class Target {
  constructor(public position: NgtTriplet, public color: string) { }
}

@Component({
  templateUrl: './fps.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FPSComponent implements AfterViewInit, OnDestroy {
  @ViewChild('player') player!: NgtPhysicSphere;

  projectiles: Array<Projectile> = [];
  cubes: Array<Target> = [];

  playerRadius = 0.5;
  ballRadius = 0.1;

  private camera!: Camera;

  constructor(private cd: ChangeDetectorRef) {
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


  created(event: NgtCreatedState) {
    this.camera = event.camera;
  }

  getCubeProps: GetByIndex<BoxProps> = (index: number) => (
    {
      mass: 1,
      material: { friction: 0, restitution: 0.3 },
      args: [1, 1, 1],
    }
  )

  getBallProps: GetByIndex<SphereProps> = (index: number) => (
    {
      mass: 2,
      args: [this.ballRadius]
    }
  )

  getPlayerProps: GetByIndex<SphereProps> = (index: number) => (
    {
      mass: 0,
      args: [this.playerRadius]
    }
  )

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
    ] as NgtTriplet;

    this.projectiles.push(new Projectile(position));

    // if setInterval is removed above, need to uncomment for ball to appear
    //this.cd.detectChanges();
  }

  tick() {
    this.player.api.position.copy(this.camera.position);
  }
}
