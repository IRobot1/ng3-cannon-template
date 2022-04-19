import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicBodyReturn, NgtPhysicConstraintReturn } from "@angular-three/cannon";
import { NgtPhysicConstraint } from "@angular-three/cannon";

class Link {
  constructor(public position: NgtTriple, public props: NgtPhysicBodyReturn) { }
}

@Component({
  selector: 'tear-example',
  templateUrl: './tear-example.component.html',
  providers: [NgtPhysicBody, NgtPhysicConstraint],
})
export class TearExample {
  size = 0.45;
  mass = 1;

  iterations = 15;
  distance = this.size * 2 + 0.12;

  linkspheres: Array<Link> = [];
  constraints: Array<NgtPhysicConstraintReturn<'Distance'>> = []

  private timer!: any;

  constructor(
    private physicBody: NgtPhysicBody,
    private physicConstraint: NgtPhysicConstraint,
  ) {
    let lastBody!: NgtPhysicBodyReturn;

    for (let i = 0; i < this.iterations; i++) {
      const position = [0, (this.iterations - i) * this.distance - 9, 0] as NgtTriple;

      // First body is static (mass = 0) to support the other bodies
      const body = this.physicBody.useSphere(() => ({
        mass: i == 0 ? 0 : 1,
        args: [this.size],
        position: position,
      }));

      this.linkspheres.push(new Link(position, body));

      if (lastBody) {
        const constraint = this.physicConstraint.useDistanceConstraint(body.ref, lastBody.ref, { distance: this.distance })
        this.constraints.push(constraint);
      }

      lastBody = body
    }

    //this.timer = setInterval(() => {
    //  this.constraints.forEach(c => {
    //    const multiplier = Math.abs( equations[0].multiplier)
    //    if (multiplier > 1000) {
    //      world.removeConstraint(constraints[i])
    //    }
    //  })
    //}, 100)
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
