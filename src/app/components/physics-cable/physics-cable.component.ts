import { AfterViewInit, NgZone, Component, Input } from "@angular/core";

import { CatmullRomCurve3, ExtrudeGeometry, Object3D, Shape, Vector2, Vector3 } from "three";
import { NgtComponentStore, NgtTriple, tapEffect } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicBodyReturn, NgtPhysicConstraint } from "@angular-three/cannon";

class CableSegment {
  constructor(public body: NgtPhysicBodyReturn<Object3D>, public position: NgtTriple) { }
}

export class CableState {
  startPosition!: NgtTriple;
  endPosition!: NgtTriple;
  showmarker!: boolean;
}

@Component({
  selector: 'physics-cable',
  templateUrl: 'physics-cable.component.html',
  providers: [NgtPhysicBody, NgtPhysicConstraint],
})
export class PhysicsCableComponent
  extends NgtComponentStore<CableState>
  implements AfterViewInit {
  @Input() attachStart = true;

  @Input() set startPosition(position: NgtTriple) {
    this.set({ startPosition: position });
    if (this.particles.length == 0) {
      const endPosition = this.get(s => s.endPosition);
      if (endPosition)
        this.setupConstraint();
    }
  }

  @Input() attachEnd = true;
  @Input() set endPosition(position: NgtTriple) {
    this.set({ endPosition: position });
    if (this.particles.length == 0) {
      const startPosition = this.get(s => s.startPosition);
      if (startPosition)
        this.setupConstraint();
    }
  }
  @Input() set showmarker(showmarker: boolean) {
    this.set({ showmarker });
  }

  @Input() steps = 10;
  @Input() color = 'white'

  private _width = 0.1;
  @Input()
  get width(): number {
    return this._width;
  }
  set width(width: number) {
    this._width = width;
    this.initShape();
  }
  private _sides = 16;
  @Input()
  get sides(): number {
    return this._sides;
  }
  set sides(sides: number) {
    if (sides > 2) {
      this._width = sides;
      this.initShape();
    }
  }

  // must set these values before startPosition and endPosition, changing after is not supported
  @Input() segments = 10;
  @Input() strength = 1000;
  @Input() stretch = 1.1;

  particles: Array<CableSegment> = [];
  readonly particlesize = 0.2;
  geo!: ExtrudeGeometry;

  private points: Array<Vector3> = [];
  private shape!: Shape;


  constructor(
    private physicBody: NgtPhysicBody,
    private physicConstraint: NgtPhysicConstraint,
    private zone: NgZone,
  ) {
    super();
    this.initShape();
  }

  private initShape() {
    const circle: Array<Vector2> = [];
    const factor = Math.PI * 2 / (this.sides);
    let angle = factor;
    for (let i = 1; i < this.sides + 1; i++) {
      circle.push(new Vector2(Math.cos(angle) * this.width, Math.sin(angle) * this.width));
      angle += factor;
    }
    this.shape = new Shape(circle);
  }

  private setupConstraint() {
    const startPosition = this.get(s => s.startPosition);
    const endPosition = this.get(s => s.endPosition);

    const start = new Vector3(startPosition[0], startPosition[1], startPosition[2]);
    const end = new Vector3(endPosition[0], endPosition[1], endPosition[2]);

    // calculate from start position to end position, number of segments
    const step = end.sub(start).divideScalar(this.segments);
    const distance = step.length() * this.stretch;

    this.particles = [];
    this.points = [];

    let lastBody!: NgtPhysicBodyReturn<Object3D>;

    for (let i = 0; i < this.segments + 1; i++) {
      const position = start.toArray() as NgtTriple;

      let mass = 0.1;
      // first and last positions are fixed
      if ((i == 0 && this.attachStart) || (i == this.segments && this.attachEnd)) {
        mass = 0;

      }
      const body = this.physicBody.useParticle(() => ({
        mass: mass,
        position: position,
        args: [this.particlesize, 2, 2],
        linearDamping: 0.5,
        angularDamping: 0.5,
        allowSleep: true,
        sleepSpeedLimit: 0.1,
        sleepTimeLimit: 0.1
      }));

      this.particles.push(new CableSegment(body, position));
      this.points.push(new Vector3(position[0], position[1], position[2]));

      if (lastBody) {
        const x = this.physicConstraint.useDistanceConstraint(body.ref, lastBody.ref, {
          distance: distance,
          maxMultiplier: this.strength, // higher multiplier makes links stronger
        });
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

    this.startChanges(this.select((s) => s.startPosition));
    this.endChanges(this.select((s) => s.endPosition));
    this.showMarkerChanges(this.select((s) => s.showmarker));

    this.refresh();
  }

  readonly startChanges = this.effect<NgtTriple>(
    tapEffect(next => {
      if (this.particles.length > 0) {
        this.particles[0].body.api.position.set(next[0], next[1], next[2]);
      }
    })
  );

  readonly showMarkerChanges = this.effect<boolean>(
    tapEffect(next => {
      this.particles.forEach(p => {
        p.body.ref.value.visible = next;
      });
    })
  );

  readonly endChanges = this.effect<NgtTriple>(
    tapEffect(next => {
      if (this.particles.length > 0) {
        this.particles[this.particles.length - 1].body.api.position.set(next[0], next[1], next[2])
      }
    })
  );

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
        if (this.points.length > 0) {
          if (this.geo)
            this.geo.dispose();
          this.geo = new ExtrudeGeometry(this.shape, {
            steps: this.steps,
            extrudePath: new CatmullRomCurve3(this.points),
          })
        }
      }, 1000 / 60)

      return () => {
        clearInterval(cleanup);
      };
    })
  );
}
