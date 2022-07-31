import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon";


@Component({
  selector:'collisions-example',
  templateUrl: 'collisions-example.component.html',
  providers: [NgtPhysicBody],
})
export class CollisionsExample {

  cylinderProps = this.physicBody.useCylinder(() => ({
      mass: 3,
      position: [-1.9, 0, 3] as NgtTriple,
      velocity: [0, 0, -2] as NgtTriple,
      args: [0.5, 0.5]
  }));



  constructor(private physicBody: NgtPhysicBody) { }
}

@Component({
  templateUrl: './collisions.component.html',
})
export class CollisionsComponent {
}
