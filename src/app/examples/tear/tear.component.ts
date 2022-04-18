import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicBodyReturn } from "@angular-three/cannon/bodies";

class Link {
  constructor(public position: NgtTriple, public props: NgtPhysicBodyReturn) { }
}

@Component({
  selector: 'tear-example',
  templateUrl: './tear-example.component.html',
  providers: [NgtPhysicBody],
})
export class TearExample {
  size = 0.45;
  mass = 1;

  iterations = 15;
  distance = this.size * 2 + 0.12;

  linkspheres: Array<Link> = [];
  constraints = []

  constructor(private physicBody: NgtPhysicBody) {
    //let lastBody
    for (let i = 0; i < this.iterations; i++) {
      const position = [0, (this.iterations - i) * this.distance - 9, 0] as NgtTriple;

  // First body is static (mass = 0) to support the other bodies
      const body = this.physicBody.useSphere(() => ({
        mass: 0,//i == 0 ? 0 : 1,
        args: [this.size],
        position: position,
      }));

      this.linkspheres.push(new Link(position, body));

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

  throwBallProps = this.physicBody.useSphere(() => ({
    mass: 2,
    args: [this.size],
    position: [0, 3, 20],
    velocity: [0, 0, -20],
  }));
}

@Component({
  templateUrl: './tear.component.html',
})
export class TearComponent {
  iterations = 15;
}
