import { AfterViewInit, Component, OnDestroy } from "@angular/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";


@Component({
  templateUrl: './body_types.component.html',
  providers: [NgtPhysicBody],
})
export class BodyTypesComponent implements AfterViewInit, OnDestroy {

  sphereRef = this.physicBody.useSphere(() => ({
      mass: 1,
      args: [1]
  }));
  boxRef = this.physicBody.useBox(() => ({
      mass: 0,
      args: [1, 1, 1],
  }));

  private timer!: any;

  constructor(private physicBody: NgtPhysicBody) { }

  ngAfterViewInit(): void {
    let speed = 1;
    this.boxRef.api.velocity.set(0, speed, 0);
    this.timer = setInterval(() => {
      if (speed == 5)
        speed = -5;
      else
        speed = 5;
      this.boxRef.api.velocity.set(0, speed, 0);
    }, 1000)

    this.boxRef.api.position.subscribe(next => {
      // position not changing
    })
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
