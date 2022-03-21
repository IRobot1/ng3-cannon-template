import { Component } from "@angular/core";

import { NgtTriplet } from "@angular-three/core";

import { BoxProps, CylinderProps, SphereProps } from "@angular-three/cannon";

@Component({
  templateUrl: './collision-filter.component.html'
})
export class CollisionFilterComponent {
  getSphereProps(): SphereProps {
    return {
      mass: 1,
      position: [0, 0, 3] as NgtTriplet,
      velocity: [0, 0, -2] as NgtTriplet,
      collisionFilterGroup: 1,
      collisionFilterMask: 2 | 4, // it can only collide with group 2 and 3
      args: [0.5]
    } as SphereProps;
  }

  getBoxProps(): BoxProps {
    return {
      mass: 1,
      position: [0, 0, 0] as NgtTriplet,
      collisionFilterGroup: 2,
      collisionFilterMask: 1, // it can only collide with the sphere
      args: [1, 1, 1]
    } as BoxProps;
  }

  getCylinderProps(): CylinderProps {
    return {
      mass: 1,
      position: [0, 0, -3] as NgtTriplet,
      collisionFilterGroup: 4,
      collisionFilterMask: 1, // it can only collide with the sphere
      args: [0.5, 0.5]
    } as CylinderProps;
  }
}
