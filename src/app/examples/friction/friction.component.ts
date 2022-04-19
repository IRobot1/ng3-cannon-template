import { Component } from "@angular/core";

import { NgtPhysicBody } from "@angular-three/cannon";


@Component({
  selector: 'friction-example',
  template: `
        <ngt-mesh [ref]="fixedBoxProps.ref" castShadow>
          <ngt-box-geometry></ngt-box-geometry>
          <ngt-mesh-standard-material color='red'></ngt-mesh-standard-material>
        </ngt-mesh>

        <ngt-mesh [ref]="slipperyBoxProps.ref" castShadow>
          <ngt-box-geometry></ngt-box-geometry>
          <ngt-mesh-standard-material color='blue'></ngt-mesh-standard-material>
        </ngt-mesh>`,
  providers: [NgtPhysicBody],
})
export class FrictionExample {

  fixedBoxProps = this.physicBody.useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    material: { friction: 1 },
    position: [0, 2, 1]
  }));

  slipperyBoxProps = this.physicBody.useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    material: { friction: 0.001 },
    velocity: [0, 0, -1],
    position: [0, 2, -1],
  }));

  constructor(private physicBody: NgtPhysicBody) { }
}

@Component({
  templateUrl: './friction.component.html',
})
export class FrictionComponent {
}
