import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInstructionComponent } from './game-instruction.component';

describe('GameInstructionComponent', () => {
  let component: GameInstructionComponent;
  let fixture: ComponentFixture<GameInstructionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameInstructionComponent]
    });
    fixture = TestBed.createComponent(GameInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
