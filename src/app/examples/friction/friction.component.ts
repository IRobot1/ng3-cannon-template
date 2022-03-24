import { Component } from "@angular/core";

import { BoxProps, PlaneProps } from "@angular-three/cannon";


@Component({
  templateUrl: './friction.component.html'
})
export class FrictionComponent {

  getPlaneProps(): PlaneProps {
    return {
      material: { friction: 0.1 },
    } as PlaneProps;
  }

  getFixedBoxProps(): BoxProps {
    return {
      mass: 1,
      args: [1, 1, 1],
      material: { friction: 1 },
    } as BoxProps;
  }

  getSlipperyBoxProps(): BoxProps {
    return {
      mass: 1,
      args: [1, 1, 1],
      material: { friction: 0.001 },
      velocity: [0, 0, -1]
    } as BoxProps;
  }
}
