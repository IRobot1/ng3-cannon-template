import { AfterViewInit, Component, ViewChild } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicSpring } from "@angular-three/cannon";

import { PhysicsSphereDirective } from "../../directives/physics-sphere.directive";
import { PhysicsBoxDirective } from "../../directives/physics-box.directive";

@Component({
  selector: 'spring-example',
  templateUrl: './spring-example.component.html',
  providers: [NgtPhysicSpring],
})
export class SpringExample implements AfterViewInit {
  @ViewChild('sphere') sphere!: PhysicsSphereDirective;
  @ViewChild('box') box!: PhysicsBoxDirective;

  size = 1;
  boxsize = [this.size * 0.3, this.size, this.size] as NgtTriple;

  constructor(
    private physicSpring: NgtPhysicSpring,
  ) { }

  ngAfterViewInit(): void {
    this.physicSpring.useSpring(this.sphere.body.ref, this.box.body.ref,
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
