import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCastComponent } from './all-cast.component';

describe('AllCastComponent', () => {
  let component: AllCastComponent;
  let fixture: ComponentFixture<AllCastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
