import { NgtVector3 } from "@angular-three/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: 'storybook-plane',
  template: `
        <ngt-mesh
            ngtPhysicPlane
            [receiveShadow]="true"
            [position]="position"
            [rotation]="[-90 | radian, 0, 0]"
        >
            <ngt-plane-geometry [args]="[1000, 1000]"></ngt-plane-geometry>
            <ngt-shadow-material
                [parameters]="{
                    color: '#171717',
                    transparent: true,
                    opacity: 0.4
                }"
            ></ngt-shadow-material>
        </ngt-mesh>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PlaneComponent {
  @Input() position?: NgtVector3;
}
