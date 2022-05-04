import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicConstraint, NgtPhysicBodyReturn } from "@angular-three/cannon";


@Component({
  selector: 'constraints-example',
  templateUrl: './constraints-example.component.html',
  providers: [NgtPhysicBody, NgtPhysicConstraint],
})
export class ConstraintsExample {
  size = 0.5
  space = this.size * 0.1;

  lockcubes: Array<NgtPhysicBodyReturn> = [];
  lockscale = [1, 1, 1] as NgtTriple;
  leftstand!: NgtTriple;
  rightstand!: NgtTriple;

  leftbox = this.physicBody.useBox(() => ({
    mass: 0,
    position: this.leftstand
  }));

  rightbox = this.physicBody.useBox(() => ({
    mass: 0,
    position: this.rightstand
  }));

  private initlocks() {
    const N = 10
    let prevBody!: NgtPhysicBodyReturn;

    for (let i = 0; i < N; i++) {
      const position = [0, this.size * 6 + this.space, -(N - i - N / 2) * (this.size * 2 + 2 * this.space)] as NgtTriple;

      const body = this.physicBody.useBox(() => ({
        mass: 10,
        args: this.lockscale,
        position: position,
      }));

      if (prevBody) {
        this.physicConstraint.useLockConstraint(body.ref, prevBody.ref, {})
      }

      prevBody = body;

      this.lockcubes.push(body);
    }

    this.leftstand = [0, 0.5, -(-N / 2 + 1) * (this.size * 2 + 2 * this.space)] as NgtTriple;
    this.rightstand = [0, 0.5, -(N / 2) * (this.size * 2 + this.space * 2)] as NgtTriple;
  }

  linkcubes: Array<NgtPhysicBodyReturn> = [];
  linkscale = [0.1, 1, 1] as NgtTriple;

  private initlinks() {
    const N = 10
    let prevBody!: NgtPhysicBodyReturn;

    for (let i = 0; i < N; i++) {
      const position = [-3, 1 + (N - i) * (this.size * 2 + this.space * 2) + this.size * 2 + this.space, 0] as NgtTriple;

      const body = this.physicBody.useBox(() => ({
        mass: i == 0 ? 0 : 0.1,
        args: this.linkscale,
        position: position,
      }));

      this.linkcubes.push(body);

      if (prevBody) {
        this.physicConstraint.usePointToPointConstraint(
          body.ref, prevBody.ref,
          {
            pivotA: [this.size, this.size + this.space, 0],
            pivotB: [this.size, -this.size - this.space, 0],
          }
        );

        this.physicConstraint.usePointToPointConstraint(
          body.ref, prevBody.ref,
          {
            pivotA: [-this.size, this.size + this.space, 0],
            pivotB: [-this.size, -this.size - this.space, 0],
          }
        );
      }
      prevBody = body;
    }

    const first = this.linkcubes[0];
    let x = -3;
    let factor = 0.02;
    setInterval(() => {
      first.api.position.set(x, N + 1, 0);
      if (x > 8) {
        factor = -factor;
      } else if (x < -8) {
        factor = -factor;
      }
      x += factor;
    }, 1000 / 60)
  }

  pendulumsize = 0.8;

  pentopposition!: NgtTriple;
  penbottomposition!: NgtTriple;

  pendulumtop = this.physicBody.useSphere(() => ({
    mass: 0,
    position: this.pentopposition,
    args: [this.pendulumsize],
  }));

  pendulumbottom = this.physicBody.useSphere(() => ({
    mass: 1,
    position: this.penbottomposition,
    velocity: [0, 0, -5],
    linearDamping: 0,
    angularDamping: 0,
    args: [this.pendulumsize],
  }));

  private initpendulum() {
    this.pentopposition = [5, this.pendulumsize * 10, 5]
    this.penbottomposition = [5, this.pendulumsize * 2, 5]

    this.physicConstraint.usePointToPointConstraint(this.pendulumtop.ref, this.pendulumbottom.ref, {
      pivotA: [0, 0, 0],
      pivotB: [0, this.pendulumsize * 6, 0],
    })
  }



  chainlinksize = 0.5;
  chainspheres: Array<NgtPhysicBodyReturn> = [];

  private initchain() {
    const distance = this.chainlinksize * 2 + 0.12
    const N = 10

    let prevBody!: NgtPhysicBodyReturn;

    for (let i = 0; i < N; i++) {
      const position = [5, distance * (N - i), -5] as NgtTriple;

      const body = this.physicBody.useSphere(() => ({
        mass: i == 0 ? 0 : 0.1,
        args: [this.chainlinksize],
        position: position,
        velocity: [0, 0, -i],
      }));

      this.chainspheres.push(body);

      if (prevBody) {
        this.physicConstraint.useDistanceConstraint(
          body.ref, prevBody.ref, { distance }
        );
      }
      prevBody = body;
    }
  }


  cloth: Array<NgtPhysicBodyReturn> = [];

  initcloth() {
    const distance = 0.4
    const mass = 0.5
    const rows = 15
    const cols = 15

    const bodies: any = {}; // bodies['i j'] => particle
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const position = [5, distance * j + 3, -distance * i - 10] as NgtTriple;

        // Create a new body
        const body = this.physicBody.useParticle(() => ({
          mass: j == rows - 1 ? 0 : mass,
          args: [0.15],
          position: position,
          velocity: [(Math.sin(i * 0.1) + Math.sin(j * 0.1)) * 3, 0, 0]
        }));
        bodies[`${i} ${j}`] = body;
      }
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (i < cols - 1) {
          this.physicConstraint.useDistanceConstraint(bodies[`${i} ${j}`].ref, bodies[`${i + 1} ${j}`].ref, { distance })
        }
        if (j < rows - 1) {
          this.physicConstraint.useDistanceConstraint(bodies[`${i} ${j}`].ref, bodies[`${i} ${j + 1}`].ref, { distance })
        }
      }
    }

    // convert to array for final rendering
    for (const key in bodies) {
      this.cloth.push(bodies[key]);
    }
  }

  constructor(
    private physicBody: NgtPhysicBody,
    private physicConstraint: NgtPhysicConstraint,
  ) {
    this.initlocks();
    this.initlinks();
    this.initpendulum();
    this.initchain();
    this.initcloth();
  }
}

@Component({
  templateUrl: './constraints.component.html',
})
export class ConstraintsComponent {
}
