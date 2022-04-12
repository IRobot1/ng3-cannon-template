import { Component } from "@angular/core";

import { NgtTriplet } from "@angular-three/core";

import { GetByIndex, SphereProps } from "@angular-three/cannon";

class Link {
  constructor(public position: NgtTriplet, public props: GetByIndex<SphereProps>) { }
}

@Component({
  templateUrl: './tear.component.html'
})
export class TearComponent {
  size = 0.45;
  mass = 1;

  iterations = 15;
  distance = this.size * 2 + 0.12;

  linkspheres: Array<Link> = [];
  constraints = []

  constructor() {
    //let lastBody
    for (let i = 0; i < this.iterations; i++) {
      const position = [0, (this.iterations - i) * this.distance - 9, 0] as NgtTriplet;
      this.linkspheres.push(new Link(position, i == 0 ? this.getFirstLinkProps : this.getLinkProps));

      // Connect this body to the last one added
      // ** not supported by @angluar-three/cannon yet
      //if (lastBody) {
      //  const constraint = new CANNON.DistanceConstraint(sphereBody, lastBody, distance)
      //  world.addConstraint(constraint)
      //  constraints.push(constraint)
      //}

      //// Keep track of the last added body
      //lastBody = sphereBody
    }
  }

  // First body is static (mass = 0) to support the other bodies
  getFirstLinkProps: GetByIndex<SphereProps> = (index: number) => (
    {
      mass: 0,
      args: [this.size]
    }
  )
  getLinkProps: GetByIndex<SphereProps> = (index: number) => (
    {
      mass: 0,
      args: [this.size]
    }
  )
  getThrowBallProps: GetByIndex<SphereProps> = (index: number) => (
    {
      mass: 2,
      args: [this.size],
      velocity: [0, 0, -20]
    }
  )
}
