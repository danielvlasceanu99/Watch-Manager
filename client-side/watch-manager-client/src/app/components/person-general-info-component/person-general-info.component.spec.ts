import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonGeneralInfoComponent } from './person-general-info.component';

describe('PersonGeneralInfoComponent', () => {
  let component: PersonGeneralInfoComponent;
  let fixture: ComponentFixture<PersonGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonGeneralInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
