import { Injectable } from "@angular/core";

import { Ref } from "@angular-three/core";

import { BoxProps, CompoundBodyProps, ConvexPolyhedronProps, CylinderProps, GetByIndex, HeightfieldProps, NgtPhysicBody, NgtPhysicBodyReturn, ParticleProps, PlaneProps, SphereProps, TrimeshProps } from "@angular-three/cannon";

//
// This is a drop in wrapper for NgtPhysicBody.
// It keeps track of all created bodies for easy lookup by collision events when
// adding constraints between overlapping bodies
//
// onCollideBegin: (event: CollideBeginEvent) => {
//   const body = this.physicBody.getBody(event.body.uuid);
//   if (body) {
//     const constraint = this.physicConstraint.useDistanceConstraint(this.particle.ref, body.ref, {
//       distance: 0
//     });
//     this.particle.api.position.set(0, 0, -5)
//   }
// },

@Injectable()
export class PhysicsBodyRegistry {
  private uuidbodymap = new Map<string, NgtPhysicBodyReturn>([]);

  getBody(uuid: string): NgtPhysicBodyReturn | undefined {
    return this.uuidbodymap.get(uuid);
  }

  removeBody(uuid: string): boolean {
    return this.uuidbodymap.delete(uuid);
  }

  constructor(
    private physicBody: NgtPhysicBody,
  ) { }

  private register(body: NgtPhysicBodyReturn): NgtPhysicBodyReturn {
    const s = body.ref.subscribe(next => {
      if (next != null) {
        this.uuidbodymap.set(next.uuid, body);
        s.unsubscribe();
      }
    });
    return body;
  }

  public useBox(fn: GetByIndex<BoxProps>, useOnTemplate?: boolean, ref?: Ref<THREE.Object3D>): NgtPhysicBodyReturn {
    return this.register(
      this.physicBody.useBox(fn, useOnTemplate, ref)
    );
  }

  public useCompoundBody(fn: GetByIndex<CompoundBodyProps>, useOnTemplate?: boolean, ref?: Ref<THREE.Object3D>): NgtPhysicBodyReturn {
    return this.register(
      this.physicBody.useCompoundBody(fn, useOnTemplate, ref)
    );
  }

  useConvexPolyhedron(fn: GetByIndex<ConvexPolyhedronProps>, useOnTemplate?: boolean, ref?: Ref<THREE.Object3D>): NgtPhysicBodyReturn {
    return this.register(
      this.physicBody.useConvexPolyhedron(fn, useOnTemplate, ref)
    );
  }
  useCylinder(fn: GetByIndex<CylinderProps>, useOnTemplate?: boolean, ref?: Ref<THREE.Object3D>): NgtPhysicBodyReturn {
    return this.register(
      this.physicBody.useCylinder(fn, useOnTemplate, ref)
    );
  }
  useHeightfield(fn: GetByIndex<HeightfieldProps>, useOnTemplate?: boolean, ref?: Ref<THREE.Object3D>): NgtPhysicBodyReturn {
    return this.register(
      this.physicBody.useHeightfield(fn, useOnTemplate, ref)
    );
  }
  useParticle(fn: GetByIndex<ParticleProps>, useOnTemplate?: boolean, ref?: Ref<THREE.Object3D>): NgtPhysicBodyReturn {
    return this.register(
      this.physicBody.useParticle(fn, useOnTemplate, ref)
    );
  }
  usePlane(fn: GetByIndex<PlaneProps>, useOnTemplate?: boolean, ref?: Ref<THREE.Object3D>): NgtPhysicBodyReturn {
    return this.register(
      this.physicBody.usePlane(fn, useOnTemplate, ref)
    );
  }
  useSphere(fn: GetByIndex<SphereProps>, useOnTemplate?: boolean, ref?: Ref<THREE.Object3D>): NgtPhysicBodyReturn {
    return this.register(
      this.physicBody.useSphere(fn, useOnTemplate, ref)
    );
  }
  useTrimesh(fn: GetByIndex<TrimeshProps>, useOnTemplate?: boolean, ref?: Ref<THREE.Object3D>): NgtPhysicBodyReturn {
    return this.register(
      this.physicBody.useTrimesh(fn, useOnTemplate, ref)
    );
  }

}
