import { AfterViewInit, Component, ViewChild } from "@angular/core";

import { CubeComponent } from "../../components/storybook-cube.component";

@Component({
  templateUrl: './conditional.component.html',
})
export class ConditionalComponent implements AfterViewInit {
  @ViewChild(CubeComponent) cube!: CubeComponent;

  ngAfterViewInit(): void {
    let enabled = false;
    // toggle between enabling and disabling physics
    const timer = setInterval(() => {
      this.cube.enabled = enabled;
      this.cube.color = enabled ? 'red' : 'white';
      enabled = !enabled;
    }, 750)

    // stop when the cube is at rest
    this.cube.physics.api.position.subscribe(next => {
      if (next[1] < 0.5) {
        clearInterval(timer);
      }
    })
  }
}
