import { BoxProps, GetByIndex } from "@angular-three/cannon";
import { NgtEuler, NgtTriplet, NgtVector3 } from "@angular-three/core";
import { Component, Input } from "@angular/core";

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
            <ngt-mesh-lambert-material
                [parameters]="{ color: 'hotpink' }"
            ></ngt-mesh-lambert-material>
        </ngt-mesh>
    `
})
export class CubeComponent {
  @Input() position = [0, 0, 0] as NgtVector3;
  @Input() scale = 0.5 as NgtVector3;
  @Input() rotation = [0.4, 0.2, 0.5] as NgtEuler;
  @Input() name = 'cube';


  getCubeProps: GetByIndex<BoxProps> = () => ({
    mass: 1,
    position: this.position as NgtTriplet,
    rotation: this.rotation as NgtTriplet,
    args: [this.scale, this.scale, this.scale] as NgtTriplet,
    //allowSleep: true,
    //sleepSpeedLimit: 0.1,
    //sleepTimeLimit: 0.1,
    //onCollideBegin: (e) => { console.warn('begin', e.body.name); },
    //onCollideEnd: (e) => { console.warn('end', e.body.name); },
  });
}
