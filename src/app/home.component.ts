import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(
    private router: ActivatedRoute,
    private route: Router,
  ) {
    this.router.queryParams.subscribe(next => {
      const example = next['example'];
      if (example) {
        this.route.navigate(['/' + example]);
      }
    })
  }
}
