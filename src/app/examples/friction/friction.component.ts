import { Component } from "@angular/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";


@Component({
  templateUrl: './friction.component.html',
  providers: [NgtPhysicBody],
})
export class FrictionComponent {

  fixedBoxProps = this.physicBody.useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    material: { friction: 1 },
  }));

  slipperyBoxProps = this.physicBody.useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    material: { friction: 0.001 },
    velocity: [0, 0, -1]
  }));

  constructor(private physicBody: NgtPhysicBody) { }
}
