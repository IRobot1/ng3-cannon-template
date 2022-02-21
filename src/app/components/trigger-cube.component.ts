import { BoxProps, GetByIndex } from "@angular-three/cannon";
import { NgtTriplet, NgtVector3 } from "@angular-three/core";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'trigger-cube',
  template: `
        <ngt-mesh [name]="name"
            ngtPhysicBox
            [getPhysicProps]="getCubeProps"
            [position]="position"
            [scale]="scale">
            <ngt-box-geometry></ngt-box-geometry>
            <ngt-mesh-standard-material
                [parameters]="{ wireframe: true, color: 'red' }"
            ></ngt-mesh-standard-material>
        </ngt-mesh>
    `
})
export class TriggerCubeComponent {
  @Input() position?: NgtVector3;
  @Input() name = 'triggercube';
  scale = [0.5, 5, 2] as NgtVector3;

  @Output() trigger = new EventEmitter<string>();

  getCubeProps: GetByIndex<BoxProps> = () => ({
    isTrigger: true,
    scale: this.scale,
    onCollideBegin: (e) => {
      const message = 'volume triggered by ' + e.body.name;
      console.log(message);
      this.trigger.emit(message);
    },
    args: this.scale as NgtTriplet  // this is required for box geometry
  });


}
