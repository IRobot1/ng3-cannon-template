import { Component } from "@angular/core";

import { NgtRadianPipe, NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";


@Component({
  selector: 'hinge-example',
  templateUrl: 'hinge-example.component.html',
  providers: [NgtPhysicBody],
})
export class HingeExample {
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
    position: [0, this.size, 0],
  }));

  hingeProps = this.physicBody.useBox(() => ({
    mass: 1,
    args: this.scale,
    angularDamping: 0.1,
    position: [0, this.size / 2 - 1, 0],
    rotation: [0, 0, new NgtRadianPipe().transform(20)]
  }));

  constructor(private physicBody: NgtPhysicBody) { }
}

@Component({
  templateUrl: './hinge.component.html',
})
export class HingeComponent {
}
