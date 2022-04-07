import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";

import { NgtEuler, NgtTriplet } from "@angular-three/core";
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
  private _position = [0, 0, 0] as NgtTriplet;
  @Input()
  get position(): NgtTriplet {
    return this._position;
  }
  set position(newvalue: NgtTriplet) {
    this.physics?.api.position.set(newvalue[0], newvalue[1], newvalue[2]);
    this._position = newvalue;
  }
  @Input() scale = [0.5, 0.5, 0.5] as NgtTriplet;
  @Input() rotation = [0.4, 0.2, 0.5] as NgtEuler;
  @Input() name = 'cube';
  @Input() mass = 1;
  @Input() color = 'hotpink';
  @Input() type = 'Dynamic';

  @Input() set enabled(newvalue: boolean) {
    if (newvalue)
      this.physics.api.wakeUp();
    else
      this.physics.api.sleep();
  }

  @ViewChild(NgtMesh) mesh!: NgtMesh;
  @ViewChild(NgtPhysicBox) physics!: NgtPhysicBox;

  getCubeProps: GetByIndex<BoxProps> = () => ({
    mass: this.mass,
    position: this.position,
    rotation: this.rotation as NgtTriplet,
    args: this.scale,
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
