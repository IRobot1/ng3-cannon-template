import { NgtCannonDebugModule, NgtPhysicsModule } from '@angular-three/cannon';

import {
  NgtCanvasModule,
  NgtColorPipeModule,
  NgtRadianPipeModule,
  NgtVectorPipeModule,
} from '@angular-three/core';
import {
  NgtColorAttributeModule,
  NgtInstancedBufferAttributeModule,
} from '@angular-three/core/attributes';
import {
  NgtBoxGeometryModule,
  NgtBufferGeometryModule,
  NgtCylinderGeometryModule,
  NgtExtrudeGeometryModule,
  NgtPlaneGeometryModule,
  NgtPolyhedronGeometryModule,
  NgtSphereGeometryModule,
  NgtTorusGeometryModule,
} from '@angular-three/core/geometries';
import { NgtGroupModule } from '@angular-three/core/group';
import {
  NgtArrowHelperModule,
  NgtBoxHelperModule,
  NgtDirectionalLightHelperModule,
  NgtSpotLightHelperModule,
} from '@angular-three/core/helpers';
import {
  NgtAmbientLightModule,
  NgtDirectionalLightModule,
  NgtPointLightModule,
  NgtSpotLightModule,
} from '@angular-three/core/lights';
import {
  NgtMeshLambertMaterialModule,
  NgtMeshStandardMaterialModule,
} from '@angular-three/core/materials';
import {
  NgtInstancedMeshModule,
  NgtMeshModule,
} from '@angular-three/core/meshes';
import { NgtStatsModule } from '@angular-three/core/stats';

import { NgtSobaTextModule } from '@angular-three/soba/abstractions';
import { NgtSobaOrbitControlsModule } from '@angular-three/soba/controls';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ConveyorVolumeComponent } from './components/conveyor-volume.component';
import { FirstPersonControlsComponent } from './components/first-person-controls.component';
import { FloorComponent } from './components/floor.component';
import { RagdollModelComponent } from './components/ragdoll-model/ragdoll-model.component';
import { RaycastVehicleModelComponent } from './components/raycast-vehicle-model/raycast-vehicle-model.component';
import { RigidBodyModelComponent } from './components/rigidbody-model/rigidbody-model.component';
import { CubeComponent } from './components/storybook-cube.component';
import { TriggerCubeComponent } from './components/trigger-cube.component';
import {
  BodyTypesComponent,
  BodyTypesExample,
} from './examples/body_types/body_types.component';
import {
  BounceComponent,
  BounceExample,
} from './examples/bounce/bounce.component';
import {
  CallbacksComponent,
  CallbacksExample,
} from './examples/callbacks/callbacks.component';
import { ClothComponent, ClothExample } from './examples/cloth/cloth.component';
import {
  CollisionFilterComponent,
  CollisionFilterExample,
} from './examples/collision_filter/collision_filter.component';
import {
  CollisionsComponent,
  CollisionsExample,
} from './examples/collisions/collisions.component';
import {
  CompoundComponent,
  CompoundExample,
} from './examples/compound/compound.component';
import { ConditionalComponent } from './examples/conditional/conditional.component';
import {
  ConstraintsComponent,
  ConstraintsExample,
} from './examples/constraints/constraints.component';
import {
  ContainerComponent,
  ContainerExample,
} from './examples/container/container.component';
import {
  ConvexComponent,
  ConvexExample,
} from './examples/convex/convex.component';
import { ConveyorComponent } from './examples/conveyor/conveyor.component';
import {
  EventsComponent,
  EventsExample,
} from './examples/events/events.component';
import {
  FixedRotationComponent,
  FixedRotationExample,
} from './examples/fixed_rotation/fixed_rotation.component';
import { FPSComponent, FPSExample } from './examples/fps/fps.component';
import {
  FrictionComponent,
  FrictionExample,
} from './examples/friction/friction.component';
import {
  HeightfieldComponent,
  HeightfieldExample,
} from './examples/heightfield/heightfield.component';
import { HingeComponent, HingeExample } from './examples/hinge/hinge.component';
import {
  ImpulseComponent,
  ImpulseExample,
} from './examples/impulse/impulse.component';
import { JengaComponent, JengaExample } from './examples/jenga/jenga.component';
import {
  MousePickComponent,
  MousePickExample,
} from './examples/mousepick/mousepick.component';
import {
  PerformanceComponent,
  PerformanceExample,
} from './examples/performance/performance.component';
import { PileComponent, PileExample } from './examples/pile/pile.component';
import { RagdollComponent, RagdollExample } from './examples/ragdoll/ragdoll.component';
import { RaycastVehicleComponent } from './examples/raycast_vehicle/raycast_vehicle.component';
import { RigidVehicleComponent } from './examples/rigid_vehicle/rigid_vehicle.component';
import { SleepComponent, SleepExample } from './examples/sleep/sleep.component';
import {
  SpringComponent,
  SpringExample,
} from './examples/spring/spring.component';
import {
  StacksComponent,
  StacksExample,
} from './examples/stacks/stacks.component';
import { TearComponent, TearExample } from './examples/tear/tear.component';
import {
  ThreeJSComponent,
  ThreeJSExample,
} from './examples/threejs/threejs.component';
import {
  TriggerComponent,
  TriggerExample,
} from './examples/trigger/trigger.component';
import {
  TrimeshComponent,
  TrimeshExample,
} from './examples/trimesh/trimesh.component';
import { TweenComponent, TweenExample } from './examples/tween/tween.component';
import { VRComponent, VRExample } from './examples/vr/vr.component';
import {
  WorkerComponent,
  WorkerExample,
} from './examples/worker/worker.component';
import { HomeComponent } from './home.component';
import { XRBatComponent } from './xr-bat/xr-bat.component';
import { XRInspectComponent } from './xr-inspect/xr-inspect.component';

import {
  PhysicsCableComponent
} from './components/physics-cable/physics-cable.component';
import {
  CableComponent,
} from './examples/cable/cable.component';
import { CenterOfMassComponent, CenterOfMassExample } from './examples/centerofmass/centerofmass.component';
import {
  RollingComponent, RollingExampleComponent
} from './examples/rolling/rolling.component';
import {
  RollingControlsComponent
} from './components/rolling-controls/rolling-controls.component';
import { HeightFieldGeometryComponent } from './examples/heightfield/heightfield-geometry.component';
import { NgtSidePipeModule } from '@angular-three/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    RollingComponent,
    RollingExampleComponent, 
    RollingControlsComponent,
    PhysicsCableComponent,
    CableComponent,
    CenterOfMassComponent,
    CenterOfMassExample,
    ThreeJSComponent,
    ThreeJSExample,
    WorkerComponent,
    WorkerExample,
    BounceComponent,
    BounceExample,
    CollisionFilterComponent,
    CollisionFilterExample,
    CollisionsComponent,
    CollisionsComponent,
    CollisionsExample,
    CompoundComponent,
    CompoundExample,
    ContainerComponent,
    ContainerExample,
    EventsComponent,
    EventsExample,
    FixedRotationComponent,
    FixedRotationExample,
    FrictionComponent,
    FrictionExample,
    ImpulseComponent,
    ImpulseExample,
    JengaComponent,
    JengaExample,
    TriggerComponent,
    TriggerExample,
    TrimeshComponent,
    TrimeshExample,
    SleepComponent,
    SleepExample,
    TweenComponent,
    TweenExample,
    ConvexComponent,
    ConvexExample,
    BodyTypesComponent,
    BodyTypesExample,
    PerformanceComponent,
    PerformanceExample,
    PileComponent,
    PileExample,
    StacksComponent,
    StacksExample,
    ConveyorComponent,
    ConveyorVolumeComponent,
    ConditionalComponent,
    MousePickComponent,
    MousePickExample,
    CallbacksComponent,
    CallbacksExample,
    HeightfieldComponent,
    HeightfieldExample,
    HeightFieldGeometryComponent,
    HingeComponent,
    HingeExample,
    ConstraintsComponent,
    ConstraintsExample,
    RagdollComponent,
    RagdollModelComponent,
    RagdollExample,
    SpringComponent,
    SpringExample,
    TearComponent,
    TearExample,
    RigidVehicleComponent,
    RigidBodyModelComponent,
    RaycastVehicleComponent,
    RaycastVehicleModelComponent,

    ClothComponent,
    ClothExample,
    FPSComponent,
    FPSExample,

    VRComponent,
    VRExample,

    FloorComponent,
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
    NgtSpotLightHelperModule,
    NgtDirectionalLightHelperModule,

    NgtCanvasModule,
    NgtMeshModule,
    NgtInstancedMeshModule,
    NgtGroupModule,

    NgtColorPipeModule,
    NgtRadianPipeModule,
    NgtVectorPipeModule,
    NgtSidePipeModule,

    NgtBufferGeometryModule,
    NgtBoxGeometryModule,
    NgtPlaneGeometryModule,
    NgtSphereGeometryModule,
    NgtCylinderGeometryModule,
    NgtTorusGeometryModule,
    NgtPolyhedronGeometryModule,
    NgtExtrudeGeometryModule,
    NgtInstancedBufferAttributeModule,

    NgtAmbientLightModule,
    NgtDirectionalLightModule,
    NgtSpotLightModule,
    NgtPointLightModule,

    NgtMeshLambertMaterialModule,
    NgtMeshStandardMaterialModule,

    NgtPhysicsModule,

    NgtCannonDebugModule,

    NgtSobaOrbitControlsModule,
    NgtSobaTextModule,
    NgtColorAttributeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
