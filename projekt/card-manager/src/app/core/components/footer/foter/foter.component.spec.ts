import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoterComponent } from './foter.component';

describe('FoterComponent', () => {
  let component: FoterComponent;
  let fixture: ComponentFixture<FoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
