import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonInfoComponent } from './season-info.component';

describe('SeasonInfoComponent', () => {
  let component: SeasonInfoComponent;
  let fixture: ComponentFixture<SeasonInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeasonInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
