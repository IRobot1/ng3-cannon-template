import { BoxProps, GetByIndex } from "@angular-three/cannon";
import { Component } from "@angular/core";

@Component({
  templateUrl: './threejs.component.html'
})
export class ThreeJSComponent {
  getCubeProps(): BoxProps {
    return {
      mass: 1,
      angularVelocity: [0, 10, 0],
      angularDamping: 0.5,
    } as BoxProps;
  }
}
