export interface User {
    name: string;
    email: string;
    role: string;
    movieWatchlist: string[];
    tvWatchlist: string[];
    watchedMovies: string[];
    watchedTvs: string[];
    watchedEpisodes: string[];
    ratedMovies: { id: string; rate: number }[];
    ratedTv: { id: string; rate: number }[];
    reviewedMovies: string[];
    reviewedTv: string[];
    likedMovies: string[];
    likedTv: string[];
}
