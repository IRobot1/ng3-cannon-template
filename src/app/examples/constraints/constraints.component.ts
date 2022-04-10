import { Component } from "@angular/core";

import { NgtTriplet } from "@angular-three/core";

import { BoxProps, GetByIndex, SphereProps } from "@angular-three/cannon";
import { NgtVector3 } from "@angular-three/core";

class Link {
  constructor(public position: NgtTriplet, public props: GetByIndex<BoxProps>) { }
}

@Component({
  templateUrl: './constraints.component.html'
})
export class ConstraintsComponent {
  size = 0.5
  space = this.size * 0.1;

  lockcubes: Array<NgtVector3> = [];
  lockscale = [1, 1, 1] as NgtTriplet;
  leftstand!: NgtTriplet;
  rightstand!: NgtTriplet;

  linkcubes: Array<Link> = [];
  linkscale = [0.1, 1, 1] as NgtTriplet;
  linkoptions: Record<string, any> = {
  }

  getLockProps: GetByIndex<BoxProps> = (index: number) => (
    {
      mass: 1,
      args: this.lockscale
    }
  )

  // First body is now static. The rest should be dynamic.
  getFirstLinkProps: GetByIndex<BoxProps> = (index: number) => (
    {
      args: this.linkscale,
    }
  )

  getLinkProps: GetByIndex<BoxProps> = (index: number) => (
    {
      mass: 0,
      args: this.linkscale,
      linearDamping: 0.1,
      angularDamping: 0.1
    }
  )

  constructor() {
    this.initlocks();
    this.initlinks();
  }

  private initlocks() {
    const N = 10
    for (let i = 0; i < N; i++) {
      const position = [0, this.size * 6 + this.space, -(N - i - N / 2) * (this.size * 2 + 2 * this.space)] as NgtTriplet;
      this.lockcubes.push(position);
    }

    this.leftstand = [0, 0.5, -(-N / 2 + 1) * (this.size * 2 + 2 * this.space)] as NgtTriplet;
    this.rightstand = [0, 0.5, -(N / 2) * (this.size * 2 + this.space * 2)] as NgtTriplet;
  }

  private initlinks() {
    const N = 5
    for (let i = 0; i < N; i++) {
      const position = [-3, (N - i) * (this.size * 2 + this.space * 2) + this.size * 2 + this.space, 0] as NgtTriplet;
      this.linkcubes.push(new Link(position, i == 0 ? this.getFirstLinkProps : this.getLinkProps));

      if (i != 0) {
        // Connect the current body to the last one
        // We connect two corner points to each other.
        //const pointConstraint1 = new CANNON.PointToPointConstraint(
        //  boxBody,
        //  new CANNON.Vec3(size, size + space, 0),
        //  previous,
        //  new CANNON.Vec3(size, -size - space, 0)
        //)
        //const pointConstraint2 = new CANNON.PointToPointConstraint(
        //  boxBody,
        //  new CANNON.Vec3(-size, size + space, 0),
        //  previous,
        //  new CANNON.Vec3(-size, -size - space, 0)
        //)

      }
    }
  }
}
