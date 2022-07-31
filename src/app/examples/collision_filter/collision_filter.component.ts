import { Component } from "@angular/core";


@Component({
  selector:'collisionfilter-example',
  templateUrl: 'collision_filter-example.component.html',

})
export class CollisionFilterExample {
  filterMask = 2 | 4;
}

@Component({
  templateUrl: './collision_filter.component.html',
})
export class CollisionFilterComponent {
}
