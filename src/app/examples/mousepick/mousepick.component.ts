import { AfterViewInit, Component, OnDestroy } from "@angular/core";

import { Camera, Mesh, Raycaster, Vector2, Vector3 } from "three";

import { NgtCreatedState, NgtTriplet } from "@angular-three/core";

import { BoxProps, GetByIndex } from "@angular-three/cannon";

@Component({
  templateUrl: './mousepick.component.html'
})
export class MousePickComponent implements AfterViewInit, OnDestroy {

  position = [0, 3, 0] as NgtTriplet;

  private cleanup!: () => void;

  getBoxProps: GetByIndex<BoxProps> = () => (
    {
      mass: 1,
      args: [1, 1, 1],
      position: this.position,
      angularFactor: [0, 0, 0] as NgtTriplet,
    }
  )

  joined = false;

  get options(): Record<string, any> {
    return {
      pivotA: [0, 0, 0],
      pivotB: [0, 0, 0],
    }
  }

  camera!: Camera;
  created(event: NgtCreatedState) {
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

  private isDragging = false;

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
        this.joined = true;

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
        }
      }
    }
    document.body.addEventListener('pointermove', pointermove);

    const pointerup = (event: PointerEvent) => {
      this.isDragging = false

      // disable constraint between marker and box
      this.joined = false;
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
    this.position = [position.x, position.y, position.z]
  }
}
