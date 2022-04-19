import { Component } from "@angular/core";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  examples = [
    'threejs',
    'bounce',
    'body_types',
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
    'hinge',
    'impulses',
    'jenga',
    'mousepick',
    'performance',
    'pile',
    'spring',
    'stacks',
    'tear',
    'trigger',
    'trimesh',
    'tween',
    'worker',
  ]

  almost = [
    'ragdoll',
    'heightfield',
    'convex',
    'sleep',
  ]

  feature = [
    'rigid_vehicle',
    'raycast_vehicle',
    'cloth',
    'callbacks',
  ]
}
