import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {fromEvent, pairwise, switchMap, takeUntil} from "rxjs";
import {Point} from "../../interfaces/point";

@Component({
  selector: 'app-drawing',
  templateUrl: 'drawing.component.html',
  styleUrls: ['drawing.component.css']
})
export class DrawingComponent implements OnInit {
  @Input() public width = 600;
  @Input() public height = 400;
  @Input() public onData: object = (prevPos: Point, currentPos: Point): void=>{};
  @Input() public initialData: Point[] = [];

  @ViewChild('canvas', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D | null;

  constructor() {
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    if (!this.ctx)
      return;

    this.ctx.lineWidth = 5;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000';

    this.drawInitialData();

    this.captureEvents(this.canvas.nativeElement);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    fromEvent<MouseEvent>(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent<MouseEvent>(canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point
              pairwise()
            )
        })
      )
      .subscribe(res => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos: Point = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos: Point = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        // this method we'll implement soon to do the actual drawing
        this.processor(prevPos, currentPos);
        this.drawOnCanvas(prevPos, currentPos);
      }, console.error, () => console.log("complete"));
  }

  private processor(prevPos: Point, currentPos: Point) {
    //this.onData(prevPos, currentPos);
    console.log(prevPos, currentPos);

  }

  private drawOnCanvas(prevPos: Point | null, currentPos: Point) {
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
    if (this.initialData == null)
      return;

    if (this.initialData.length == 0)
      return;

    let prevPoint: Point | null = null;
    for (let i = 0; i < this.initialData.length; i++) {
      let currentPoint = this.initialData[i];
      this.drawOnCanvas(prevPoint, currentPoint);
      prevPoint = currentPoint;
    }
  }
}
