import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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

    constructor(private userService: UserService, private router: Router) {}

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

    //Pie charts
    public pieChartOptions: ChartOptions<"pie"> = {
        responsive: true,
        plugins: {
            legend: {
                labels: { color: "white" },
            },
        },
    };
    public pieChartLegend = true;
    public pieChartPlugins = [];
    // Movie
    public movie_pieChartLabels = [""];
    public movie_pieChartDatasets = [
        {
            data: [0],
            backgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(255, 159, 64, 0.8)",
                "rgba(255, 205, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(153, 102, 255, 0.8)",
                "rgba(201, 203, 207, 0.8)",
                "rgba(0, 35, 207, 0.8)",
                "rgba(125, 12, 12, 0.8)",
                "rgba(17, 122, 5, 0.8)",
                "rgba(0, 65, 135, 0.8)",
                "rgba(230, 230, 0, 0.8)",
                "rgba(230, 0, 35, 0.8)",
                "rgba(110, 115, 125, 0.8)",
                "rgba(240, 70, 214, 0.8)",
            ],
            borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
                "rgb(0, 35, 207)",
                "rgb(125, 12, 12)",
                "rgb(17, 122, 5)",
                "rgb(0, 65, 135)",
                "rgba(230, 230, 0)",
                "rgba(230, 0, 35)",
                "rgba(110, 115, 125)",
                "rgba(240, 70, 214)",
            ],
            borderWidth: 1,
        },
    ];
    // TV
    public tv_pieChartLabels = [""];
    public tv_pieChartDatasets = [
        {
            data: [0],
            backgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(255, 159, 64, 0.8)",
                "rgba(255, 205, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(153, 102, 255, 0.8)",
                "rgba(201, 203, 207, 0.8)",
                "rgba(0, 35, 207, 0.8)",
                "rgba(125, 12, 12, 0.8)",
                "rgba(17, 122, 5, 0.8)",
                "rgba(0, 65, 135, 0.8)",
                "rgba(230, 230, 0, 0.8)",
                "rgba(230, 0, 35, 0.8)",
                "rgba(110, 115, 125, 0.8)",
                "rgba(240, 70, 214, 0.8)",
            ],
            borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
                "rgb(0, 35, 207)",
                "rgb(125, 12, 12)",
                "rgb(17, 122, 5)",
                "rgb(0, 65, 135)",
                "rgba(230, 230, 0)",
                "rgba(230, 0, 35)",
                "rgba(110, 115, 125)",
                "rgba(240, 70, 214)",
            ],
            borderWidth: 1,
        },
    ];

    // Barcharts
    public barChartLegend = false;
    public barChartPlugins = [];
    public barChartOptions: ChartConfiguration<"bar">["options"] = {
        responsive: true,
        scales: {
            x: { ticks: { color: "white" } },
            y: { ticks: { color: "white" } },
        },
    };
    statusLabel: string[] = [];
    statusCount: number[] = [];
    public statusBarChartData: ChartConfiguration<"bar">["data"] = {
        labels: this.statusLabel,
        datasets: [
            {
                data: this.statusCount,
                label: "Count",
                backgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(255, 159, 64, 0.8)",
                    "rgba(255, 205, 86, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                    "rgba(201, 203, 207, 0.8)",
                    "rgba(0, 35, 207, 0.8)",
                    "rgba(125, 12, 12, 0.8)",
                    "rgba(17, 122, 5, 0.8)",
                    "rgba(0, 65, 135, 0.8)",
                    "rgba(230, 230, 0, 0.8)",
                    "rgba(230, 0, 35, 0.8)",
                    "rgba(110, 115, 125, 0.8)",
                    "rgba(240, 70, 214, 0.8)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                    "rgb(0, 35, 207)",
                    "rgb(125, 12, 12)",
                    "rgb(17, 122, 5)",
                    "rgb(0, 65, 135)",
                    "rgba(230, 230, 0)",
                    "rgba(230, 0, 35)",
                    "rgba(110, 115, 125)",
                    "rgba(240, 70, 214)",
                ],
                borderWidth: 1,
            },
        ],
    };

    showLabel: string[] = [];
    episodeCount: number[] = [];
    public episodeBarChartData: ChartConfiguration<"bar">["data"] = {
        labels: this.showLabel,
        datasets: [
            {
                data: this.episodeCount,
                label: "Count",
                backgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(255, 159, 64, 0.8)",
                    "rgba(255, 205, 86, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                    "rgba(201, 203, 207, 0.8)",
                    "rgba(0, 35, 207, 0.8)",
                    "rgba(125, 12, 12, 0.8)",
                    "rgba(17, 122, 5, 0.8)",
                    "rgba(0, 65, 135, 0.8)",
                    "rgba(230, 230, 0, 0.8)",
                    "rgba(230, 0, 35, 0.8)",
                    "rgba(110, 115, 125, 0.8)",
                    "rgba(240, 70, 214, 0.8)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                    "rgb(0, 35, 207)",
                    "rgb(125, 12, 12)",
                    "rgb(17, 122, 5)",
                    "rgb(0, 65, 135)",
                    "rgba(230, 230, 0)",
                    "rgba(230, 0, 35)",
                    "rgba(110, 115, 125)",
                    "rgba(240, 70, 214)",
                ],
                borderWidth: 1,
            },
        ],
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

    goToGenre(id: any) {
        if (this.onTV) {
            const url = this.router.serializeUrl(this.router.createUrlTree(["/tv"], { queryParams: { genre: id } }));
            window.open(url, "_blank");
        } else {
            const url = this.router.serializeUrl(this.router.createUrlTree(["/movie"], { queryParams: { genre: id } }));
            window.open(url, "_blank");
        }
    }
    goToSeries(id: any) {
        const url = this.router.serializeUrl(this.router.createUrlTree([`/tv/${id}`]));
        window.open(url, "_blank");
    }
}
