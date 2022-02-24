import { BoxProps, GetByIndex } from "@angular-three/cannon";
import { NgtEuler, NgtTriplet, NgtVector3 } from "@angular-three/core";
import { Component, Input } from "@angular/core";
import { Group, Mesh } from "three";
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
  Pickup(controller: Group): void {
    //this.simulatephysics = false;
    if (this.mesh)
      controller.attach(this.mesh);
  }

  Drop(controller: Group): void {
    //this.simulatephysics = true;
    if (this.mesh) {
      controller.remove(this.mesh);

      // reposition to world space
      //this.mesh.position.copy(this.mesh.localToWorld(this.mesh.position));
    }
  }
}
