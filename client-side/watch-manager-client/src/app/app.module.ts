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

// CUSTOM
import { FooterComponent } from "./components/footer-component/footer/footer.component";
import { LatestComponent } from "./components/latest-component/latest/latest.component";
import { CardComponent } from "./components/card-component/card/card.component";
import { DatePipe } from "./pipes/date-pipe/date.pipe";

@NgModule({
    declarations: [AppComponent, FooterComponent, LatestComponent, CardComponent, DatePipe],
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
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
