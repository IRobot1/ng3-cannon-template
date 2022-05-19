import { Component, OnInit } from "@angular/core";

import { Euler, Group, Object3D, XRInputSource } from "three";

import { NgtStore, NgtVector3 } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicConstraint, NgtPhysicConstraintReturn } from "@angular-three/cannon";

import { XRControllerModelFactory } from "three-stdlib/webxr/XRControllerModelFactory";

import { Inspect } from "../inspect";

@Component({
  selector: 'app-xr-inspect',
  templateUrl: './xr-inspect.component.html',
  providers: [NgtPhysicBody, NgtPhysicConstraint],
})
export class XRInspectComponent implements OnInit {

  index = 0;

  private controller!: Group;

  position = [0, 0, 0] as NgtVector3;
  rotation?: Euler;

  radius = 0.05;

  constructor(
    private physicBody: NgtPhysicBody,
    private physicConstraint: NgtPhysicConstraint,
    private store: NgtStore,
  ) { }

  ngOnInit(): void {
    const renderer = this.store.get((s) => s.gl);
    const scene = this.store.get((s) => s.scene);

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

  private constraint!: NgtPhysicConstraintReturn<'PointToPoint'>;

  private pickup() {
    if (this.overlapping && !this.inspecting) {
      const inspect = <Inspect>this.overlapping.userData['inspect'];
      if (inspect) {
        inspect.Pickup();
        this.constraint = this.physicConstraint.usePointToPointConstraint(
          inspect.physics.ref,
          this.marker.ref,
          {
            pivotA: [0, 0, 0], pivotB: [0, 0, 0],
          });
        this.inspecting = inspect;
      }
    }

  }

  private drop() {
    if (this.inspecting) {
      this.inspecting.Drop();
      this.inspecting.physics.api.angularFactor.set(1, 1, 1);  // allow normal rotation again

      this.constraint.api.remove();
      this.inspecting = undefined;
    }
  }

  markerRadius = 0.01;
  marker = this.physicBody.useSphere(() => ({
    mass: 0,
    args: [this.markerRadius],
    collisionFilterGroup: 0,
  }));

  collisionRadius = 0.05;
  collision = this.physicBody.useSphere(() => ({
    isTrigger: true,
    args: [this.collisionRadius],

    onCollideBegin: (e) => {
      if (e.body != this.overlapping) {
        this.overlapping = e.body;
      }
    },
    onCollideEnd: (e) => {
      if (e.body == this.overlapping) {
        this.overlapping = undefined;
      }
    },
  }));


  tick() {
    // move the collision sphere with controller
    this.collision.api.position.copy(this.controller.position);
    this.collision.api.rotation.copy(this.controller.rotation);

    // move marker for attaching grabbed things
    this.marker.api.position.copy(this.controller.position);
    this.marker.api.rotation.copy(this.controller.rotation);

    // rotate the thing being inspected to match the controller rotation
    if (this.inspecting) {
      this.inspecting.physics.api.angularFactor.set(0, 0, 0); // stop it shaking
      this.inspecting.physics.api.rotation.copy(this.controller.rotation);
    }
  }
}
