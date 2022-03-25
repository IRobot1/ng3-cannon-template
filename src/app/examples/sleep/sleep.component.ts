import { AfterViewInit, Component, ViewChild } from "@angular/core";

import { NgtTriplet } from "@angular-three/core";

import { SphereProps } from "@angular-three/cannon";
import { NgtPhysicSphere } from "@angular-three/cannon/bodies";

@Component({
  templateUrl: './sleep.component.html'
})
export class SleepComponent implements AfterViewInit {
  @ViewChild('sleeper') sleeper!: NgtPhysicSphere;
  @ViewChild('impulse') impulse!: NgtPhysicSphere;

  getSphere1Props(): SphereProps {
    return {
      mass: 1,
      position: [0, 2, 0] as NgtTriplet,
      args: [1],
      sleepSpeedLimit: 0.1,
      sleepTimeLimit: 1,
      // missing sleepy and sleep events
    } as SphereProps;
  }


  getSphereWakerProps(): SphereProps {
    return {
      mass: 1,
      args: [1],
      position: [-3, 1, 0] as NgtTriplet,
      velocity: [0, 0, 1],
    } as SphereProps;
  }

  getSphereSleeper1Props(): SphereProps {
    return {
      mass: 1,
      args: [1],
      position: [-3, 1, 4] as NgtTriplet,
      onCollide: (event) => {
        if (event.body.name != 'plane')
          console.log(event.body.name + ' collide with', event.target.name)
      }
      // missing wakup event
    } as SphereProps;
  }

  getSphereImpulseProps(): SphereProps {
    return {
      mass: 1,
      args: [1],
      position: [-6, 1, 0] as NgtTriplet,
    } as SphereProps;
  }

  getSphereSleeper2Props(): SphereProps {
    return {
      mass: 1,
      args: [1],
      position: [-6, 1, 4] as NgtTriplet,
      onCollide: (event) => {
        if (event.body.name != 'plane')
          console.log(event.body.name + ' collide with', event.target.name)
      }
      // missing wakup event
    } as SphereProps;
  }

  ngAfterViewInit(): void {
    this.sleeper.api.sleep();
    this.impulse.api.applyImpulse([0, 0, 2], [0, 0, 0]);
  }
}
