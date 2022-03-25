import { AfterViewInit, Component, ViewChild } from "@angular/core";

import { BoxProps, SphereProps } from "@angular-three/cannon";

import { NgtPhysicSphere } from "@angular-three/cannon/bodies";

@Component({
  templateUrl: './trigger.component.html'
})
export class TriggerComponent implements AfterViewInit {
  @ViewChild(NgtPhysicSphere) sphere!: NgtPhysicSphere;

  getSphereProps(): SphereProps {
    return {
      mass: 1,
      args: [1],
      linearDamping: 0.5,
      angularDamping: 0.5,
    } as SphereProps;
  }


  getCubeProps(): BoxProps {
    return {
      isTrigger: true,
      args: [5, 2, 2],
      onCollide: (event) => {
        console.log('The sphere entered the trigger!', event)
      },
      onCollideBegin: (event) => {
        console.log('The sphere entered the trigger!', event.body)
      },
      onCollideEnd: (event) => {
        console.log('The sphere existed the trigger!', event.body)
      }
    } as BoxProps;
  }

  ngAfterViewInit(): void {
    // give it a push from the top
    this.sphere.api.applyImpulse([0, 0, -5], [0, 1, 0]);
  }
}
