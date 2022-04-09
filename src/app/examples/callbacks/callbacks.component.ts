import { AfterViewInit, Component, ViewChild } from "@angular/core";

import { SphereProps } from "@angular-three/cannon";
import { NgtPhysicSphere } from "@angular-three/cannon/bodies";
import { Vector3 } from "three";

@Component({
  templateUrl: './callbacks.component.html'
})
export class CallbacksComponent implements AfterViewInit {
  @ViewChild('moon') moon!: NgtPhysicSphere;

  getMoonProps(): SphereProps {
    return {
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
    } as SphereProps;
  }

  getPlanetProps(): SphereProps {
    return {
      mass: 0,
      args: [3.5]
    } as SphereProps;
  }

  ngAfterViewInit(): void {
    this.moon.api.position.subscribe(position => {
      const moon = new Vector3(position[0], position[1], position[2]);
      const moon_to_planet = moon.negate();

      const distance = moon_to_planet.length()

      moon_to_planet.normalize()
      const force = moon_to_planet.multiplyScalar(1500 / Math.pow(distance, 2));

      this.moon.api.applyImpulse([force.x, force.y, force.z], [0, 0, 1]);
    })
  }

}
