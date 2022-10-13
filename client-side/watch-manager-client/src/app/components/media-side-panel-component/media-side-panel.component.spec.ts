import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSidePanelComponent } from './media-side-panel.component';

describe('MediaSidePanelComponent', () => {
  let component: MediaSidePanelComponent;
  let fixture: ComponentFixture<MediaSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaSidePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
