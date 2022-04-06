import { BoxProps, GetByIndex } from "@angular-three/cannon";
import { NgtPhysicBox } from "@angular-three/cannon/bodies";
import { CollideBeginEvent, CollideEndEvent } from "@angular-three/cannon/lib/models/events";
import { NgtEuler, NgtTriplet, NgtVector3 } from "@angular-three/core";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MeshStandardMaterialParameters, Object3D, } from "three";

class Overlapping {
  subscription?: () => void;
  position!: NgtTriplet;
  constructor(public object: Object3D, public physics: NgtPhysicBox) { }
}

@Component({
  selector: 'conveyor-volume',
  template: `
        <ngt-mesh [name]="name"
            ngtPhysicBox
            [getPhysicProps]="getCubeProps"
            [position]="position"
            [rotation]="rotation"
            [scale]="scale"
            (animateReady)="tick()">
<ngt-group *ngIf="!hiddeningame" [scale]="inversescale">
         <ngt-arrow-helper></ngt-arrow-helper>
</ngt-group>
            <ngt-box-geometry></ngt-box-geometry>
            <ngt-mesh-standard-material
                [parameters]="parameters"
            ></ngt-mesh-standard-material>
        </ngt-mesh>
    `
})
export class ConveyorVolumeComponent {
  @Input() name = 'triggercube';
  @Input() position = [0, 0, 0] as NgtVector3;
  @Input() rotation = [0, 0, 0] as NgtEuler;
  @Input() scale = [1, 1, 1] as NgtVector3;
  @Input() color = 'red';
  @Input() hiddeningame = true;

  @Output() beginOverlap = new EventEmitter<CollideBeginEvent>();
  @Output() endOverlap = new EventEmitter<CollideEndEvent>();

  get parameters(): MeshStandardMaterialParameters {
    return {
      wireframe: !this.hiddeningame,
      opacity: this.hiddeningame ? 0 : 1,
      transparent: this.hiddeningame ? true : false,
      color: this.color
    }
  }

  get inversescale(): NgtVector3 {
    return [
      1 / (<Array<number>>this.scale)[0],
      1 / (<Array<number>>this.scale)[1],
      1 / (<Array<number>>this.scale)[2]
    ] as NgtVector3;
  }

  private overlappingactors = new Map<string, Overlapping>([]);
  private speed = 0.05;


  getCubeProps: GetByIndex<BoxProps> = () => ({
    isTrigger: true,
    position: this.position as NgtTriplet,
    rotation: this.rotation as NgtTriplet,
    scale: this.scale,
    onCollideBegin: (e) => {
      if (!this.overlappingactors.has(e.body.uuid)) {
        const physics = <NgtPhysicBox>e.body.userData['physics'];
        if (physics) {
          const overlapping = new Overlapping(e.body, physics);
          overlapping.subscription = physics.api.position.subscribe(next => {
            overlapping.position = next;
          })
          this.overlappingactors.set(e.body.uuid, overlapping);
          this.beginOverlap.emit(e);
        }
      }
    },
    onCollideEnd: (e) => {
      const overlapping = this.overlappingactors.get(e.body.uuid)
      if (overlapping) {
        overlapping.subscription?.();
        this.overlappingactors.delete(e.body.uuid);
        this.endOverlap.emit(e);
      }
    },
    args: this.scale as NgtTriplet  // this is required for box geometry
  });

  tick() {
    this.overlappingactors.forEach(item => {
      if (item.position) {
        item.physics.api.position.set(item.position[0] - this.speed, item.position[1], item.position[2]);
      }
    })
  }
}
