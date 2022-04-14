import { Component } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
    'mousepick',
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
    'body_types',
    'convex',
    'sleep',
    'trimesh',
  ]

  feature = [
    'ragdoll',
    'rigid_vehicle',
    'raycast_vehicle',
    'cloth',
    'spring',
    'tear',
    'callbacks',
  ]
}
