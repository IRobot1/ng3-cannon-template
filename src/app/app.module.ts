import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgtColorPipeModule, NgtCoreModule } from '@angular-three/core';
import { NgtMeshModule } from '@angular-three/core/meshes'
import { NgtMeshBasicMaterialModule } from '@angular-three/core/materials';
import { NgtBoxGeometryModule } from '@angular-three/core/geometries';
import { NgtHemisphereLightModule } from '@angular-three/core/lights';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    NgtCoreModule,
    NgtMeshModule,
    NgtColorPipeModule,

    NgtHemisphereLightModule,

    NgtBoxGeometryModule,
    NgtMeshBasicMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
