import { AfterViewInit, Component, OnDestroy } from "@angular/core";

import { Camera, Mesh, Raycaster, Vector2, Vector3 } from "three";

import { NgtState, NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  templateUrl: './mousepick.component.html',
  providers: [NgtPhysicBody],
})
export class MousePickComponent implements AfterViewInit, OnDestroy {
  position = [0, 3, 0] as NgtTriple;
  velocity = [0, 0, 0] as NgtTriple;
  sphereRadius = 0.2;

  private cleanup!: () => void;

  boxProps = this.physicBody.useBox(() => ({
      mass: 1,
      args: [1, 1, 1],
      position: this.position,
      angularFactor: [0, 0, 0] as NgtTriple, // prevent it spinning while dragging
      velocity: this.velocity,
  }));

  sphereProps = this.physicBody.useSphere(() => ({
      mass: 0,
      args: [this.sphereRadius]
  }));

  get options(): Record<string, any> {
    return {
      pivotA: [0, 0, 0],
      pivotB: [0, 0, 0],
    }
  }

  constructor(private physicBody: NgtPhysicBody) { }

  camera!: Camera;
  created(event: NgtState) {
    this.camera = event.camera;
  }

  cubeMesh!: Mesh;
  cubeready(mesh: Mesh) {
    this.cubeMesh = mesh;
  }


  movementPlane!: Mesh;
  moveready(mesh: Mesh) {
    this.movementPlane = mesh;
  }

  isDragging = false;
  private velocity_subscription?: () => void;

  ngAfterViewInit(): void {

    const pointerdown = (event: PointerEvent) => {
      // Cast a ray from where the mouse is pointing and
      // see if we hit something
      const hitPoint = this.getHitPoint(event.clientX, event.clientY, this.cubeMesh, this.camera)

      // if the cube was hit
      if (hitPoint) {
        // Move marker mesh on contact point
        this.moveClickMarker(hitPoint)

        // enable constraint between the marker and cube
        this.isDragging = true
      }
    }
    document.body.addEventListener('pointerdown', pointerdown);

    const pointermove = (event: PointerEvent) => {
      if (this.isDragging) {
        // Project the mouse onto the movement plane
        const hitPoint = this.getHitPoint(event.clientX, event.clientY, this.movementPlane, this.camera)

        if (hitPoint) {
          // Move marker mesh on the contact point
          this.moveClickMarker(hitPoint)

          if (!this.velocity_subscription) {
            // monitor velocity of dragged box until its released
            this.velocity_subscription = this.boxProps.api.velocity.subscribe(next => {
              this.velocity = next;
            });
          }

        }
      }
    }
    document.body.addEventListener('pointermove', pointermove);


    const pointerup = (event: PointerEvent) => {

      // velocity of other box is now velocity of dragged box
      this.velocity_subscription?.();
      this.velocity_subscription = undefined;

      // disable constraint between marker and box
      this.isDragging = false
    }
    document.body.addEventListener('pointerup', pointerup);

    this.cleanup = () => {
      document.body.removeEventListener('pointerdown', pointerdown);
      document.body.removeEventListener('pointermove', pointermove);
      document.body.removeEventListener('pointerup', pointerup);
    }
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  //
  // Returns an hit point if there's a hit with the mesh, otherwise returns undefined
  //
  private getHitPoint(clientX: number, clientY: number, mesh: Mesh, camera: Camera): Vector3 | undefined {
    // Get 3D point form the client x y
    const mouse = new Vector2()
    mouse.x = (clientX / window.innerWidth) * 2 - 1
    mouse.y = -((clientY / window.innerHeight) * 2 - 1)

    const raycaster = new Raycaster();
    // Get the picking ray from the point
    raycaster.setFromCamera(mouse, camera)

    // Find out if there's a hit
    const hits = raycaster.intersectObject(mesh)

    // Return the closest hit or undefined
    return hits.length > 0 ? hits[0].point : undefined
  }


  private moveClickMarker(position: Vector3) {
    // update marker position
    this.position = [position.x, position.y, position.z]
  }
}
