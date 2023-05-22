import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { SessionService } from "src/app/services/session-service/session.service";
import { ChartConfiguration } from "chart.js";

@Component({
    selector: "app-user-account",
    templateUrl: "./user-account.component.html",
    styleUrls: ["./user-account.component.scss"],
})
export class UserAccountComponent implements OnInit {
    user: User | null = null;
    firstName: string = "";
    lastName: string = "";

    isLoadingChartOne: boolean = false;
    isLoadingChartTwo: boolean = false;

    movieRatings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    tvRatings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    movieCount = [0, 0, 0, 0];
    tvCount = [0, 0, 0, 0];

    constructor(private session: SessionService, private router: Router) {}

    ngOnInit(): void {
        this.isLoadingChartOne = true;
        this.isLoadingChartTwo = true;
        this.session.userObservable.subscribe((user) => {
            this.user = user;
            if (this.user?.name.split(" ")) {
                const names = this.user?.name.split("_");
                this.lastName = names[names.length - 1];
                this.firstName = names.splice(0, names.length - 1).join(" ");

                this.createChartOneData();
                this.createChartTwoData();

                console.log(this.movieCount);
            }
        });
    }

    createChartOneData() {
        this.user?.ratedMovies.forEach((element) => {
            this.movieRatings[element.rating - 1]++;
        });
        this.user?.ratedTv.forEach((element) => {
            this.tvRatings[element.rating - 1]++;
        });
        this.isLoadingChartOne = false;
    }

    createChartTwoData() {
        if (this.user?.movieWatchlist && this.user?.watchedMovies && this.user?.likedMovies && this.user?.ratedMovies) {
            this.movieCount[0] = this.user?.movieWatchlist.length;
            this.movieCount[1] = this.user?.watchedMovies.length;
            this.movieCount[2] = this.user?.likedMovies.length;
            this.movieCount[3] = this.user?.ratedMovies.length;
        }

        if (this.user?.tvWatchlist && this.user?.watchedTvs && this.user?.likedTv && this.user?.ratedTv) {
            this.tvCount[0] = this.user?.tvWatchlist.length;
            this.tvCount[1] = this.user?.watchedTvs.length;
            this.tvCount[2] = this.user?.likedTv.length;
            this.tvCount[3] = this.user?.ratedTv.length;
        }
        this.isLoadingChartTwo = false;
    }

    barChartLegend = true;
    barChartPlugins = [];
    barChartOptions: ChartConfiguration<"bar">["options"] = {
        responsive: false,
    };
    barChartDataOne: ChartConfiguration<"bar">["data"] = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [
            { data: this.movieRatings, label: "Movies" },
            { data: this.tvRatings, label: "TV Shows" },
        ],
    };
    public barChartDataTwo: ChartConfiguration<"bar">["data"] = {
        labels: ["In watchlist", "Watched", "Liked", "Rated"],
        datasets: [
            { data: this.movieCount, label: "Movies" },
            { data: this.tvCount, label: "TV Shows" },
        ],
    };
}
