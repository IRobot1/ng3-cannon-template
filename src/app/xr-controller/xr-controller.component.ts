import { GetByIndex,  SphereProps } from "@angular-three/cannon";
import { NgtCanvasStore, NgtRender, NgtTriplet, NgtVector3} from "@angular-three/core";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AdditiveBlending, Group, Matrix4, Mesh, Object3D, Raycaster, Vector3, XRInputSource } from "three";
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory";

@Component({
  selector: 'app-xr-controller',
  templateUrl: './xr-controller.component.html',
})
export class XRControllerComponent implements OnInit {
  @Output() trigger = new EventEmitter<string>();
  index = 0;

  controller?: Group;

  position = [0,0,0] as NgtVector3;

  radius = 0.05;

  bat?: Mesh;

  constructor(
    private canvasStore: NgtCanvasStore,
  ) { }

  ngOnInit(): void {
    const renderer = this.canvasStore.get((s) => s.renderer);
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
      if (this.bat) {
        controller.add(this.bat);
      }
    });

  }

  ready(bat: Mesh) {
    this.bat = bat;
  }

  getSphereProps: GetByIndex<SphereProps> = (index) => (
    {
      type: 'Static',
      radius: this.radius,
      onCollideBegin: (e) => {
        const message = 'collide begin ' + e.body.name;
        this.trigger.emit(message);
      },
      args: [this.radius]
    });


  animateGroup(event: NgtRender) {
    if (this.controller) {
      const position = this.controller.position;
      this.position = [position.x, position.y, position.z] as NgtVector3;
    }
  }
}
