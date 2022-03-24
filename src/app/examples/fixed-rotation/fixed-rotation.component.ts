import { Component } from "@angular/core";

import { BoxProps } from "@angular-three/cannon";


@Component({
  templateUrl: './fixed-rotation.component.html'
})
export class FixedRotationComponent {
  getBoxProps(): BoxProps {
    return {
      mass: 1,
      args: [1, 1, 1],
      fixedRotation: true
    } as BoxProps;
  }
}
