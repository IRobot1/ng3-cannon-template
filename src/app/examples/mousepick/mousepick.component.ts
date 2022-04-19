import { NgtPhysicBody, NgtPhysicConstraint } from '@angular-three/cannon';

import { NgtStore, NgtTriple } from '@angular-three/core';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy } from '@angular/core';

import { Camera, Mesh, Raycaster, Vector2, Vector3 } from 'three';

@Component({
  selector: 'mousepick-example',
  templateUrl: './mousepick-example.component.html',
  providers: [NgtPhysicBody, NgtPhysicConstraint],
})
export class MousePickExample implements AfterViewInit, OnDestroy {
  velocity = [0, 0, 0] as NgtTriple;
  sphereRadius = 0.2;

  private cleanup!: () => void;

  boxProps = this.physicBody.useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    position: [0, 3, 0],
    angularFactor: [0, 0, 0] as NgtTriple, // prevent it spinning while dragging
  }));

  sphereProps = this.physicBody.useSphere(() => ({
    mass: 0,
    args: [this.sphereRadius],
    collisionFilterGroup: 0,
  }));

  constructor(
    private physicBody: NgtPhysicBody,
    private physicConstraint: NgtPhysicConstraint,
    private store: NgtStore,
    @Inject(DOCUMENT) private document: Document
  ) {}

  movementPlane!: Mesh;

  isDragging = false;

  private velocity_subscription?: () => void;

  ngAfterViewInit(): void {
    const camera = this.store.get((s) => s.camera);

    const constraint = this.physicConstraint.usePointToPointConstraint(
      this.boxProps.ref,
      this.sphereProps.ref,
      {
        pivotA: [0, 0, 0],
        pivotB: [0, 0, 0],
      }
    );
    constraint.api.disable();

    const pointerdown = (event: PointerEvent) => {
      // Cast a ray from where the mouse is pointing and
      // see if we hit something
      const hitPoint = this.getHitPoint(
        event.clientX,
        event.clientY,
        this.boxProps.ref.value as Mesh,
        camera
      );

      // if the cube was hit
      if (hitPoint) {
        // Move marker mesh on contact point
        this.moveClickMarker(hitPoint);

        constraint.api.enable();

        // enable constraint between the marker and cube
        this.isDragging = true;
      }
    };
    this.document.body.addEventListener('pointerdown', pointerdown);

    const pointermove = (event: PointerEvent) => {
      if (this.isDragging) {
        // Project the mouse onto the movement plane
        const hitPoint = this.getHitPoint(
          event.clientX,
          event.clientY,
          this.movementPlane,
          camera
        );

        if (hitPoint) {
          // Move marker mesh on the contact point
          this.moveClickMarker(hitPoint);

          if (!this.velocity_subscription) {
            // monitor velocity of dragged box until its released
            this.velocity_subscription = this.boxProps.api.velocity.subscribe(
              (next) => {
                this.velocity = next;
              }
            );
          }
        }
      }
    };
    this.document.body.addEventListener('pointermove', pointermove);

    const pointerup = (event: PointerEvent) => {
      // velocity of other box is now velocity of dragged box
      this.velocity_subscription?.();
      this.velocity_subscription = undefined;

      constraint.api.disable();

      // disable constraint between marker and box
      this.isDragging = false;
    };
    this.document.body.addEventListener('pointerup', pointerup);

    this.cleanup = () => {
      this.document.body.removeEventListener('pointerdown', pointerdown);
      this.document.body.removeEventListener('pointermove', pointermove);
      this.document.body.removeEventListener('pointerup', pointerup);
    };
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  //
  // Returns an hit point if there's a hit with the mesh, otherwise returns undefined
  //
  private getHitPoint(
    clientX: number,
    clientY: number,
    mesh: Mesh,
    camera: Camera
  ): Vector3 | undefined {
    // Get 3D point form the client x y
    const mouse = new Vector2();
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((clientY / window.innerHeight) * 2 - 1);

    const raycaster = new Raycaster();
    // Get the picking ray from the point
    raycaster.setFromCamera(mouse, camera);

    // Find out if there's a hit
    const hits = raycaster.intersectObject(mesh);

    // Return the closest hit or undefined
    return hits.length > 0 ? hits[0].point : undefined;
  }

  // update marker position
  private moveClickMarker(position: Vector3) {
    this.sphereProps.api.position.copy(position);
  }
}

@Component({
  templateUrl: './mousepick.component.html',
})
export class MousePickComponent {}
