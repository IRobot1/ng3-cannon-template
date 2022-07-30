import { Component } from "@angular/core";


@Component({
  selector: 'events-example',
  templateUrl: 'events-example.component.html',
})
export class EventsExample {


  onCollide(event: any) {
    console.log('The sphere just collided with the ground!')
    console.log('Collided with body:', event.body.name, event.body)
    console.log('Contact between bodies:', event.contact)
  }

}

@Component({
  templateUrl: './events.component.html',
})
export class EventsComponent {
}
