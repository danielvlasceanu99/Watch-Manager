import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSidePanelComponent } from './person-side-panel.component';

describe('PersonSidePanelComponent', () => {
  let component: PersonSidePanelComponent;
  let fixture: ComponentFixture<PersonSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonSidePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
