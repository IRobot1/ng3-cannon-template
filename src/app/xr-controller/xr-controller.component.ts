import { GetByIndex, BoxProps } from "@angular-three/cannon";
import { NgtCanvasStore, NgtRender, NgtTriplet, NgtVector3 } from "@angular-three/core";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Euler, Group, } from "three";
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory";

@Component({
  selector: 'app-xr-controller',
  templateUrl: './xr-controller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XRControllerComponent implements OnInit {
  @Output() trigger = new EventEmitter<string>();
  index = 0;

  controller?: Group;

  position = [0, 0, 0] as NgtVector3;
  scale = [0.1, 0.01, 0.5] as NgtVector3;
  rotation?: Euler;

  radius = 0.05;

  constructor(
    private canvasStore: NgtCanvasStore,
    private cd: ChangeDetectorRef,
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
  }

  getCubeProps: GetByIndex<BoxProps> = (index) => (
    {
      type: 'Static',
      mass: 100,
      onCollideBegin: (e) => {
        const message = 'collide begin ' + e.body.name;
        this.trigger.emit(message);
      },
      args: this.scale as NgtTriplet
    });


  animateGroup(event: NgtRender) {
    if (this.controller) {
      this.position = this.controller.position.toArray();
      this.rotation = this.controller.rotation;
      this.cd.detectChanges();
    }
  }
}