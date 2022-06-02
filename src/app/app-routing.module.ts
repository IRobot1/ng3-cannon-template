import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyTypesComponent } from './examples/body_types/body_types.component';
import { BounceComponent } from './examples/bounce/bounce.component';
import { ClothComponent } from './examples/cloth/cloth.component';
import { CollisionFilterComponent } from './examples/collision_filter/collision_filter.component';
import { CollisionsComponent } from './examples/collisions/collisions.component';
import { CompoundComponent } from './examples/compound/compound.component';
import { ContainerComponent } from './examples/container/container.component';
import { ConvexComponent } from './examples/convex/convex.component';
import { EventsComponent } from './examples/events/events.component';
import { FixedRotationComponent } from './examples/fixed_rotation/fixed_rotation.component';
import { FPSComponent } from './examples/fps/fps.component';
import { FrictionComponent } from './examples/friction/friction.component';
import { ImpulseComponent } from './examples/impulse/impulse.component';
import { JengaComponent } from './examples/jenga/jenga.component';
import { PerformanceComponent } from './examples/performance/performance.component';
import { PileComponent } from './examples/pile/pile.component';
import { SleepComponent } from './examples/sleep/sleep.component';
import { StacksComponent } from './examples/stacks/stacks.component';
import { ThreeJSComponent } from './examples/threejs/threejs.component';
import { TriggerComponent } from './examples/trigger/trigger.component';
import { TrimeshComponent } from './examples/trimesh/trimesh.component';
import { TweenComponent } from './examples/tween/tween.component';
import { WorkerComponent } from './examples/worker/worker.component';
import { HomeComponent } from './home.component';
import { ConveyorComponent } from './examples/conveyor/conveyor.component';
import { ConditionalComponent } from './examples/conditional/conditional.component';
import { MousePickComponent } from './examples/mousepick/mousepick.component';
import { CallbacksComponent } from './examples/callbacks/callbacks.component';
import { HeightfieldComponent } from './examples/heightfield/heightfield.component';
import { HingeComponent } from './examples/hinge/hinge.component';
import { ConstraintsComponent } from './examples/constraints/constraints.component';
import { RagdollComponent } from './examples/ragdoll/ragdoll.component';
import { SpringComponent } from './examples/spring/spring.component';
import { TearComponent } from './examples/tear/tear.component';
import { RigidVehicleComponent } from './examples/rigid_vehicle/rigid_vehicle.component';
import { RaycastVehicleExampleComponent } from './examples/raycast_vehicle/raycast_vehicle.component';
import { CableComponent } from './examples/cable/cable.component';
import { CenterOfMassComponent } from './examples/centerofmass/centerofmass.component';
import { RollingComponent } from './examples/rolling/rolling.component';


const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'rolling', component: RollingComponent },
  { path: 'centerofmass', component: CenterOfMassComponent },
  { path: 'cable', component: CableComponent },
  { path: 'conditional', component: ConditionalComponent },
  { path: 'conveyor', component: ConveyorComponent },
  { path: 'cloth', component: ClothComponent },
  { path: 'fps', component: FPSComponent },
  { path: 'mousepick', component: MousePickComponent },
  { path: 'threejs', component: ThreeJSComponent },
  { path: 'worker', component: WorkerComponent },
  { path: 'body_types', component: BodyTypesComponent },
  { path: 'bounce', component: BounceComponent },
  { path: 'callbacks', component: CallbacksComponent },
  { path: 'collision_filter', component: CollisionFilterComponent },
  { path: 'collisions', component: CollisionsComponent },
  { path: 'compound', component: CompoundComponent },
  { path: 'constraints', component: ConstraintsComponent },
  { path: 'container', component: ContainerComponent },
  { path: 'convex', component: ConvexComponent },
  { path: 'events', component: EventsComponent },
  { path: 'fixed_rotation', component: FixedRotationComponent },
  { path: 'friction', component: FrictionComponent },
  { path: 'heightfield', component: HeightfieldComponent },
  { path: 'hinge', component: HingeComponent },
  { path: 'impulses', component: ImpulseComponent },
  { path: 'jenga', component: JengaComponent },
  { path: 'pile', component: PileComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: 'ragdoll', component: RagdollComponent },
  { path: 'raycast_vehicle', component: RaycastVehicleExampleComponent },
  { path: 'rigid_vehicle', component: RigidVehicleComponent },
  { path: 'sleep', component: SleepComponent },
  { path: 'spring', component: SpringComponent },
  { path: 'stacks', component: StacksComponent },
  { path: 'tear', component: TearComponent },
  { path: 'trigger', component: TriggerComponent },
  { path: 'trimesh', component: TrimeshComponent },
  { path: 'tween', component: TweenComponent },
  { path: '**', redirectTo: '/' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
