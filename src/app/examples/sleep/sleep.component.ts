import { AfterViewInit, Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  selector:'sleep-example',
  templateUrl: './sleep-example.component.html',
  providers: [NgtPhysicBody],
})
export class SleepExample implements AfterViewInit {

  sphere1Props = this.physicBody.useSphere(() => ({
    mass: 1,
    position: [0, 2, 0] as NgtTriple,
    args: [1],
    sleepSpeedLimit: 0.1,
    sleepTimeLimit: 1,
    // missing sleepy and sleep events
  }));

  sphereWakerProps = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    position: [-3, 1, 0] as NgtTriple,
    velocity: [0, 0, 1],
  }));

  sleeper = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    position: [-3, 1, 4] as NgtTriple,
    onCollide: (event) => {
      if (event.body.name != 'plane')
        console.log(event.body.name + ' collide with', event.target.name)
    }
    // missing wakup event
  }));

  impulse = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    position: [-6, 1, 0] as NgtTriple,
  }));

  sphereSleeper2Props = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    position: [-6, 1, 4] as NgtTriple,
    onCollide: (event) => {
      if (event.body.name != 'plane')
        console.log(event.body.name + ' collide with', event.target.name)
    }
    // missing wakup event
  }));

  constructor(private physicBody: NgtPhysicBody) { }

  ngAfterViewInit(): void {
    this.sleeper.api.sleep();
    this.impulse.api.applyImpulse([0, 0, 2], [0, 0, 0]);
  }
}

@Component({
  templateUrl: './sleep.component.html',
})
export class SleepComponent  {
}
