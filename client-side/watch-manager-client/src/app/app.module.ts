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
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableModule } from "@angular/material/table";
import { NgChartsModule } from "ng2-charts";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

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
import { MovieDialogComponent } from "./components/movie-dialog-component/movie-dialog.component";
import { ConfirmActionDialogComponent } from "./components/confirm-action-dialog-component/confirm-action-dialog.component";

// CUSTOM PAGES
import { LatestComponent } from "./pages/latest-page/latest.component";
import { MovieDetailsComponent } from "./pages/movie-details-page/movie-details.component";
import { TvDetailsComponent } from "./pages/tv-details-page/tv-details.component";
import { AllReviewsComponent } from "./pages/all-reviews-page/all-reviews.component";
import { AllCastComponent } from "./pages/all-cast-page/all-cast.component";
import { MoviesComponent } from "./pages/movies-page/movies.component";
import { TvShowsComponent } from "./pages/tv-shows-page/tv-shows.component";
import { PeopleComponent } from "./pages/people-page/people.component";
import { PersonDetailsComponent } from "./pages/person-details-page/person-details.component";
import { AboutUsComponent } from "./pages/about-us-page/about-us.component";
import { PrivacyComponent } from "./pages/privacy-page/privacy.component";
import { ContactUsComponent } from "./pages/contact-us-page/contact-us.component";
import { LoginComponent } from "./pages/login-page/login.component";
import { RegisterComponent } from "./pages/register-page/register.component";
import { UserWatchlistComponent } from "./pages/user-watchlist-page/user-watchlist.component";
import { UserRatedComponent } from "./pages/user-rated-page/user-rated.component";
import { UserFavoriteComponent } from "./pages/user-favorite-page/user-favorite.component";
import { UserWatchedComponent } from "./pages/user-watched-page/user-watched.component";
import { UserAccountComponent } from "./pages/user-account-page/user-account.component";
import { AdminMoviesComponent } from "./pages/admin-movies-page/admin-movies.component";
import { AdminDashboardComponent } from "./pages/admin-dashboard-page/admin-dashboard.component";
import { RecomandationsComponent } from "./pages/recomandations-page/recomandations.component";
import { FollowedComponent } from "./pages/followed-page/followed.component";
import { UserLikedComponent } from "./pages/user-liked-page/user-liked.component";
import { TopRatedComponent } from "./pages/top-rated-page/top-rated.component";

// PIPES
import { DatePipe } from "./pipes/date-pipe/date.pipe";
import { DateYearPipe } from "./pipes/date-year-pipe/date-year.pipe";
import { RuntimePipe } from "./pipes/runtime-pipe/runtime.pipe";
import { ColumnPipe } from "./pipes/column-pipe/column.pipe";

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
        MovieDialogComponent,
        ConfirmActionDialogComponent,
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
        UserWatchlistComponent,
        UserRatedComponent,
        UserFavoriteComponent,
        UserWatchedComponent,
        UserAccountComponent,
        AdminMoviesComponent,
        AdminDashboardComponent,
        RecomandationsComponent,
        FollowedComponent,
        UserLikedComponent,
        TopRatedComponent,
        // PIPES
        DateYearPipe,
        DatePipe,
        RuntimePipe,
        ColumnPipe,
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
        MatTableModule,
        NgChartsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
