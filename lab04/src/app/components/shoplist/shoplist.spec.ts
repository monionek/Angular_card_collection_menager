import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shoplist } from './shoplist';

describe('Shoplist', () => {
  let component: Shoplist;
  let fixture: ComponentFixture<Shoplist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shoplist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Shoplist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
