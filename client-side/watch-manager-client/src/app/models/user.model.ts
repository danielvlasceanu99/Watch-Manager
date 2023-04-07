export interface User {
    name: string;
    email: string;
    role: string;
    movieWatchlist: string[];
    tvWatchlist: string[];
    moviesWatched: string[];
    episodesWatched: string[];
    ratedMovies: { id: string; rate: number }[];
    ratedTV: { id: string; rate: number }[];
    reviewedMovies: string[];
    reviewedTv: string[];
}
