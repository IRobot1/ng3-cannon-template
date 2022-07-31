import { AfterViewInit, Component, ViewChild } from "@angular/core";

import { Color, SpotLight } from "three";

import { CollideBeginEvent, CollideEndEvent, CollideEvent, NgtPhysicBody } from "@angular-three/cannon";
import { PhysicsSphereDirective } from "../../directives/physics-sphere.directive";

@Component({
  selector: 'trigger-example',
  templateUrl: './trigger-example.component.html',
  providers: [NgtPhysicBody],
})
export class TriggerExample implements AfterViewInit {
  @ViewChild('ball') ball!: PhysicsSphereDirective;

  showhelper = false;

  onCollide(event: CollideEvent) {
    console.log('The sphere collided the trigger!', event)
  }
  onCollideBegin(event: CollideBeginEvent) {
    console.log('The sphere entered the trigger!', event.body)
    this.spot.color = new Color(1, 0, 0);
    this.spot.intensity = 1;
  }
  onCollideEnd(event: CollideEndEvent) {
    const cleanup = this.ball.body.api.position.subscribe(next => {
      console.log('The sphere exited the trigger at', next)
      cleanup();
    });
  }

  ngAfterViewInit(): void {
    // give it a push at the top so it will roll
    this.ball.body.api.applyImpulse([0, 0, -8], [0, 1, 0]);
  }

  spot!: SpotLight;
  off(spot: SpotLight) {
    this.spot = spot;
    this.spot.intensity = 0;
  }
}


@Component({
  templateUrl: './trigger.component.html',
})
export class TriggerComponent {
}
