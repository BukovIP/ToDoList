import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  from,
  fromEvent,
  map,
  merge,
  pairwise,
  switchMap,
  takeUntil,
  tap
} from "rxjs";
import {Point} from "../../interfaces/point";

@Component({
  selector: 'app-drawing',
  templateUrl: 'drawing.component.html',
  styleUrls: ['drawing.component.css']
})
export class DrawingComponent implements OnInit {
  @Output() onData: EventEmitter<{ prevPos: Point, currentPos: Point }> = new EventEmitter();
  @Output() onShape: EventEmitter<Point[]> = new EventEmitter();

  @Input() public width = 600;
  @Input() public height = 400;

  @Input() public initialData: Point[] = [];

  @ViewChild('canvas', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D | null;

  shape: Point[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    if (!this.ctx)
      throw new Error('There is no context.');

    this.drawInitialData();
    this.captureEvents(this.canvas.nativeElement);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    const mousedown$ = fromEvent<MouseEvent>(canvasEl, 'mousedown');
    const mousemove$ = fromEvent<MouseEvent>(canvasEl, 'mousemove');
    const mouseup$ = fromEvent<MouseEvent>(canvasEl, 'mouseup');
    const mouseleave$ = fromEvent<MouseEvent>(canvasEl, 'mouseleave');

    merge(mouseup$, mouseleave$).subscribe(()=>this.onShapeEnded());
    mousedown$
      .pipe(
        switchMap(_ => {
          return mousemove$
            .pipe(
              takeUntil(mouseup$),
              takeUntil(mouseleave$),
              pairwise()
            )
        }),
        map(res => {
          // previous and current position with the offset
          const rect = canvasEl.getBoundingClientRect();
          const prevPos: Point = {
            x: res[0].clientX - rect.left,
            y: res[0].clientY - rect.top
          };
          const currentPos: Point = {
            x: res[1].clientX - rect.left,
            y: res[1].clientY - rect.top
          };
          return {prevPos, currentPos};
        }),
        tap(e => this.onData.emit(e)),
        tap(e => this.storeShape(e.prevPos, e.currentPos)),
        tap(e => this.drawOnCanvas(e.prevPos, e.currentPos))
      )
      .subscribe();
  }

  private onShapeEnded(): void {
    if (this.shape && this.shape.length > 0) {
      this.onShape.emit(this.shape);
      this.shape = [];
      console.log("Shape completed.");
    }
  }

  private storeShape(_: Point, currentPos: Point): void {
    if (currentPos)
      this.shape.push(currentPos);
  }

  private drawOnCanvas(prevPos: Point, currentPos: Point) {
    if (!this.ctx)
      return;

    if (prevPos) {
      this.ctx.beginPath();

      this.ctx.moveTo(prevPos.x, prevPos.y); // from
      this.ctx.lineTo(currentPos.x, currentPos.y);
      this.ctx.stroke();
    }
  }

  private drawInitialData(): void {
    if (!this.initialData || this.initialData.length == 0)
      return;

    from(this.initialData)
      .pipe(
        pairwise(),
        tap(e=>this.drawOnCanvas(e[0], e[1]) ))
      .subscribe();
  }
}
