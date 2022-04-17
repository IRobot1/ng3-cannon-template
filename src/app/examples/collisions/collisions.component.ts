import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";


@Component({
  templateUrl: './collisions.component.html',
  providers: [NgtPhysicBody],
})
export class CollisionsComponent {
  sphere1Props = this.physicBody.useSphere(() => ({
      mass: 1,
      position: [0, 0, 5] as NgtTriple,
      velocity: [0, 0, -2] as NgtTriple,
      args: [0.5]
  }));

  sphere2Props = this.physicBody.useSphere(() => ({
      mass: 1,
      position: [0, 0, -3] as NgtTriple,
      velocity: [0, 0, 2] as NgtTriple,
      args: [0.5]
  }));

  boxProps = this.physicBody.useBox(() => ({
      mass: 2,
      position: [-0.9, 0, 3] as NgtTriple,
      velocity: [0, 0, -2] as NgtTriple,
      args: [1, 1, 1]
  }));
  sphere3Props = this.physicBody.useSphere(() => ({
    mass: 2,
    position: [-1, 0, -3] as NgtTriple,
    velocity: [0, 0, 2] as NgtTriple,
    args: [0.5]
  }));

  cylinderProps = this.physicBody.useCylinder(() => ({
      mass: 3,
      position: [-1.9, 0, 3] as NgtTriple,
      velocity: [0, 0, -2] as NgtTriple,
      args: [0.5, 0.5]
  }));
  sphere4Props = this.physicBody.useSphere(() => ({
      mass: 3,
      position: [-2, 0, -3] as NgtTriple,
      velocity: [0, 0, 2] as NgtTriple,
      args: [0.5]
  }));


  constructor(private physicBody: NgtPhysicBody) { }
}
