import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgtColorPipeModule, NgtCoreModule, NgtRadianPipeModule, NgtVectorPipeModule } from '@angular-three/core';
import { NgtStatsModule } from '@angular-three/core/stats';
import { NgtInstancedMeshModule, NgtMeshModule } from '@angular-three/core/meshes';
import { NgtGroupModule } from '@angular-three/core/group';
import { NgtMeshLambertMaterialModule, NgtMeshStandardMaterialModule } from '@angular-three/core/materials';
import { NgtBoxGeometryModule, NgtCylinderGeometryModule, NgtPlaneGeometryModule, NgtPolyhedronGeometryModule, NgtSphereGeometryModule, NgtTorusGeometryModule } from '@angular-three/core/geometries';
import { NgtAmbientLightModule, NgtDirectionalLightModule, NgtPointLightModule, NgtSpotLightModule } from '@angular-three/core/lights';
import { NgtArrowHelperModule, NgtBoxHelperModule } from '@angular-three/core/helpers';
import { NgtInstancedBufferAttributeModule } from '@angular-three/core/attributes';

import { NgtPhysicsModule } from '@angular-three/cannon';
import { NgtPhysicBoxModule, NgtPhysicCompoundModule, NgtPhysicConvexPolyhedronModule, NgtPhysicCylinderModule, NgtPhysicHeightfieldModule, NgtPhysicPlaneModule, NgtPhysicSphereModule, NgtPhysicTrimeshModule } from '@angular-three/cannon/bodies';

import { NgtSobaTextModule } from '@angular-three/soba/abstractions';
import { NgtSobaOrbitControlsModule } from '@angular-three/soba/controls';

import { AppComponent } from './app.component';
import { PlaneComponent } from './components/storybook-plane.component';
import { CubeComponent } from './components/storybook-cube.component';
import { NgtCannonDebugModule } from '@angular-three/cannon/debug';
import { TriggerCubeComponent } from './components/trigger-cube.component';
import { XRBatComponent } from './xr-bat/xr-bat.component';
import { XRInspectComponent } from './xr-inspect/xr-inspect.component';
import { AppRoutingModule } from './app-routing.module';
import { VRComponent } from './examples/vr/vr.component';
import { HomeComponent } from './home.component';
import { ThreeJSComponent } from './examples/threejs/threejs.component';
import { WorkerComponent } from './examples/worker/worker.component';
import { BounceComponent } from './examples/bounce/bounce.component';
import { CollisionFilterComponent } from './examples/collision_filter/collision_filter.component';
import { CollisionsComponent } from './examples/collisions/collisions.component';
import { CompoundComponent } from './examples/compound/compound.component';
import { ContainerComponent } from './examples/container/container.component';
import { EventsComponent } from './examples/events/events.component';
import { FixedRotationComponent } from './examples/fixed_rotation/fixed_rotation.component';
import { FrictionComponent } from './examples/friction/friction.component';
import { ImpulseComponent } from './examples/impulse/impulse.component';
import { JengaComponent } from './examples/jenga/jenga.component';
import { TriggerComponent } from './examples/trigger/trigger.component';
import { TrimeshComponent } from './examples/trimesh/trimesh.component';
import { SleepComponent } from './examples/sleep/sleep.component';
import { TweenComponent } from './examples/tween/tween.component';
import { ConvexComponent } from './examples/convex/convex.component';
import { BodyTypesComponent } from './examples/body_types/body_types.component';
import { PerformanceComponent } from './examples/performance/performance.component';
import { PileComponent } from './examples/pile/pile.component';
import { StacksComponent } from './examples/stacks/stacks.component';
import { ClothComponent } from './examples/cloth/cloth.component';
import { FPSComponent } from './examples/fps/fps.component';
import { FirstPersonControlsComponent } from './components/first-person-controls.component';
import { ConveyorComponent } from './examples/conveyor/conveyor.component';
import { ConveyorVolumeComponent } from './components/conveyor-volume.component';
import { ConditionalComponent } from './examples/conditional/conditional.component';
import { MousePickComponent } from './examples/mousepick/mousepick.component';
import { CallbacksComponent } from './examples/callbacks/callbacks.component';
import { HeightfieldComponent } from './examples/heightfield/heightfield.component';
import { HingeComponent } from './examples/hinge/hinge.component';
import { NgtPhysicConeTwistConstraintModule, NgtPhysicHingeConstraintModule, NgtPhysicLockConstraintModule, NgtPhysicPointToPointConstraintModule } from '@angular-three/cannon/constraints';
import { ConstraintsComponent } from './examples/constraints/constraints.component';
import { RagdollComponent } from './examples/ragdoll/ragdoll.component';
import { RagdollModelComponent } from './components/ragdoll-model/ragdoll-model.component';
import { SpringComponent } from './examples/spring/spring.component';
import { TearComponent } from './examples/tear/tear.component';
import { RigidVehicleComponent } from './examples/rigid_vehicle/rigid_vehicle.component';
import { RigidBodyModelComponent } from './components/rigidbody-model/rigidbody-model.component';
import { RaycastVehicleComponent } from './examples/raycast_vehicle/raycast_vehicle.component';
import { RaycastVehicleModelComponent } from './components/raycast-vehicle-model/raycast-vehicle-model.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ThreeJSComponent,
    WorkerComponent,
    BounceComponent,
    CollisionFilterComponent,
    CollisionsComponent,
    CompoundComponent,
    ContainerComponent,
    EventsComponent,
    FixedRotationComponent,
    FrictionComponent,
    ImpulseComponent,
    JengaComponent,
    TriggerComponent,
    TrimeshComponent,
    SleepComponent,
    TweenComponent,
    ConvexComponent,
    BodyTypesComponent,
    PerformanceComponent,
    PileComponent,
    StacksComponent,
    ConveyorComponent,
    ConveyorVolumeComponent,
    ConditionalComponent,
    MousePickComponent,
    CallbacksComponent,
    HeightfieldComponent,
    HingeComponent,
    ConstraintsComponent,
    RagdollComponent,
    RagdollModelComponent,
    SpringComponent,
    TearComponent,
    RigidVehicleComponent,
    RigidBodyModelComponent,
    RaycastVehicleComponent,
    RaycastVehicleModelComponent,

    ClothComponent,
    FPSComponent,

    VRComponent,

    PlaneComponent,
    CubeComponent,
    TriggerCubeComponent,
    XRBatComponent,
    XRInspectComponent,
    FirstPersonControlsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NgtStatsModule,
    NgtBoxHelperModule,
    NgtArrowHelperModule,

    NgtCoreModule,
    NgtMeshModule,
    NgtInstancedMeshModule,
    NgtGroupModule,

    NgtColorPipeModule,
    NgtRadianPipeModule,
    NgtVectorPipeModule,

    NgtBoxGeometryModule,
    NgtPlaneGeometryModule,
    NgtSphereGeometryModule,
    NgtCylinderGeometryModule,
    NgtTorusGeometryModule,
    NgtPolyhedronGeometryModule,
    NgtPhysicHeightfieldModule,
    NgtInstancedBufferAttributeModule,

    NgtAmbientLightModule,
    NgtDirectionalLightModule,
    NgtSpotLightModule,
    NgtPointLightModule,

    NgtMeshLambertMaterialModule,
    NgtMeshStandardMaterialModule,

    NgtPhysicsModule,
    NgtPhysicBoxModule,
    NgtPhysicPlaneModule,
    NgtPhysicSphereModule,
    NgtPhysicCylinderModule,
    NgtPhysicCompoundModule,
    NgtPhysicTrimeshModule,
    NgtPhysicConvexPolyhedronModule,
    NgtCannonDebugModule,

    NgtPhysicHingeConstraintModule,
    NgtPhysicLockConstraintModule,
    NgtPhysicPointToPointConstraintModule,
    NgtPhysicConeTwistConstraintModule,
    

    NgtSobaOrbitControlsModule,
    NgtSobaTextModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
