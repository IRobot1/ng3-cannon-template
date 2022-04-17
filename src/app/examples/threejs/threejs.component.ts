import { Component } from "@angular/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  templateUrl: './threejs.component.html',
  providers: [NgtPhysicBody],
})
export class ThreeJSComponent {
  cubeProps = this.physicBody.useBox(() => ({
    mass: 1,
    angularVelocity: [0, 10, 0],
    angularDamping: 0.5,
  }));

  constructor(private physicBody: NgtPhysicBody) { }
}
