import { Component } from "@angular/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";


@Component({
  templateUrl: './fixed_rotation.component.html',
  providers: [NgtPhysicBody],
})
export class FixedRotationComponent {
  boxProps = this.physicBody.useBox(() => ({
      mass: 1,
      args: [1, 1, 1],
      fixedRotation: true
  }));

  constructor(private physicBody: NgtPhysicBody) { }
}
