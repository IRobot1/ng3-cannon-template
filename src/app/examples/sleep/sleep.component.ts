import { AfterViewInit, Component, ViewChild } from "@angular/core";

import { PhysicsSphereDirective } from "../../directives/physics-sphere.directive";

@Component({
  selector: 'sleep-example',
  templateUrl: './sleep-example.component.html',
})
export class SleepExample implements AfterViewInit {
  @ViewChild('sleeper') sleeper!: PhysicsSphereDirective;
  @ViewChild('impulse') impulse!: PhysicsSphereDirective;

  sleepCollide(event: any) {
    if (event.body.name != 'plane')
      console.log(event.body.name + ' collide with', event.target.name)
  }


  ngAfterViewInit(): void {
    this.sleeper.body.api.sleep();
    this.impulse.body.api.applyImpulse([0, 0, 2], [0, 0, 0]);
  }
}

@Component({
  templateUrl: './sleep.component.html',
})
export class SleepComponent {
}
