import { BoxProps, GetByIndex } from "@angular-three/cannon";
import { NgtPhysicBox } from "@angular-three/cannon/bodies";
import { NgtEuler, NgtTriplet, NgtVector3 } from "@angular-three/core";
import { Component, Input, ViewChild } from "@angular/core";
import { Mesh } from "three";
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
            [scale]="scale" (ready)="ready($event)">
            <ngt-box-geometry></ngt-box-geometry>
            <ngt-mesh-lambert-material
                [parameters]="{ color: 'hotpink' }"
            ></ngt-mesh-lambert-material>
        </ngt-mesh>
    `
})
export class CubeComponent implements Inspect {
  @Input() position = [0, 0, 0] as NgtVector3;
  @Input() scale = 0.5 as NgtVector3;
  @Input() rotation = [0.4, 0.2, 0.5] as NgtEuler;
  @Input() name = 'cube';

  @ViewChild(NgtPhysicBox) physics!: NgtPhysicBox;

  private mesh?: Mesh;

  getCubeProps: GetByIndex<BoxProps> = () => ({
    mass: 1,
    position: this.position as NgtTriplet,
    rotation: this.rotation as NgtTriplet,
    args: [this.scale, this.scale, this.scale] as NgtTriplet,
    allowSleep: false,
    //sleepSpeedLimit: 0.1,
    //sleepTimeLimit: 0.1,
    //onCollideBegin: (e) => { console.warn('begin', e.body.name); },
    //onCollideEnd: (e) => { console.warn('end', e.body.name); },
  });

  ready(mesh: Mesh) {
    this.mesh = mesh;
    this.mesh.userData['inspect'] = <Inspect>this;
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
