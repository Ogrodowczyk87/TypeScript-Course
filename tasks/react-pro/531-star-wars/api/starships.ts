import axios from 'axios';
import { StarshipsResponse } from '../types/starships';

export async function getStarships(page: number = 1): Promise<StarshipsResponse> {
    const response = await axios.get<StarshipsResponse>(`https://swapi.dev/api/starships`, {
        params: { page },
    });
    return response.data;
}