import { Component } from "@angular/core";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  examples = [
    'cloth',
    'cable',
    'bounce',
    'body_types',
    'callbacks',
    'conveyor',
    'conditional',
    'collision_filter',
    'collisions',
    'compound',
    'constraints',
    'container',
    'events',
    'fps',
    'fixed_rotation',
    'friction',
    'heightfield',
    'hinge',
    'impulses',
    'jenga',
    'mousepick',
    'performance',
    'pile',
    'ragdoll',
    'raycast_vehicle',
    'rolling',
    'spring',
    'stacks',
    'tear',
    'threejs',
    'trigger',
    'trimesh',
    'tween',
    'worker',
  ]

  almost = [
    'centerofmass',
    'convex',
    'sleep',
  ]

  feature = [
    'rigid_vehicle',
  ]
}
