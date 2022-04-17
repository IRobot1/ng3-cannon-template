import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  templateUrl: './collision_filter.component.html',
  providers: [NgtPhysicBody],

})
export class CollisionFilterComponent {

  sphereProps = this.physicBody.useSphere(() => ({
      mass: 1,
      position: [0, 0, 3] as NgtTriple,
      velocity: [0, 0, -2] as NgtTriple,
      collisionFilterGroup: 1,
      collisionFilterMask: 2 | 4, // it can only collide with group 2 and 3
      args: [0.5]
  }));  

  boxProps = this.physicBody.useBox(() => ({
      mass: 1,
      position: [0, 0, 0] as NgtTriple,
      collisionFilterGroup: 2,
      collisionFilterMask: 1, // it can only collide with the sphere
      args: [1, 1, 1]
  }));

  cylinderProps = this.physicBody.useCylinder(() => ({
      mass: 1,
      position: [0, 0, -3] as NgtTriple,
      collisionFilterGroup: 4,
      collisionFilterMask: 1, // it can only collide with the sphere
      args: [0.5, 0.5]
  }));


  constructor(private physicBody: NgtPhysicBody) { }

}
