import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MediaGeneralInfoComponent } from "./media-general-info.component";

describe("MediaGeneralInfoComponent", () => {
    let component: MediaGeneralInfoComponent;
    let fixture: ComponentFixture<MediaGeneralInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MediaGeneralInfoComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MediaGeneralInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
