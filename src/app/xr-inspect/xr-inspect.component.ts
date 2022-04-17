import { Component, OnInit } from "@angular/core";

import { Euler, Group, Object3D, XRInputSource } from "three";

import { NgtStore, NgtTriple, NgtVector3 } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

import { XRControllerModelFactory } from "three-stdlib/webxr/XRControllerModelFactory";

import { Inspect } from "../inspect";

@Component({
  selector: 'app-xr-inspect',
  //templateUrl: './xr-inspect.component.html',
  template: `
      <ngt-mesh [name]="'inspector'" [ref]="boxRef.ref" (animateReady)="animate()"
                [scale]="scale" [rotation]="rotation" [position]="position">
        <ngt-box-geometry></ngt-box-geometry>
        <ngt-mesh-standard-material [parameters]="{ wireframe: true, color: 'darkgray' }"></ngt-mesh-standard-material>
      </ngt-mesh>`,
  providers: [NgtPhysicBody],
})
export class XRInspectComponent implements OnInit {

  index = 0;

  private controller!: Group;

  position = [0, 0, 0] as NgtVector3;
  scale = [.1, .1, .1] as NgtVector3;
  rotation?: Euler;

  radius = 0.05;

  constructor(
    private physicBody: NgtPhysicBody,
    private canvasStore: NgtStore,
  ) { }

  ngOnInit(): void {
    const renderer = this.canvasStore.get((s) => s.gl);
    const scene = this.canvasStore.get((s) => s.scene);

    this.controller = renderer.xr.getController(this.index);
    scene.add(this.controller);

    // The XRControllerModelFactory will automatically fetch controller models
    // that match what the user is holding as closely as possible. The models
    // should be attached to the object returned from getControllerGrip in
    // order to match the orientation of the held device.
    const controllerModelFactory = new XRControllerModelFactory();

    const controllerGrip = renderer.xr.getControllerGrip(this.index);
    controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
    scene.add(controllerGrip);

    this.controller.addEventListener('connected', (event) => {
      const controller = <Group>event.target;
      const source = <XRInputSource>event['data'];
      controller.name = source.handedness;
    });

    this.controller.addEventListener('selectstart', () => {
      this.pickup();
    });

    this.controller.addEventListener('selectend', () => {
      this.drop();
    });

  }

  private overlapping?: Object3D;
  private inspecting?: Inspect;
  private velocity!: NgtTriple;
  private angularvelocity!: NgtTriple;
  private velocity_subscription?: () => void;
  private angularvelocity_subscription?: () => void;

  private pickup() {
    if (this.overlapping && !this.inspecting) {
      const inspect = <Inspect>this.overlapping.userData['inspect'];
      console.clear();
      console.warn('pickup', inspect)

      if (inspect) {
        inspect.Pickup();
        this.inspecting = inspect;
        this.velocity_subscription = this.inspecting.physics.api.velocity.subscribe(next => {
          this.velocity = next;
        });
        this.angularvelocity_subscription = this.inspecting.physics.api.angularVelocity.subscribe(next => {
          this.angularvelocity = next;
        });
      }
    }

  }

  private drop() {
    if (this.inspecting) {
      this.inspecting.Drop();
      console.warn('drop', this.inspecting)

      this.inspecting.physics.api.velocity.set(this.velocity[0], this.velocity[1], this.velocity[2]);
      this.inspecting.physics.api.angularVelocity.set(this.angularvelocity[0], this.angularvelocity[1], this.angularvelocity[2]);

      this.velocity_subscription?.();
      this.angularvelocity_subscription?.();
      this.inspecting = undefined;
    }
  }


  boxRef = this.physicBody.useBox(() => ({
    isTrigger: true,

    onCollideBegin: (e) => {
      if (e.body != this.overlapping) {
        this.overlapping = e.body;
        console.warn('begin overlapping', e.body.name)
      }
    },
    onCollideEnd: (e) => {
      if (e.body == this.overlapping) {
        console.warn('end overlapping', e.body.name)
        this.overlapping = undefined;
      }
    },
    args: this.scale as NgtTriple,
  }));


  animate() {
    const p = this.controller.position;
    this.boxRef.api.position.set(p.x, p.y, p.z);

    const r = this.controller.rotation;
    this.boxRef.api.rotation.set(r.x, r.y, r.z);

    if (this.inspecting) {
      this.inspecting.physics.api.position.set(p.x, p.y, p.z);
      this.inspecting.physics.api.rotation.set(r.x, r.y, r.z);
    }
  }
}
