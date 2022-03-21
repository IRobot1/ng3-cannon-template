import { Component } from "@angular/core";

import { NgtTriplet } from "@angular-three/core";

import { BoxProps, CylinderProps, SphereProps } from "@angular-three/cannon";

@Component({
  templateUrl: './collisions.component.html'
})
export class CollisionsComponent {
  getSphere1Props(): SphereProps {
    return {
      mass: 1,
      position: [0, 0, 5] as NgtTriplet,
      velocity: [0, 0, -2] as NgtTriplet,
      args: [0.5]
    } as SphereProps;
  }
  getSphere2Props(): SphereProps {
    return {
      mass: 1,
      position: [0, 0, -3] as NgtTriplet,
      velocity: [0, 0, 2] as NgtTriplet,
      args: [0.5]
    } as SphereProps;
  }

  getBoxProps(): BoxProps {
    return {
      mass: 2,
      position: [-0.9, 0, 3] as NgtTriplet,
      velocity: [0, 0, -2] as NgtTriplet,
      args: [1, 1, 1]
    } as BoxProps;
  }
  getSphere3Props(): SphereProps {
    return {
      mass: 2,
      position: [-1, 0, -3] as NgtTriplet,
      velocity: [0, 0, 2] as NgtTriplet,
      args: [0.5]
    } as SphereProps;
  }

  getCylinderProps(): CylinderProps {
    return {
      mass: 3,
      position: [-1.9, 0, 3] as NgtTriplet,
      velocity: [0, 0, -2] as NgtTriplet,
      args: [0.5, 0.5]
    } as CylinderProps;
  }
  getSphere4Props(): SphereProps {
    return {
      mass: 3,
      position: [-2, 0, -3] as NgtTriplet,
      velocity: [0, 0, 2] as NgtTriplet,
      args: [0.5]
    } as SphereProps;
  }

}
