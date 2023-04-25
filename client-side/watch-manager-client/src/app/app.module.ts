import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app-component/app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CookieService } from "ngx-cookie-service";

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
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";

// CUSTOM COMPONENTS
import { FooterComponent } from "./components/footer-component/footer.component";
import { CardComponent } from "./components/card-component/card.component";
import { MediaSidePanelComponent } from "./components/media-side-panel-component/media-side-panel.component";
import { MediaGeneralInfoComponent } from "./components/media-general-info-component/media-general-info.component";
import { ReviewComponent } from "./components/reivew-component/review.component";
import { ViewMoreCardComponent } from "./components/view-more-card-component/view-more-card.component";
import { ReviewListComponent } from "./components/review-list-component/review-list.component";
import { CastComponent } from "./components/cast-component/cast.component";
import { SeasonInfoComponent } from "./components/season-info-component/season-info.component";
import { EpisodeInfoComponent } from "./components/episode-info-component/episode-info.component";
import { SeasonGroupComponent } from "./components/season-group-component/season-group.component";
import { SearchFilterComponent } from "./components/search-filter-component/search-filter.component";
import { PersonGeneralInfoComponent } from "./components/person-general-info-component/person-general-info.component";
import { PersonSidePanelComponent } from "./components/person-side-panel-component//person-side-panel.component";
import { RatingDialogComponent } from "./components/rating-dialog-comnponent/rating-dialog.component";

// CUSTOM PAGES
import { LatestComponent } from "./pages/latest-page/latest.component";
import { MovieDetailsComponent } from "./pages/movie-details-page/movie-details.component";
import { TvDetailsComponent } from "./pages/tv-details-page/tv-details.component";
import { AllReviewsComponent } from "./pages/all-reviews-page/all-reviews.component";
import { AllCastComponent } from "./pages/all-cast-page/all-cast.component";
import { MoviesComponent } from "./pages/movies-page/movies.component";
import { TvShowsComponent } from "./pages/tv-shows-page/tv-shows/tv-shows.component";
import { PeopleComponent } from "./pages/people-page/people.component";
import { PersonDetailsComponent } from "./pages/person-details-page/person-details.component";
import { AboutUsComponent } from "./pages/about-us-page/about-us.component";
import { PrivacyComponent } from "./pages/privacy-page/privacy.component";
import { ContactUsComponent } from "./pages/contact-us-page/contact-us.component";
import { LoginComponent } from "./pages/login-page/login.component";
import { RegisterComponent } from "./pages/register-page/register.component";
import { MatTooltipModule } from "@angular/material/tooltip";

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
        SeasonInfoComponent,
        EpisodeInfoComponent,
        SeasonGroupComponent,
        SearchFilterComponent,
        PersonGeneralInfoComponent,
        PersonSidePanelComponent,
        RatingDialogComponent,
        // PAGES
        MovieDetailsComponent,
        LatestComponent,
        TvDetailsComponent,
        AllReviewsComponent,
        AllCastComponent,
        MoviesComponent,
        TvShowsComponent,
        PeopleComponent,
        PersonDetailsComponent,
        AboutUsComponent,
        PrivacyComponent,
        ContactUsComponent,
        LoginComponent,
        RegisterComponent,
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
        FormsModule,
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
        MatInputModule,
        MatListModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatMenuModule,
        MatDialogModule,
        MatTooltipModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
