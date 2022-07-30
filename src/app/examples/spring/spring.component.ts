import { AfterViewInit, Component, ViewChild } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicSpring } from "@angular-three/cannon";
import { PhysicsSphereDirective } from "../../directives/physics-sphere.directive";

@Component({
  selector: 'spring-example',
  templateUrl: './spring-example.component.html',
  providers: [NgtPhysicBody, NgtPhysicSpring],
})
export class SpringExample implements AfterViewInit {
  @ViewChild('sphere') sphere!: PhysicsSphereDirective;

  size = 1;
  boxsize = [this.size * 0.3, this.size, this.size] as NgtTriple;

  boxProps = this.physicBody.useBox(() => ({
    mass: 5,
    args: this.boxsize,
    position: [0, -this.size, 0]
  }));


  constructor(
    private physicBody: NgtPhysicBody,
    private physicSpring: NgtPhysicSpring,
  ) { }

  ngAfterViewInit(): void {
    this.physicSpring.useSpring(this.sphere.body.ref, this.boxProps.ref,
      {
        localAnchorA: [0, -this.size, 0],
        //  localAnchorB: [0, 0, 0],
        //  restLength: 0,
        //  stiffness: 50,
        //  damping: 1,
      }
    );
  }

}

@Component({
  templateUrl: './spring.component.html',
})
export class SpringComponent {
}
