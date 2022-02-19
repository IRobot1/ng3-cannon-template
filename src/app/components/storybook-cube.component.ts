import { BoxProps, GetByIndex } from "@angular-three/cannon";
import { NgtEuler, NgtTriplet, NgtVector3 } from "@angular-three/core";
import { Component, Input } from "@angular/core";

@Component({
  selector: 'storybook-cube',
  template: `
        <ngt-mesh
            ngtPhysicBox
            [getPhysicProps]="getCubeProps"
            [receiveShadow]="true"
            [castShadow]="true"
            [position]="position"
            [rotation]="rotation"
        >
            <ngt-box-geometry></ngt-box-geometry>
            <ngt-mesh-lambert-material
                [parameters]="{ color: 'hotpink' }"
            ></ngt-mesh-lambert-material>
        </ngt-mesh>
    `
})
export class CubeComponent {
  @Input() position?: NgtVector3;
  rotation = [0.4, 0.2, 0.5] as NgtEuler;

  getCubeProps: GetByIndex<BoxProps> = () => ({
    mass: 1,
    position: this.position as NgtTriplet,
    rotation: this.rotation as NgtTriplet,
  });
}
