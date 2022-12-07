import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonGroupComponent } from './season-group.component';

describe('SeasonGroupComponent', () => {
  let component: SeasonGroupComponent;
  let fixture: ComponentFixture<SeasonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeasonGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
