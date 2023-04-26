import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWatchedComponent } from './user-watched.component';

describe('UserWatchedComponent', () => {
  let component: UserWatchedComponent;
  let fixture: ComponentFixture<UserWatchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWatchedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
