import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Object3D, } from "three";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBodyReturn, CollideBeginEvent, CollideEndEvent } from "@angular-three/cannon";

class Overlapping {
  subscription?: () => void;
  position!: NgtTriple;
  constructor(public object: Object3D, public physics: NgtPhysicBodyReturn<Object3D>) { }
}

@Component({
  selector: 'conveyor-volume',
  template: `
        <ngt-mesh [name]="name"
            physicsBox isTrigger="true"
            (boxCollideBegin)="onCollideBegin($event)"
            (boxCollideEnd)="onCollideEnd($event)"
            [rotation]="rotation"
            [position]="position"
            (beforeRender)="tick()">
            <ngt-box-geometry [args]="scale"></ngt-box-geometry>
            <ngt-mesh-standard-material [color]="color"></ngt-mesh-standard-material>
        </ngt-mesh>
    `,
})
export class ConveyorVolumeComponent {
  @Input() name = 'triggercube';
  @Input() position = [0, 0, 0] as NgtTriple;
  @Input() rotation = [0, 0, 0] as NgtTriple;
  @Input() scale = [1, 1, 1] as NgtTriple;
  @Input() color = 'red';

  @Output() beginOverlap = new EventEmitter<CollideBeginEvent>();
  @Output() endOverlap = new EventEmitter<CollideEndEvent>();

  private overlappingactors = new Map<string, Overlapping>([]);
  private speed = 0.05;

  onCollideBegin(e: CollideBeginEvent) {
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
  }
  onCollideEnd(e: CollideEndEvent) {
    const overlapping = this.overlappingactors.get(e.body.uuid)
    if (overlapping) {
      overlapping.subscription?.();
      this.overlappingactors.delete(e.body.uuid);
      this.endOverlap.emit(e);
    }
  }

  tick() {
    this.overlappingactors.forEach(item => {
      if (item.position) {
        item.physics.api.position.set(item.position[0] - this.speed, item.position[1], item.position[2]);
      }
    })
  }
}
