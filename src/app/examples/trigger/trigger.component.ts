import { AfterViewInit, Component } from "@angular/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  selector: 'trigger-example',
  templateUrl: './trigger-example.component.html',
  providers: [NgtPhysicBody],
})
export class TriggerExample implements AfterViewInit {

  sphereProps = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    linearDamping: 0.5,
    angularDamping: 0.5,
    position: [0, 0, 3],
  }));


  cubeProps = this.physicBody.useBox(() => ({
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
  }));

  constructor(private physicBody: NgtPhysicBody) { }

  ngAfterViewInit(): void {
    // give it a push from the top
    this.sphereProps.api.applyImpulse([0, 0, -5], [0, 1, 0]);
  }
}


@Component({
  templateUrl: './trigger.component.html',
})
export class TriggerComponent {
}
