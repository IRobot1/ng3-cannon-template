import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgtColorPipeModule, NgtCoreModule, NgtRadianPipeModule, NgtVectorPipeModule } from '@angular-three/core';
import { NgtMeshModule } from '@angular-three/core/meshes'
import { NgtMeshLambertMaterialModule, NgtShadowMaterialModule } from '@angular-three/core/materials';
import { NgtBoxGeometryModule, NgtPlaneGeometryModule } from '@angular-three/core/geometries';
import { NgtAmbientLightModule, NgtDirectionalLightModule } from '@angular-three/core/lights';

import { NgtPhysicsModule } from '@angular-three/cannon';
import { NgtPhysicBoxModule,  NgtPhysicPlaneModule} from '@angular-three/cannon/bodies';

import { AppComponent } from './app.component';
import { PlaneComponent } from './components/storybook-plane.component';
import { CubeComponent } from './components/storybook-cube.component';
import { NgtCannonDebugModule } from '@angular-three/cannon/debug';

@NgModule({
  declarations: [
    AppComponent,
    PlaneComponent,
    CubeComponent,
  ],
  imports: [
    BrowserModule,

    NgtAmbientLightModule,
    NgtBoxGeometryModule,
    NgtColorPipeModule,
    NgtCoreModule,
    NgtDirectionalLightModule,
    NgtMeshLambertMaterialModule,
    NgtMeshModule,
    NgtPlaneGeometryModule,
    NgtRadianPipeModule,
    NgtShadowMaterialModule,
    NgtVectorPipeModule,

    NgtPhysicsModule,
    NgtPhysicBoxModule,
    NgtPhysicPlaneModule,
    NgtPhysicPlaneModule,
    NgtCannonDebugModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
