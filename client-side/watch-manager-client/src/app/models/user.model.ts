export interface User {
    name: string;
    email: string;
    role: string;
    movieWatchlist: string[];
    tvWatchlist: string[];
    watchedMovies: string[];
    watchedTvs: string[];
    watchedEpisodes: string[];
    ratedMovies: { id: string; rating: number }[];
    ratedTv: { id: string; rating: number }[];
    reviewedMovies: string[];
    reviewedTv: string[];
    likedMovies: string[];
    likedTv: string[];
    followedUsers: string[];
}
