import { Component } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  examples = [
    'fps',
    'conveyor',
    'conditional',
    'bounce',
    'collision_filter',
    'collisions',
    'compound',
    'container',
    'events',
    'fixed_rotation',
    'friction',
    'hinge',
    'impulses',
    'jenga',
    'performance',
    'pile',
    'stacks',
    'threejs',
    'trigger',
    'tween', 
    'worker',
  ]

  almost = [
    'constraints',
    'heightfield',
    'mousepick',
    'body_types',
    'convex',
    'sleep',
    'trimesh',
  ]

  feature = [
    'ragdoll',
    'cloth',
    'spring',
    'callbacks',
  ]

  todo = [
    'raycast_vehicle',
    'rigid_vehicle',
    'tear',
  ]
}
