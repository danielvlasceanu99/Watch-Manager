import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LatestComponent } from "./pages/latest-page/latest.component";
import { MovieDetailsComponent } from "./pages/movie-details-page/movie-details.component";

const routes: Routes = [
    { path: "home", component: LatestComponent },
    { path: "movie/:id", component: MovieDetailsComponent },
    { path: "tv/:id", component: LatestComponent },
    { path: "**", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
