import { Component } from "@angular/core";


@Component({
  selector: 'fixedrotation-example',
  template: `
        <ngt-mesh physicsBox boxMass="1" [position]="[0, 1, 0]" castShadow>
          <ngt-box-geometry></ngt-box-geometry>
          <ngt-mesh-standard-material color='red'></ngt-mesh-standard-material>
        </ngt-mesh>

        <ngt-mesh physicsBox boxMass="1" [position]="[0, 4, 0.5]" boxFixedRotation="true" castShadow>
          <ngt-box-geometry></ngt-box-geometry>
          <ngt-mesh-standard-material color='blue'></ngt-mesh-standard-material>
        </ngt-mesh>`,
})
export class FixedRotationExample {
}

@Component({
  templateUrl: './fixed_rotation.component.html',
})
export class FixedRotationComponent {
}
