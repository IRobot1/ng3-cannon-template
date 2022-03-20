import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgtColorPipeModule, NgtCoreModule, NgtRadianPipeModule, NgtVectorPipeModule } from '@angular-three/core';
import { NgtStatsModule } from '@angular-three/core/stats';
import { NgtInstancedMeshModule, NgtMeshModule } from '@angular-three/core/meshes';
import { NgtGroupModule } from '@angular-three/core/group';
import { NgtMeshLambertMaterialModule, NgtMeshStandardMaterialModule } from '@angular-three/core/materials';
import { NgtBoxGeometryModule, NgtPlaneGeometryModule, NgtSphereGeometryModule } from '@angular-three/core/geometries';
import { NgtAmbientLightModule, NgtDirectionalLightModule } from '@angular-three/core/lights';

import { NgtPhysicsModule } from '@angular-three/cannon';
import { NgtPhysicBoxModule, NgtPhysicPlaneModule, NgtPhysicSphereModule } from '@angular-three/cannon/bodies';

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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoComponent,
    ThreeJSComponent,
    WorkerComponent,
    BounceComponent,

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

    NgtAmbientLightModule,
    NgtDirectionalLightModule,

    NgtMeshLambertMaterialModule,
    NgtMeshStandardMaterialModule,

    NgtPhysicsModule,
    NgtPhysicBoxModule,
    NgtPhysicPlaneModule,
    NgtPhysicSphereModule,
    NgtCannonDebugModule,

    NgtSobaOrbitControlsModule,
    NgtSobaTextModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
