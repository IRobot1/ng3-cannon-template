import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtVector3 } from "@angular-three/core";
import { NgtPhysicBody, NgtPhysicBodyReturn } from "@angular-three/cannon/bodies";

class Link {
  constructor(public position: NgtTriple, public props: NgtPhysicBodyReturn) { }
}

@Component({
  selector:'constraints-example',
  templateUrl: './constraints-example.component.html',
  providers: [NgtPhysicBody],
})
export class ConstraintsExample {
  size = 0.5
  space = this.size * 0.1;

  lockcubes: Array<NgtVector3> = [];
  lockscale = [1, 1, 1] as NgtTriple;
  leftstand!: NgtTriple;
  rightstand!: NgtTriple;

  linkcubes: Array<Link> = [];
  linkscale = [0.1, 1, 1] as NgtTriple;
  linkoptions: Record<string, any> = {
  }

  boxProps = this.physicBody.useBox(() => ({
    mass: 0,
  }));

  lockProps = this.physicBody.useBox(() => ({
    mass: 1,
    args: this.lockscale
  }));

  // First body is now static. The rest should be dynamic.
  firstLinkProps = this.physicBody.useBox(() => ({
    args: this.linkscale,
  }));

  linkProps = this.physicBody.useBox(() => ({
    mass: 0,
    args: this.linkscale,
    linearDamping: 0.1,
    angularDamping: 0.1
  }));

  constructor(private physicBody: NgtPhysicBody) {
    this.initlocks();
    this.initlinks();
  }

  private initlocks() {
    const N = 10
    for (let i = 0; i < N; i++) {
      const position = [0, this.size * 6 + this.space, -(N - i - N / 2) * (this.size * 2 + 2 * this.space)] as NgtTriple;
      this.lockcubes.push(position);
    }

    this.leftstand = [0, 0.5, -(-N / 2 + 1) * (this.size * 2 + 2 * this.space)] as NgtTriple;
    this.rightstand = [0, 0.5, -(N / 2) * (this.size * 2 + this.space * 2)] as NgtTriple;
  }

  private initlinks() {
    const N = 5
    for (let i = 0; i < N; i++) {
      const position = [-3, (N - i) * (this.size * 2 + this.space * 2) + this.size * 2 + this.space, 0] as NgtTriple;
      this.linkcubes.push(new Link(position, i == 0 ? this.firstLinkProps : this.linkProps));

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

@Component({
  templateUrl: './constraints.component.html',
})
export class ConstraintsComponent {
}
