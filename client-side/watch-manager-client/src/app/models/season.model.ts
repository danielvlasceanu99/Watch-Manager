import { Episode } from "./episode.model";

export interface Season {
    id: string;
    name: string;
    overview: string;
    season_number: number;
    air_date: Date;
    poster_path: string;
    created_by: string;
    last_changed_by: string;
    created_at: Date;
    last_changed_at: Date;
    tv_id: string;
    episodes: Episode[];
}
