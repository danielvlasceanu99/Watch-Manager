import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllCastComponent } from "./pages/all-cast-page/all-cast.component";
import { AllReviewsComponent } from "./pages/all-reviews-page/all-reviews.component";
import { LatestComponent } from "./pages/latest-page/latest.component";
import { MovieDetailsComponent } from "./pages/movie-details-page/movie-details.component";
import { TvDetailsComponent } from "./pages/tv-details-page/tv-details.component";

const routes: Routes = [
    { path: "home", component: LatestComponent },
    { path: "movie/:id", component: MovieDetailsComponent },
    { path: "tv/:id", component: TvDetailsComponent },
    { path: "movie/:id/reviews", component: AllReviewsComponent },
    { path: "tv/:id/reviews", component: AllReviewsComponent },
    { path: "tv/:id", component: TvDetailsComponent },
    { path: "movie/:id/cast", component: AllCastComponent },
    { path: "tv/:id/cast", component: AllCastComponent },
    { path: "**", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
