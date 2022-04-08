import { BoxProps } from "@angular-three/cannon";
import { NgtCreatedState, NgtTriplet } from "@angular-three/core";
import { OnDestroy } from "@angular/core";
import { AfterViewInit, Component } from "@angular/core";

import { Camera, Mesh, Raycaster, Vector2, Vector3 } from "three";

@Component({
  templateUrl: './mousepick.component.html'
})
export class MousePickComponent implements AfterViewInit, OnDestroy {

  position = [0, 3, 0] as NgtTriplet;
  visible = true;

  private cleanup!: () => void;

  getBoxProps(): BoxProps {
    return {
      mass: 1,
      args: [1, 1, 1],
    } as BoxProps;
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

      // Return if the cube wasn't hit
      if (!hitPoint) {
        return
      }

      // Move marker mesh on contact point
      this.showClickMarker()
      this.moveClickMarker(hitPoint)

      // Move the movement plane on the z-plane of the hit
      this.moveMovementPlane(hitPoint, this.camera)

      // Create the constraint between the cube body and the joint body
      //
      // ** ng3 - don't have access to underlying body or constraint support
      //
      const cubeBody = undefined;
      this.addJointConstraint(hitPoint, cubeBody)

      // Set the flag to trigger pointermove on next frame so the
      // movementPlane has had time to move
      requestAnimationFrame(() => {
        this.isDragging = true
      })
    }
    document.body.addEventListener('pointerdown', pointerdown);

    const pointermove = (event: PointerEvent) => {
      if (!this.isDragging) {
        return
      }

      // Project the mouse onto the movement plane
      const hitPoint = this.getHitPoint(event.clientX, event.clientY, this.movementPlane, this.camera)

      if (hitPoint) {
        // Move marker mesh on the contact point
        this.moveClickMarker(hitPoint)

        // Move the cannon constraint on the contact point
        this.moveJoint(hitPoint)
      }
    }
    document.body.addEventListener('pointermove', pointermove);

    const pointerup = (event: PointerEvent) => {
      this.isDragging = false

      // Hide the marker mesh
      this.hideClickMarker()

      // Remove the mouse constraint from the world
      this.removeJointConstraint()
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


  private showClickMarker() {
    this.visible = true
  }

  private moveClickMarker(position: Vector3) {
    this.position = [position.x, position.y, position.z]
  }

  private hideClickMarker() {
    this.visible = false
  }

  // This function moves the virtual movement plane for the mouseJoint to move in
  private moveMovementPlane(point: Vector3, camera: Camera) {
    // Center at mouse position
    this.movementPlane.position.copy(point)

    // Make it face toward the camera
    this.movementPlane.quaternion.copy(camera.quaternion)
  }

  // Add a constraint between the cube and the jointBody
  // in the initeraction position
  private addJointConstraint(position: Vector3, constrainedBody: any) {
    //  // Vector that goes from the body to the clicked point
    //  const vector = new CANNON.Vec3().copy(position).vsub(constrainedBody.position)

    //  // Apply anti-quaternion to vector to tranform it into the local body coordinate system
    //  const antiRotation = constrainedBody.quaternion.inverse()
    //  const pivot = antiRotation.vmult(vector) // pivot is not in local body coordinates

    //  // Move the cannon click marker body to the click position
    //  jointBody.position.copy(position)

    //  // Create a new constraint
    //  // The pivot for the jointBody is zero
    //  jointConstraint = new CANNON.PointToPointConstraint(constrainedBody, pivot, jointBody, new CANNON.Vec3(0, 0, 0))

    //  // Add the constraint to world
    //  world.addConstraint(jointConstraint)
  }

  // This functions moves the joint body to a new postion in space
  // and updates the constraint
  private moveJoint(position: Vector3) {
    //  jointBody.position.copy(position)
    //  jointConstraint.update()
  }

  // Remove constraint from world
  private removeJointConstraint() {
    //  world.removeConstraint(jointConstraint)
    //  jointConstraint = undefined
  }
}
