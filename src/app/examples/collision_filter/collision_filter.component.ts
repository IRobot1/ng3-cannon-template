import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon";

@Component({
  selector:'collisionfilter-example',
  templateUrl: 'collision_filter-example.component.html',
  providers: [NgtPhysicBody],

})
export class CollisionFilterExample {
  filterMask = 2 | 4;


  cylinderProps = this.physicBody.useCylinder(() => ({
      mass: 1,
      position: [0, 0, -3] as NgtTriple,
      collisionFilterGroup: 4,
      collisionFilterMask: 1, // it can only collide with the sphere
      args: [0.5, 0.5]
  }));


  constructor(private physicBody: NgtPhysicBody) { }

}

@Component({
  templateUrl: './collision_filter.component.html',
})
export class CollisionFilterComponent {
}
