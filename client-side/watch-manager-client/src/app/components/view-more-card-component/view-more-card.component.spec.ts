import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ViewMoreCardComponent } from "./view-more-card.component";

describe("ViewMoreCardComponent", () => {
    let component: ViewMoreCardComponent;
    let fixture: ComponentFixture<ViewMoreCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ViewMoreCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ViewMoreCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
