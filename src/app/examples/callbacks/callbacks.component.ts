import { AfterViewInit, Component } from "@angular/core";

import { Vector3 } from "three";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  selector: 'callbacks-example',
  template: `
        <ngt-mesh [ref]="moonProps.ref"
                  [position]="[0, 0, 10]"
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
export class CallbacksExample implements AfterViewInit {
  constructor(private physicBody: NgtPhysicBody) { }

  moonProps = this.physicBody.useSphere(() => ({
      mass: 5,
      args: [0.5],
      linearDamping: 0,
      // ** missing preStep event https://github.com/nartc/angular-three/issues/73
      //onPreStep: (e: any) => {
      //  const moon_to_planet = new CANNON.Vec3()
      //  moon.position.negate(moon_to_planet)

      //  const distance = moon_to_planet.length()

      //  moon_to_planet.normalize()
      //  moon_to_planet.scale(1500 / Math.pow(distance, 2), moon.force)
      //}
  }));

  planetProps = this.physicBody.useSphere(() => ({
      mass: 0,
      args: [3.5]
  }));

  ngAfterViewInit(): void {
    this.moonProps.api.position.subscribe(position => {
      const moon = new Vector3(position[0], position[1], position[2]);
      const moon_to_planet = moon.negate();

      const distance = moon_to_planet.length()

      moon_to_planet.normalize()
      const force = moon_to_planet.multiplyScalar(1500 / Math.pow(distance, 2));

      this.moonProps.api.applyImpulse([force.x, force.y, force.z], [0, 0, 1]);
    })
  }

}

@Component({
  templateUrl: './callbacks.component.html',
})
export class CallbacksComponent {
}
