import axios, { AxiosResponse } from 'axios'
import { Movie } from '../types/movie'

const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p'

const token = import.meta.env.VITE_TMDB_TOKEN

if (!token) {
  // It's okay in dev to not crash; App will handle missing token, but we warn.
  // eslint-disable-next-line no-console
  console.warn('VITE_TMDB_TOKEN is not set. Requests will fail.')
}

export interface FetchMoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export async function fetchMovies(query: string): Promise<FetchMoviesResponse> {
  const url = `${BASE_URL}/search/movie`
  const config = {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const resp: AxiosResponse<FetchMoviesResponse> = await axios.get(url, config)
  return resp.data
}

export function getPosterUrl(path: string | null, size = 'w500') {
  if (!path) return ''
  return `${IMAGE_BASE}/${size}${path}`
}
