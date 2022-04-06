import { AfterViewInit, Component, ViewChild } from "@angular/core";

import { BoxProps, SphereProps } from "@angular-three/cannon";

import { NgtPhysicBox } from "@angular-three/cannon/bodies";

@Component({
  templateUrl: './body_types.component.html'
})
export class BodyTypesComponent implements AfterViewInit {
  @ViewChild(NgtPhysicBox) box!: NgtPhysicBox;

  getSphereProps(): SphereProps {
    return {
      mass: 1,
      args: [1]
    } as SphereProps;
  }

  getBoxProps(): BoxProps {
    return {
      mass: 0,
      args: [1, 1, 1],
    } as BoxProps;
  }

  ngAfterViewInit(): void {
    let speed = 1;
    this.box.api.velocity.set(0, speed, 0);
    setInterval(() => {
      if (speed == 5)
        speed = -5;
      else
        speed = 5;
      this.box.api.velocity.set(0, speed, 0);
    }, 1000)

    this.box.api.position.subscribe(next => {
      // position not changing
    })
  }
}
