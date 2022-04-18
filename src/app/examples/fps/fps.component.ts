import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild } from "@angular/core";

import { Color, Ray, Vector3 } from "three";

import { NgtCamera, NgtState, NgtTriple } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicBodyReturn } from "@angular-three/cannon/bodies";

class Projectile {
  constructor(public body: NgtPhysicBodyReturn, public ttl: number = 30) { }
}
class Target {
  constructor(public body: NgtPhysicBodyReturn, public color: Color) { }
}

@Component({
  selector: 'fps-example',
  templateUrl: './fps-example.component.html',
  providers: [NgtPhysicBody],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FPSExample implements AfterViewInit, OnDestroy {
  @Input() camera!: NgtCamera;

  projectiles: Array<Projectile> = [];
  cubes: Array<Target> = [];

  playerRadius = 0.5;
  ballRadius = 0.1;


  constructor(
    private physicBody: NgtPhysicBody,
    private cd: ChangeDetectorRef,
  ) {
    for (let i = 0; i < 30; i++) {
      const position = [
        -10 + Math.random() * 20,
        Math.random() + 1,
        -10 + Math.random() * 20
      ] as NgtTriple;
      const body = this.physicBody.useBox(() => ({
        mass: 1,
        material: { friction: 1, restitution: 0.3 },
        args: [1, 1, 1],
        position: position,
      }));
      this.cubes.push(new Target(body, new Color().setHex(Math.random() * 0xffffff)));
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

    const velocity = shootDirection.multiplyScalar(10).toArray();
    const ball = this.physicBody.useSphere(() => ({
      mass: 2,
      args: [this.ballRadius],
      position: position,
      velocity: velocity
    }));

    this.projectiles.push(new Projectile(ball));

    // if setInterval is removed above, need to uncomment for ball to appear
    // this.cd.detectChanges();
  }

  tick() {
    this.player.api.position.copy(this.camera.position);
  }
}


@Component({
  templateUrl: './fps.component.html',
})
export class FPSComponent {
  camera!: NgtCamera;
  created(event: NgtState) {
    this.camera = event.camera;
  }
}
