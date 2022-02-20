import { NgtVector3 } from "@angular-three/core";
import { Component, Input } from "@angular/core";

@Component({
  selector: 'storybook-plane',
  template: `
        <ngt-mesh [name]="name"
            ngtPhysicPlane
            [receiveShadow]="true"
            [position]="position"
            [rotation]="[-90 | radian, 0, 0]"
        >
            <ngt-plane-geometry [args]="[10, 10]"></ngt-plane-geometry>
            <ngt-mesh-standard-material
                [parameters]="{color: 'white'}"
            ></ngt-mesh-standard-material>
        </ngt-mesh>
    `
})

export class PlaneComponent {
  @Input() position?: NgtVector3;
  @Input() name = 'floor';
}
