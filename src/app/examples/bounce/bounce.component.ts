import { Component } from "@angular/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";
import { NgtTriple } from "@angular-three/core";

@Component({
  templateUrl: './bounce.component.html',
  providers: [NgtPhysicBody],
})
export class BounceComponent {

  sphere1Props = this.physicBody.useSphere(() => ({
    mass: 1,
    position: [-3, 5, 3] as NgtTriple,
    material: { restitution: 0.4 },
  }));

  sphere2Props = this.physicBody.useSphere(() => ({
    mass: 1,
    position: [-3, 5, 0] as NgtTriple,
    material: { restitution: 0.6 },
  }));

  sphere3Props = this.physicBody.useSphere(() => ({
    mass: 1,
    position: [-3, 5, -3] as NgtTriple,
    material: { restitution: 0.8 },
  }));

  constructor(private physicBody: NgtPhysicBody) { }
}
