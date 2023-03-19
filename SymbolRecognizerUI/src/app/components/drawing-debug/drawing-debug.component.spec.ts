import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingDebugComponent } from './drawing-debug.component';

describe('DrawingDebugComponent', () => {
  let component: DrawingDebugComponent;
  let fixture: ComponentFixture<DrawingDebugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawingDebugComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
