import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./components/app-component/app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// MATERIAL
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

// CUSTOM
import { FooterComponent } from "./components/footer-component/footer.component";
import { LatestComponent } from "./components/latest-component/latest.component";
import { CardComponent } from "./components/card-component/card.component";
import { DatePipe } from "./pipes/date-pipe/date.pipe";
import { MediaSidePanelComponent } from "./components/media-side-panel-component/media-side-panel.component";
import { MediaGeneralInfoComponent } from "./components/media-general-info-component/media-general-info.component";
import { DateYearPipe } from "./pipes/date-year-pipe/date-year.pipe";
import { ReviewComponent } from "./components/reivew-component/review.component";
import { ViewMoreCardComponent } from "./components/view-more-card-component/view-more-card.component";

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        LatestComponent,
        CardComponent,
        DatePipe,
        MediaSidePanelComponent,
        MediaGeneralInfoComponent,
        DateYearPipe,
        ReviewComponent,
        ViewMoreCardComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        // MATERIAL
        MatToolbarModule,
        MatTabsModule,
        MatCardModule,
        MatProgressBarModule,
        MatButtonModule,
        MatIconModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
