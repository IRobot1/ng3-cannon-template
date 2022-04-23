import { NgtTriple } from "@angular-three/core";
import { AfterViewInit } from "@angular/core";
import { Component } from "@angular/core";

@Component({
  templateUrl: './cable.component.html',
})
export class CableComponent implements AfterViewInit {
  startz = 2;
  endz = -2;
  startPosition = [0, 2, this.startz] as NgtTriple
  endPosition = [0, 2, this.endz] as NgtTriple;

  ngAfterViewInit(): void {
    let startchange = 0.1;
    let endchange = 0.1;
    setInterval(() => {
      if (this.startz >= 4 || this.startz <= -4)
        startchange = -startchange;
      if (this.endz >= 4 || this.endz <= -4)
        endchange = -endchange;
      this.startPosition = [0, 2, this.startz] as NgtTriple
      this.endPosition = [0, 2, this.endz] as NgtTriple
      this.startz += startchange;
      this.endz += endchange;
    }, 1000/30)
  }

}
