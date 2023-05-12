import { Component, OnInit } from "@angular/core";
import { ChartConfiguration, ChartOptions } from "chart.js";
import { UserService } from "src/app/services/user-service/user.service";

@Component({
    selector: "app-admin-dashboard",
    templateUrl: "./admin-dashboard.component.html",
    styleUrls: ["./admin-dashboard.component.scss"],
})
export class AdminDashboardComponent implements OnInit {
    onTV: boolean = false;
    isLoading: boolean = false;

    dashboardData: any;

    movieToGenres: [{ count: number; name: string }] | [] = [];
    tvToGenres: [{ count: number; name: string }] | [] = [];
    movieToStatus: [{ count: number; status: string }] | [] = [];
    episodesToShow: [{ episode_count: string; name: string }] | [] = [];

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.userService.getDashboardData().subscribe({
            next: (res) => {
                this.dashboardData = res;
                this.mapData();
                this.isLoading = false;
            },
            error: (err) => {},
        });
    }

    public pieChartOptions: ChartOptions<"pie"> = {
        responsive: false,
    };
    public movie_pieChartLabels = [""];
    public movie_pieChartDatasets = [{ data: [0] }];
    public tv_pieChartLabels = [""];
    public tv_pieChartDatasets = [{ data: [0] }];
    public pieChartLegend = true;
    public pieChartPlugins = [];

    public barChartLegend = true;
    public barChartPlugins = [];
    public barChartOptions: ChartConfiguration<"bar">["options"] = {
        responsive: false,
    };
    statusLabel: string[] = [];
    statusCount: number[] = [];
    public statusBarChartData: ChartConfiguration<"bar">["data"] = {
        labels: this.statusLabel,
        datasets: [{ data: this.statusCount, label: "Count" }],
    };

    showLabel: string[] = [];
    episodeCount: number[] = [];
    public episodeBarChartData: ChartConfiguration<"bar">["data"] = {
        labels: this.showLabel,
        datasets: [{ data: this.episodeCount, label: "Count" }],
    };

    mapData() {
        //Movie to genre piechart
        this.movieToGenres = this.dashboardData.movies_genre;
        let moviePieChartLabels: string[] = [];
        let moviePieChartData: number[] = [];
        this.movieToGenres.forEach((e) => {
            moviePieChartLabels.push(e.name);
            moviePieChartData.push(e.count);
        });
        this.movie_pieChartDatasets[0].data = moviePieChartData;
        this.movie_pieChartLabels = moviePieChartLabels;

        this.tvToGenres = this.dashboardData.tv_genre;
        let tvPieChartLabels: string[] = [];
        let tvPieChartData: number[] = [];
        this.tvToGenres.forEach((e) => {
            tvPieChartLabels.push(e.name);
            tvPieChartData.push(e.count);
        });
        this.tv_pieChartDatasets[0].data = tvPieChartData;
        this.tv_pieChartLabels = tvPieChartLabels;

        this.movieToStatus = this.dashboardData.movie_status;
        this.movieToStatus.forEach((e) => {
            this.statusLabel.push(e.status);
            this.statusCount.push(e.count);
        });

        this.episodesToShow = this.dashboardData.ep_number;
        this.episodesToShow.forEach((e) => {
            this.showLabel.push(e.name);
            this.episodeCount.push(Number(e.episode_count));
        });
    }
}
