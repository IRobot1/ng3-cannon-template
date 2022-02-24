import { GetByIndex, BoxProps } from "@angular-three/cannon";
import { NgtPhysicBox } from "@angular-three/cannon/bodies";
import { NgtCanvasStore, NgtTriplet, NgtVector3 } from "@angular-three/core";
import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Euler, Group, Mesh, Object3D, Vector3, XRInputSource } from "three";
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory";
import { Inspect } from "../inspect";

@Component({
  selector: 'app-xr-inspect',
  //templateUrl: './xr-inspect.component.html',
  template: `
      <ngt-mesh ngtPhysicBox [getPhysicProps]="getInspectorProps" [name]="'inspector'"
                [scale]="scale" [rotation]="rotation" [position]="position">
        <ngt-box-geometry></ngt-box-geometry>
        <ngt-mesh-standard-material [parameters]="{ wireframe: true, color: 'darkgray' }"></ngt-mesh-standard-material>
      </ngt-mesh>
`
})
export class XRInspectComponent implements OnInit {
  @ViewChild(NgtPhysicBox) box?: NgtPhysicBox;

  index = 0;

  controller?: Group;

  position = [0, 0, 0] as NgtVector3;
  scale = [.1, .1, .1] as NgtVector3;
  rotation?: Euler;

  radius = 0.05;

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
    });

    this.controller.addEventListener('selectstart', () => {
      this.pickup();
    });

    this.controller.addEventListener('selectend', () => {
      this.drop();
    });

    setInterval(() => {
      if (this.controller) {
        const p = this.controller.position;
        this.position = p.toArray();
        this.rotation = this.controller.rotation;
        if (this.box) {
          this.box.api.velocity.set(1, 0, 0);
          //console.warn(p)
        }
      }
    }, 1000 / 10);
  }

  private pickup() {
    if (this.overlapping && this.controller && !this.inspecting) {
      const inspect = <Inspect>this.overlapping.userData['inspect'];
      console.warn('pickup', inspect)

      if (inspect) {
        this.overlapping.position.copy(new Vector3());
        inspect.Pickup(this.controller);
        this.inspecting = inspect;
      }
    }

  }

  private drop() {
    console.warn('drop', this.inspecting)
    if (this.inspecting && this.controller) {
      this.inspecting.Drop(this.controller);
      this.inspecting = undefined;
    }
  }

  private overlapping?: Object3D;
  private inspecting?: Inspect;

  getInspectorProps: GetByIndex<BoxProps> = (index) => (
    {
      isTrigger: true,

      onCollideBegin: (e) => {
        if (e.body != this.overlapping) {
          this.overlapping = e.body;
          console.warn('begin overlapping', e.body.name)
        }
      },
      onCollideEnd: (e) => {
        console.warn('end overlapping', e.body.name)
        this.overlapping = undefined;
      },
      args: this.scale as NgtTriplet
    });
}
