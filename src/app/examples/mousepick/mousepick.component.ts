import { NgtPhysicBody, NgtPhysicConstraint } from '@angular-three/cannon';

import {
  NgtComponentStore,
  NgtStore,
  NgtTriple,
  tapEffect,
} from '@angular-three/core';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, NgZone } from '@angular/core';

import { Camera, Mesh, Raycaster, Vector2, Vector3 } from 'three';

type PointerState = 'idle' | 'move';

@Component({
  selector: 'mousepick-example',
  templateUrl: './mousepick-example.component.html',
  providers: [NgtPhysicBody, NgtPhysicConstraint],
})
export class MousePickExample
  extends NgtComponentStore<{ pointerState: PointerState }>
  implements AfterViewInit {
  sphereRadius = 0.2;

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
    private zone: NgZone,
    @Inject(DOCUMENT) private document: Document
  ) {
    super();
    // initialize pointerState as 'idle'
    this.set({ pointerState: 'idle' });
  }

  movementPlane!: Mesh;

  isDragging = false;

  ngAfterViewInit(): void {
    // anything physics related, we might want to run outside of Angular zone to prevent Change Detection ticks
    this.zone.runOutsideAngular(() => {
      // call the effect
      this.setupConstraint();
    });
  }

  // we create an Effect to setup our constraint.  Another name for effect would be monitor
  // using tapEffect allows us to clean up this effect on Destroy automatically without having to have cleanup()
  // Another name for tapEffect would be task or process
  readonly setupConstraint = this.effect<void>(
    tapEffect(() => {
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
          // go back into the zone so this update will trigger render
          this.zone.run(() => {
            this.isDragging = true;
          });
        }
      };
      this.document.body.addEventListener('pointerdown', pointerdown);

      const pointermove = (event: PointerEvent) => {

        if (this.isDragging) {
          // update pointerState
          this.set({ pointerState: 'move' });

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
          }
        }
      };
      this.document.body.addEventListener('pointermove', pointermove);

      const pointerup = (event: PointerEvent) => {
        // update pointerState
        this.set({ pointerState: 'idle' });

        constraint.api.disable();

        // disable constraint between marker and box
        this.zone.run(() => {
          this.isDragging = false;
        });
      };
      this.document.body.addEventListener('pointerup', pointerup);

      return () => {
        this.document.body.removeEventListener('pointerdown', pointerdown);
        this.document.body.removeEventListener('pointermove', pointermove);
        this.document.body.removeEventListener('pointerup', pointerup);
      };
    })
  );

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

  // move mesh and body to new position
  private moveClickMarker(position: Vector3) {
    this.sphereProps.api.position.copy(position);
  }
}

@Component({
  templateUrl: './mousepick.component.html',
})
export class MousePickComponent { }
