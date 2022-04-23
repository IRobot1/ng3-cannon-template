import { Component, Input } from "@angular/core";
import { AfterViewInit, NgZone } from "@angular/core";

import { CatmullRomCurve3, ExtrudeGeometryOptions, Shape, Vector2, Vector3 } from "three";
import { NgtComponentStore, NgtTriple, tapEffect } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicBodyReturn, NgtPhysicConstraint } from "@angular-three/cannon";

class CableSegment {
  constructor(public body: NgtPhysicBodyReturn, public position: NgtTriple) { }
}

export type CurveType = 'centripetal' | 'chordal' | 'catmullrom';

@Component({
  selector: 'physics-cable',
  templateUrl: 'physics-cable.component.html',
  providers: [NgtPhysicBody, NgtPhysicConstraint],
})
export class PhysicsCableComponent extends NgtComponentStore implements AfterViewInit {
  @Input() attachStart = true;
  @Input() startPosition = [0, 2, 2] as NgtTriple;
  @Input() attachEnd = true;
  @Input() endPosition = [0, 2, -2] as NgtTriple;
  @Input() segments = 10;
  @Input() showmarker = false;
  @Input() color = 'white'

  @Input() width = 0.1;
  @Input() sides = 16;
  @Input() strength = 1000;
  @Input() stretch = 1.1;


  private points: Array<Vector3> = [];
  private curveType: CurveType = 'catmullrom'
  private spline!: CatmullRomCurve3;

  // this gets called as a result of change detection, there's no other way to refresh extrude-geometry
  get extrudesettings(): ExtrudeGeometryOptions {
    return {
      steps: 20,
      extrudePath: this.spline,
    }
  }

  particles: Array<CableSegment> = [];

  readonly particlesize = 0.2;
  readonly shape!: Shape;

  constructor(
    private physicBody: NgtPhysicBody,
    private physicConstraint: NgtPhysicConstraint,
    private zone: NgZone,
  ) {
    super();

    const circle: Array<Vector2> = [];
    const factor = Math.PI * 2 / (this.sides);
    let angle = factor;
    for (let i = 1; i < this.sides + 1; i++) {
      circle.push(new Vector2(Math.cos(angle) * this.width, Math.sin(angle) * this.width));
      angle += factor;
    }
    this.shape = new Shape(circle);

    this.setupConstraint();
  }

  private setupConstraint() {
    const start = new Vector3(this.startPosition[0], this.startPosition[1], this.startPosition[2]);
    const end = new Vector3(this.endPosition[0], this.endPosition[1], this.endPosition[2]);

    // calculate from start position to end position, number of segments
    const step = end.sub(start).divideScalar(this.segments);
    const distance = step.length() * this.stretch;

    this.particles = [];
    this.points = [];

    let lastBody!: NgtPhysicBodyReturn;

    for (let i = 0; i < this.segments + 1; i++) {
      const position = start.toArray() as NgtTriple;

      let mass = 1;
      // first and last positions are fixed
      if ((i == 0 && this.attachStart) || (i == this.segments && this.attachEnd)) {
        mass = 0;

      }
      const body = this.physicBody.useParticle(() => ({
        mass: mass,
        position: position,
        args: [this.particlesize, 2, 2],
        linearDamping: 0.5,
        allowSleep: true,
        sleepSpeedLimit: 0.1,
        sleepTimeLimit: 0.1,
      }));

      this.particles.push(new CableSegment(body, position));
      this.points.push(new Vector3(position[0], position[1], position[2]));

      if (lastBody) {
        this.physicConstraint.useDistanceConstraint(body.ref, lastBody.ref, {
          distance: distance,
          maxMultiplier: this.strength, // higher multiplier makes links stronger
        })
      }

      lastBody = body
      start.add(step);
    }
  }

  ngAfterViewInit(): void {
    // anything physics related, we might want to run outside of Angular zone to prevent Change Detection ticks
    this.zone.runOutsideAngular(() => {
      this.monitorPositions();
    });

    this.refresh();
  }

  readonly monitorPositions = this.effect<void>(
    tapEffect(() => {
      const cleanup: Array<any> = [];

      // spline points position changes as bodies changed by gravity
      this.particles.forEach((p, i) => {
        const unsubscribe = p.body.api.position.subscribe(next => {
          this.points[i].set(next[0], next[1], next[2]);
        });
        cleanup.push(unsubscribe);
      })
      return () => {
        cleanup.forEach(unsub => unsub());
      };
    })
  );

  readonly refresh = this.effect<void>(
    tapEffect(() => {
      // this causes update via change detection
      const cleanup = setInterval(() => {
        this.spline = new CatmullRomCurve3(this.points);
      }, 1000 / 60)

      return () => {
        clearInterval(cleanup);
      };
    })
  );
}
