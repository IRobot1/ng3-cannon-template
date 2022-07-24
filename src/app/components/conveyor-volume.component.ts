import { Component, EventEmitter, Input, Output } from "@angular/core";

import { MeshStandardMaterialParameters, Object3D, } from "three";

import { NgtEuler, NgtTriple, NgtVector3 } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicBodyReturn, CollideBeginEvent, CollideEndEvent } from "@angular-three/cannon";

class Overlapping {
  subscription?: () => void;
  position!: NgtTriple;
  constructor(public object: Object3D, public physics: NgtPhysicBodyReturn<Object3D>) { }
}

@Component({
  selector: 'conveyor-volume',
  template: `
        <ngt-mesh [name]="name"
            [ref]="cubeProps.ref"
            [position]="position"
            [rotation]="rotation"
            [scale]="scale"
            (beforeRender)="tick()">
<ngt-group *ngIf="!hiddeningame" [scale]="inversescale">
         <ngt-arrow-helper></ngt-arrow-helper>
</ngt-group>
            <ngt-box-geometry></ngt-box-geometry>
            <ngt-mesh-standard-material
                [wireframe]="!hiddeningame" [opacity]="hiddeningame ? 0 : 1" [transparent]="hiddeningame" [color]="color"
            ></ngt-mesh-standard-material>
        </ngt-mesh>
    `,
  providers: [NgtPhysicBody],
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

  get inversescale(): NgtVector3 {
    return [
      1 / (<Array<number>>this.scale)[0],
      1 / (<Array<number>>this.scale)[1],
      1 / (<Array<number>>this.scale)[2]
    ] as NgtVector3;
  }

  private overlappingactors = new Map<string, Overlapping>([]);
  private speed = 0.05;

  cubeProps = this.physicBody.useBox(() => ({
    isTrigger: true,
    position: this.position as NgtTriple,
    rotation: this.rotation as NgtTriple,
    scale: this.scale,
    onCollideBegin: (e) => {
      if (!this.overlappingactors.has(e.body.uuid)) {
        const physics = <NgtPhysicBodyReturn<Object3D>>e.body.userData['physics'];
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
    args: this.scale as NgtTriple  // this is required for box geometry
  }));

  constructor(private physicBody: NgtPhysicBody) { }

  tick() {
    this.overlappingactors.forEach(item => {
      if (item.position) {
        item.physics.api.position.set(item.position[0] - this.speed, item.position[1], item.position[2]);
      }
    })
  }
}
