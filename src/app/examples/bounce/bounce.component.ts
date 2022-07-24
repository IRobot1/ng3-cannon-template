import { Component } from "@angular/core";

import { NgtPhysicBody } from "@angular-three/cannon";
import { NgtTriple } from "@angular-three/core";

@Component({
  selector: 'bounce-example',
  template: `
        <ngt-mesh [ref]="sphere1Props.ref" [castShadow]="true">
          <ngt-sphere-geometry></ngt-sphere-geometry>
          <ngt-mesh-standard-material color="red"></ngt-mesh-standard-material>
        </ngt-mesh>

        <ngt-mesh [ref]="sphere2Props.ref" [castShadow]="true">
          <ngt-sphere-geometry></ngt-sphere-geometry>
          <ngt-mesh-standard-material color="white"></ngt-mesh-standard-material>
        </ngt-mesh>

        <ngt-mesh [ref]="sphere3Props.ref" [castShadow]="true">
          <ngt-sphere-geometry></ngt-sphere-geometry>
          <ngt-mesh-standard-material color="blue"></ngt-mesh-standard-material>
        </ngt-mesh>`,
  providers: [NgtPhysicBody],
})
export class BounceExample {

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


@Component({
  templateUrl: './bounce.component.html',
})
export class BounceComponent {
}
