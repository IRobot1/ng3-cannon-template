import { AfterViewInit, Component, NgZone } from "@angular/core";

import { Vector3 } from "three";
import { NgtComponentStore, tapEffect } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon";

@Component({
  selector: 'callbacks-example',
  template: `
        <ngt-mesh [ref]="moonProps.ref"
                  [receiveShadow]="true" [castShadow]="true">
          <ngt-sphere-geometry [args]="[0.5]"></ngt-sphere-geometry>
          <ngt-mesh-standard-material [parameters]="{ color: 'gray' | color }"></ngt-mesh-standard-material>
        </ngt-mesh>

        <ngt-mesh [ref]="planetProps.ref"
                  [receiveShadow]="true" [castShadow]="true">
          <ngt-sphere-geometry [args]="[3.5]"></ngt-sphere-geometry>
          <ngt-mesh-standard-material [parameters]="{ color: 'blue' | color }"></ngt-mesh-standard-material>
        </ngt-mesh>`,
  providers: [NgtPhysicBody],

})
export class CallbacksExample
  extends NgtComponentStore
  implements AfterViewInit {

  constructor(
    private zone: NgZone,
    private physicBody: NgtPhysicBody
  ) {
    super();
  }

  distance = 5;

  moonProps = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [0.5],
    linearDamping: 0,
    position: [0, 0, this.distance],
  }));

  planetProps = this.physicBody.useSphere(() => ({
    mass: 0,
    args: [3.5]
  }));

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.orbit();
    });
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
