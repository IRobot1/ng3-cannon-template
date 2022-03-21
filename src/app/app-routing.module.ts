import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BounceComponent } from './examples/bounce/bounce.component';
import { CollisionFilterComponent } from './examples/collision-filter/collision-filter.component';
import { CollisionsComponent } from './examples/collisions/collisions.component';
import { ThreeJSComponent } from './examples/threejs/threejs.component';
import { VRComponent } from './examples/vr/vr.component';
import { WorkerComponent } from './examples/worker/worker.component';
import { HomeComponent } from './home.component';
import { TodoComponent } from './todo.component';


const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'threejs_cloth', component: TodoComponent },
  { path: 'threejs_fps', component: TodoComponent },
  { path: 'threejs_mousepick', component: TodoComponent },
  { path: 'threejs_voxel_fps', component: TodoComponent },
  { path: 'threejs', component: ThreeJSComponent },
  { path: 'worker', component: WorkerComponent },
  { path: 'worker_sharedarraybuffer', component: TodoComponent },
  { path: 'body_types', component: TodoComponent },
  { path: 'bounce', component: BounceComponent },
  { path: 'bunny', component: TodoComponent },
  { path: 'callbacks', component: TodoComponent },
  { path: 'canvas_interpolation', component: TodoComponent },
  { path: 'collision_filter', component: CollisionFilterComponent },
  { path: 'collisions', component: CollisionsComponent },
  { path: 'compound', component: TodoComponent },
  { path: 'constraints', component: TodoComponent },
  { path: 'container', component: TodoComponent },
  { path: 'convex', component: TodoComponent },
  { path: 'events', component: TodoComponent },
  { path: 'fixed_rotation', component: TodoComponent },
  { path: 'friction', component: TodoComponent },
  { path: 'heightfield', component: TodoComponent },
  { path: 'hinge', component: TodoComponent },
  { path: 'impulses', component: TodoComponent },
  { path: 'jenga', component: TodoComponent },
  { path: 'pile', component: TodoComponent },
  { path: 'performance', component: TodoComponent },
  { path: 'ragdoll', component: TodoComponent },
  { path: 'raycast_vehicle', component: TodoComponent },
  { path: 'rigid_vehicle', component: TodoComponent },
  { path: 'shapes', component: TodoComponent },
  { path: 'simple_friction', component: TodoComponent },
  { path: 'single_body_on_plane', component: TodoComponent },
  { path: 'sleep', component: TodoComponent },
  { path: 'sph', component: TodoComponent },
  { path: 'split_solver', component: TodoComponent },
  { path: 'spring', component: TodoComponent },
  { path: 'stacks', component: TodoComponent },
  { path: 'tear', component: TodoComponent },
  { path: 'trigger', component: TodoComponent },
  { path: 'trimesh', component: TodoComponent },
  { path: 'tween', component: TodoComponent },
  { path: 'vr', component: VRComponent },
  { path: '**', redirectTo: '/' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
