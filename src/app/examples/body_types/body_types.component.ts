import { AfterViewInit, Component, OnDestroy, ViewChild } from "@angular/core";

import { PhysicsBoxDirective } from "../../directives/physics-box.directive";

@Component({
  selector: 'bodytypes-example',
  templateUrl: './body_types-example.component.html',
})
export class BodyTypesExample implements AfterViewInit, OnDestroy {
  @ViewChild('box') box!: PhysicsBoxDirective;

  spheresize = 0.5;

  private timer!: any;

  ngAfterViewInit(): void {
    let speed = 4;
    this.timer = setInterval(() => {
      this.box.body.api.velocity.set(0, speed, 0);
      speed = -speed;
    }, 500)
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}

@Component({
  templateUrl: './body_types.component.html',
})
export class BodyTypesComponent {
}
