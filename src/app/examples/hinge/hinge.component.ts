import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";


@Component({
  templateUrl: './hinge.component.html',
  providers: [NgtPhysicBody],
})
export class HingeComponent {
  size = 5;

  scale = [this.size * 0.1, this.size * 0.5, this.size * 0.5] as NgtTriple;

  options: Record<string, any> = {
    pivotA: [0, -1.5, 0],
    axisA: [0, 0, -1],
    pivotB: [0, 1.5, 0],
    axisB: [0, 0, -1],
  }

  staticProps = this.physicBody.useBox(() => ({
    mass: 0,
    args: this.scale,
  }));

  hingeProps = this.physicBody.useBox(() => ({
    mass: 1,
    args: this.scale,
    angularDamping: 0.1
  }));

  constructor(private physicBody: NgtPhysicBody) { }
}
