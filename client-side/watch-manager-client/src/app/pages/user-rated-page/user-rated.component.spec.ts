import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRatedComponent } from './user-rated.component';

describe('UserRatedComponent', () => {
  let component: UserRatedComponent;
  let fixture: ComponentFixture<UserRatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
