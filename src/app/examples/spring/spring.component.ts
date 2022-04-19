import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicSpring } from "@angular-three/cannon";

@Component({
  selector: 'spring-example',
  templateUrl: './spring-example.component.html',
  providers: [NgtPhysicBody, NgtPhysicSpring],
})
export class SpringExample {
  size = 1;
  boxsize = [this.size * 0.3, this.size, this.size] as NgtTriple;

  sphereProps = this.physicBody.useSphere(() => ({
    mass: 0,
    args: [0.1],
  }));

  boxProps = this.physicBody.useBox(() => ({
    mass: 5,
    args: this.boxsize,
    position: [0, -this.size, 0]
  }));

  spring = this.physicSpring.useSpring(this.sphereProps.ref, this.boxProps.ref,
    {
      localAnchorA: [0, -this.size, 0],
      //  localAnchorB: [0, 0, 0],
      //  restLength: 0,
      //  stiffness: 50,
      //  damping: 1,
    }
  );

  constructor(
    private physicBody: NgtPhysicBody,
    private physicSpring: NgtPhysicSpring,
  ) {
  }

}

@Component({
  templateUrl: './spring.component.html',
})
export class SpringComponent {
}
