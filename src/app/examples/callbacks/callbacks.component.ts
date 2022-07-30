import { AfterViewInit, Component, NgZone } from "@angular/core";

import { Vector3 } from "three";
import { NgtComponentStore, tapEffect } from "@angular-three/core";

import { NgtPhysicBodyReturn } from "@angular-three/cannon";

import { PhysicsSphereDirective } from "../../directives/physics-sphere.directive";

@Component({
  selector: 'callbacks-example',
  templateUrl: 'callbacks-example.component.html',

})
export class CallbacksExample
  extends NgtComponentStore
  implements AfterViewInit {

  constructor(
    private zone: NgZone,
  ) {
    super();
  }

  distance = 5;

  moonProps!:  NgtPhysicBodyReturn<any>;

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.orbit();
    });
  }

  moonReady(moon: PhysicsSphereDirective) {
    this.moonProps = moon.body;
  }

  readonly orbit = this.effect<void>(
    tapEffect(() => {
      this.moonProps.api.velocity.set(this.distance, 0, 0); // give it a push

      const moon = new Vector3();

      // recalculate force on each change in position
      // position is updated every stepSize

      const unsubscribe = this.moonProps.api.position.subscribe(position => {
        moon.set(position[0], position[1], position[2]);

        const force = moon.negate().normalize().multiplyScalar(this.distance)

        this.moonProps.api.applyForce([force.x, force.y, force.z], [0, 0, 0]);
      })

      return () => {
        unsubscribe();
      };
    })
  );
}

@Component({
  templateUrl: './callbacks.component.html',
})
export class CallbacksComponent {
}
