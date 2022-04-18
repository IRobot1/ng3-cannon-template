import { Component } from "@angular/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";


@Component({
  selector: 'fixedrotation-example',
  template: `
        <ngt-mesh [ref]="box1Props.ref" castShadow>
          <ngt-box-geometry></ngt-box-geometry>
          <ngt-mesh-standard-material color='red'></ngt-mesh-standard-material>
        </ngt-mesh>

        <ngt-mesh [ref]="box2Props.ref" castShadow>
          <ngt-box-geometry></ngt-box-geometry>
          <ngt-mesh-standard-material color='blue'></ngt-mesh-standard-material>
        </ngt-mesh>`,
  providers: [NgtPhysicBody],
})
export class FixedRotationExample {
  box1Props = this.physicBody.useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    position: [0, 1, 0]
  }));

  box2Props = this.physicBody.useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    fixedRotation: true,
    position: [0, 4, 0.5]
  }));

  constructor(private physicBody: NgtPhysicBody) { }
}

@Component({
  templateUrl: './fixed_rotation.component.html',
})
export class FixedRotationComponent {
}
