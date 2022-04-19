import { AfterViewInit, Component, OnDestroy } from "@angular/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  selector: 'bodytypes-example',
  templateUrl: './body_types-example.component.html',
  providers: [NgtPhysicBody],
})
export class BodyTypesExample implements AfterViewInit, OnDestroy {
  spheresize = 0.5;

  sphereRef = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [this.spheresize],
    position: [0, 1, 0]
  }));

  boxRef = this.physicBody.useBox(() => ({
    type:'Kinematic',
    mass: 0,
    args: [1, 1, 1],
    position: [0, 0.5, 0]
  }));

  private timer!: any;

  constructor(private physicBody: NgtPhysicBody) { }

  ngAfterViewInit(): void {
    let speed = 4;
    this.timer = setInterval(() => {
      this.boxRef.api.velocity.set(0, speed, 0);
      speed = -speed;
    }, 500)

    this.boxRef.api.position.subscribe(next => {
      // position not changing
    })
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}

@Component({
  templateUrl: './body_types.component.html',
})
export class BodyTypesComponent {
}
