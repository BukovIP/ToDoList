import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceRecognizerDebuggerComponent } from './voice-recognizer-debugger.component';

describe('VoiceRecognizerDebuggerComponent', () => {
  let component: VoiceRecognizerDebuggerComponent;
  let fixture: ComponentFixture<VoiceRecognizerDebuggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiceRecognizerDebuggerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceRecognizerDebuggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
