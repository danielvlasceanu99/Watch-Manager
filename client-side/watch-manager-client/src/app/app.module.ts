import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app-component/app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// MATERIAL
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDividerModule } from "@angular/material/divider";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

// CUSTOM COMPONENTS
import { FooterComponent } from "./components/footer-component/footer.component";
import { CardComponent } from "./components/card-component/card.component";
import { MediaSidePanelComponent } from "./components/media-side-panel-component/media-side-panel.component";
import { MediaGeneralInfoComponent } from "./components/media-general-info-component/media-general-info.component";
import { ReviewComponent } from "./components/reivew-component/review.component";
import { ViewMoreCardComponent } from "./components/view-more-card-component/view-more-card.component";
import { ReviewListComponent } from "./components/review-list-component/review-list.component";
import { CastComponent } from "./components/cast-component/cast.component";

// CUSTOM PAGES
import { LatestComponent } from "./pages/latest-page/latest.component";
import { MovieDetailsComponent } from "./pages/movie-details-page/movie-details.component";
import { TvDetailsComponent } from "./pages/tv-details-page/tv-details.component";

// PIPES
import { DatePipe } from "./pipes/date-pipe/date.pipe";
import { DateYearPipe } from "./pipes/date-year-pipe/date-year.pipe";
import { RuntimePipe } from "./pipes/runtime-pipe/runtime.pipe";

@NgModule({
    declarations: [
        AppComponent,
        // COMPONENTS
        FooterComponent,
        CardComponent,
        MediaSidePanelComponent,
        MediaGeneralInfoComponent,
        ReviewComponent,
        ViewMoreCardComponent,
        ReviewListComponent,
        CastComponent,
        // PAGES
        MovieDetailsComponent,
        LatestComponent,
        TvDetailsComponent,
        // PIPES
        DateYearPipe,
        DatePipe,
        RuntimePipe,
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
        MatFormFieldModule,
        MatDividerModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
