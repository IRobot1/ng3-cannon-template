import { AfterViewInit, Component } from "@angular/core";

import { Color, SpotLight } from "three";

import { NgtTriple } from "@angular-three/core";
import { NgtSpotLight } from "@angular-three/core/lights";

import { CollideBeginEvent, CollideEndEvent, CollideEvent, NgtPhysicBody } from "@angular-three/cannon";

@Component({
  selector: 'trigger-example',
  templateUrl: './trigger-example.component.html',
  providers: [NgtPhysicBody],
})
export class TriggerExample implements AfterViewInit {
  showhelper = false;

  sphereProps = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    linearDamping: 0.5,
    angularDamping: 0.5,
    position: [0, 1, 7],
    collisionFilterGroup: 2,
  }));

  cubescale = [5, 2, 0.5] as NgtTriple;

  cubeProps = this.physicBody.useBox(() => ({
    isTrigger: true,
    mass: 1,
    args: this.cubescale,
    collisionFilterMask: 2,
    onCollide: (event: CollideEvent) => {
      console.log('The sphere collided the trigger!', event)
    },
    onCollideBegin: (event: CollideBeginEvent) => {
      console.log('The sphere entered the trigger!', event.body)
      this.spot.color = new Color(1, 0, 0);
      this.spot.intensity = 1;
    },
    onCollideEnd: (event: CollideEndEvent) => {
      const cleanup = this.sphereProps.api.position.subscribe(next => {
        console.log('The sphere exited the trigger at', next)
        cleanup();
      });
    },
    position: [0, 1, 0]
  }));

  constructor(
    private physicBody: NgtPhysicBody,
  ) { }

  ngAfterViewInit(): void {
    // give it a push at the top so it will roll
    this.sphereProps.api.applyImpulse([0, 0, -8], [0, 1, 0]);
  }

  spot!: SpotLight;
  off(spot: NgtSpotLight) {
    this.spot = spot.instance.value;
    this.spot.intensity = 0;
  }
}


@Component({
  templateUrl: './trigger.component.html',
})
export class TriggerComponent {
}
