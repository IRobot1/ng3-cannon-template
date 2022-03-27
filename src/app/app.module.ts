import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgtColorPipeModule, NgtCoreModule, NgtRadianPipeModule, NgtVectorPipeModule } from '@angular-three/core';
import { NgtStatsModule } from '@angular-three/core/stats';
import { NgtInstancedMeshModule, NgtMeshModule } from '@angular-three/core/meshes';
import { NgtGroupModule } from '@angular-three/core/group';
import { NgtMeshLambertMaterialModule, NgtMeshStandardMaterialModule } from '@angular-three/core/materials';
import { NgtBoxGeometryModule, NgtCylinderGeometryModule, NgtPlaneGeometryModule, NgtSphereGeometryModule, NgtTorusGeometryModule } from '@angular-three/core/geometries';
import { NgtAmbientLightModule, NgtDirectionalLightModule, NgtSpotLightModule } from '@angular-three/core/lights';
import { NgtArrowHelperModule, NgtBoxHelperModule } from '@angular-three/core/helpers';
import { NgtInstancedBufferAttributeModule } from '@angular-three/core/attributes';

import { NgtPhysicsModule } from '@angular-three/cannon';
import { NgtPhysicBoxModule, NgtPhysicCompoundModule, NgtPhysicCylinderModule, NgtPhysicPlaneModule, NgtPhysicSphereModule, NgtPhysicTrimeshModule } from '@angular-three/cannon/bodies';

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
import { TodoComponent } from './todo.component';
import { ThreeJSComponent } from './examples/threejs/threejs.component';
import { WorkerComponent } from './examples/worker/worker.component';
import { BounceComponent } from './examples/bounce/bounce.component';
import { CollisionFilterComponent } from './examples/collision-filter/collision-filter.component';
import { CollisionsComponent } from './examples/collisions/collisions.component';
import { CompoundComponent } from './examples/compound/compound.component';
import { ContainerComponent } from './examples/container/container.component';
import { EventsComponent } from './examples/events/events.component';
import { FixedRotationComponent } from './examples/fixed-rotation/fixed-rotation.component';
import { FrictionComponent } from './examples/friction/friction.component';
import { ImpulseComponent } from './examples/impulse/impulse.component';
import { JengaComponent } from './examples/jenga/jenga.component';
import { TriggerComponent } from './examples/trigger/trigger.component';
import { TrimeshComponent } from './examples/trimesh/trimesh.component';
import { SleepComponent } from './examples/sleep/sleep.component';
import { TweenComponent } from './examples/tween/tween.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoComponent,
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

    VRComponent,

    PlaneComponent,
    CubeComponent,
    TriggerCubeComponent,
    XRBatComponent,
    XRInspectComponent,
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
    NgtInstancedBufferAttributeModule,

    NgtAmbientLightModule,
    NgtDirectionalLightModule,
    NgtSpotLightModule,

    NgtMeshLambertMaterialModule,
    NgtMeshStandardMaterialModule,

    NgtPhysicsModule,
    NgtPhysicBoxModule,
    NgtPhysicPlaneModule,
    NgtPhysicSphereModule,
    NgtPhysicCylinderModule,
    NgtPhysicCompoundModule,
    NgtPhysicTrimeshModule,
    NgtCannonDebugModule,

    NgtSobaOrbitControlsModule,
    NgtSobaTextModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
