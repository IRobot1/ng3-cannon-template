import { Component, OnInit } from "@angular/core";

import { Euler, Group } from "three";

import { NgtTriple, NgtVector3 } from "@angular-three/core";
import { NgtStore } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

import { XRControllerModelFactory } from "three-stdlib/webxr/XRControllerModelFactory";


@Component({
  selector: 'app-xr-bat',
  templateUrl: './xr-bat.component.html',
  providers: [NgtPhysicBody],
})
export class XRBatComponent implements OnInit {

  index = 0;

  controller!: Group;

  position = [0, 0, 0] as NgtVector3;
  scale = [0.1, 0.1, 0.5] as NgtVector3;
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

  }

  cubeProps = this.physicBody.useBox(() => ({
    type: 'Static',
    args: this.scale as NgtTriple
  }));

  animate() {
    const p = this.controller.position;
    this.cubeProps.api.position.set(p.x, p.y, p.z);

    const r = this.controller.rotation;
    this.cubeProps.api.rotation.set(r.x, r.y, r.z);
  }
}
