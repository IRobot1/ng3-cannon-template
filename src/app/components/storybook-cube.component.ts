import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";

import { NgtEuler, NgtTriplet, NgtVector3 } from "@angular-three/core";
import { NgtMesh } from "@angular-three/core/meshes";

import { BoxProps, GetByIndex } from "@angular-three/cannon";
import { NgtPhysicBox } from "@angular-three/cannon/bodies";

import { Inspect } from "../inspect";

@Component({
  selector: 'storybook-cube',
  template: `
        <ngt-mesh [name]="name"
            ngtPhysicBox
            [getPhysicProps]="getCubeProps"
            [receiveShadow]="true"
            [castShadow]="true"
            [position]="position"
            [rotation]="rotation"
            [scale]="scale">
            <ngt-box-geometry></ngt-box-geometry>
            <ngt-mesh-lambert-material [parameters]="{ color: color }"></ngt-mesh-lambert-material>
        </ngt-mesh>
    `
})
export class CubeComponent implements AfterViewInit, Inspect {
  @Input() position = [0, 0, 0] as NgtVector3;
  @Input() scale = [0.5, 0.5, 0.5] as NgtVector3;
  @Input() rotation = [0.4, 0.2, 0.5] as NgtEuler;
  @Input() name = 'cube';
  @Input() mass = 1;
  @Input() color = 'hotpink';
  @Input() type = 'Dynamic';

  @ViewChild(NgtMesh) mesh!: NgtMesh;
  @ViewChild(NgtPhysicBox) physics!: NgtPhysicBox;

  getCubeProps: GetByIndex<BoxProps> = () => ({
    mass: this.mass,
    position: this.position as NgtTriplet,
    rotation: this.rotation as NgtTriplet,
    args: this.scale as NgtTriplet,
    material: { friction: 0.1 },
  });

  ngAfterViewInit(): void {
    this.mesh.mesh.userData['physics'] = this.physics;
    this.mesh.mesh.userData['inspect'] = <Inspect>this;
  }
  Pickup(): void {
    console.warn('cube pickup');
    this.physics.api.mass.set(0);

  }

  Drop(): void {
    console.warn('cube drop');
    this.physics.api.mass.set(1);
  }
}
