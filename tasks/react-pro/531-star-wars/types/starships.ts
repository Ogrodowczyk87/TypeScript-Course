import axios from 'axios';

export interface Starship {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    pilots: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

export interface StarshipsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Starship[];
}

const BASE_URL = 'https://swapi.dev/api';

export async function getStarships(page: number = 1): Promise<StarshipsResponse> {
    const response = await axios.get<StarshipsResponse>(`${BASE_URL}/starships`, {
        params: { page },
    });
    return response.data;
}