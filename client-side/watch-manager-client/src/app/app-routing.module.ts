import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutUsComponent } from "./pages/about-us-page/about-us.component";
import { AllCastComponent } from "./pages/all-cast-page/all-cast.component";
import { AllReviewsComponent } from "./pages/all-reviews-page/all-reviews.component";
import { ContactUsComponent } from "./pages/contact-us-page/contact-us.component";
import { LatestComponent } from "./pages/latest-page/latest.component";
import { MovieDetailsComponent } from "./pages/movie-details-page/movie-details.component";
import { MoviesComponent } from "./pages/movies-page/movies.component";
import { PeopleComponent } from "./pages/people-page/people.component";
import { PersonDetailsComponent } from "./pages/person-details-page/person-details.component";
import { PrivacyComponent } from "./pages/privacy-page/privacy.component";
import { TvDetailsComponent } from "./pages/tv-details-page/tv-details.component";
import { TvShowsComponent } from "./pages/tv-shows-page/tv-shows/tv-shows.component";
import { LoginComponent } from "./pages/login-page/login.component";
import { RegisterComponent } from "./pages/register-page/register.component";
import { UserWatchlistComponent } from "./pages/user-watchlist-page/user-watchlist.component";
import { UserFavoriteComponent } from "./pages/user-favorite-page/user-favorite.component";
import { UserRatedComponent } from "./pages/user-rated-page/user-rated.component";
import { UserWatchedComponent } from "./pages/user-watched-page/user-watched.component";
import { UserAccountComponent } from "./pages/user-account-page/user-account.component";
import { AdminMoviesComponent } from "./pages/admin-movies-page/admin-movies.component";
import { AdminDashboardComponent } from "./pages/admin-dashboard-page/admin-dashboard.component";

const routes: Routes = [
    { path: "home", component: LatestComponent },
    { path: "movie", component: MoviesComponent },
    { path: "movie/:id", component: MovieDetailsComponent },
    { path: "movie/:id/reviews", component: AllReviewsComponent },
    { path: "movie/:id/cast", component: AllCastComponent },
    { path: "tv/:id", component: TvDetailsComponent },
    { path: "tv", component: TvShowsComponent },
    { path: "tv/:id/reviews", component: AllReviewsComponent },
    { path: "tv/:id/cast", component: AllCastComponent },
    { path: "person/:id", component: PersonDetailsComponent },
    { path: "people", component: PeopleComponent },
    { path: "about-us", component: AboutUsComponent },
    { path: "privacy", component: PrivacyComponent },
    { path: "contact-us", component: ContactUsComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "user-watchlist", component: UserWatchlistComponent },
    { path: "user-rated", component: UserRatedComponent },
    { path: "user-favorite", component: UserFavoriteComponent },
    { path: "user-watched", component: UserWatchedComponent },
    { path: "user-account", component: UserAccountComponent },
    { path: "admin-movies", component: AdminMoviesComponent },
    { path: "admin-dashboard", component: AdminDashboardComponent },
    { path: "**", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
