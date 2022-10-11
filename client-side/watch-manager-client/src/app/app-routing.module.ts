import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LatestComponent } from "./components/latest-component/latest/latest.component";

const routes: Routes = [
    { path: "home", component: LatestComponent },
    { path: "movie/:id", component: LatestComponent },
    { path: "tv/:id", component: LatestComponent },
    { path: "**", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
