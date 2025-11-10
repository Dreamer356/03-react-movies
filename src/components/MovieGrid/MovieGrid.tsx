import React from 'react'
import styles from '../MovieGrid/MovieGrid'
import { Movie } from '../../types/movie'
import MovieCard from '../MovieCard/MovieCard'

interface MovieGridProps {
  movies: Movie[]
  onSelect: (movie: Movie) => void
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (!movies || movies.length === 0) return null

  return (
    <ul className={styles.grid}>
      {movies.map((m) => (
        <li key={m.id}>
          <div className={styles.card} onClick={() => onSelect(m)} role="button" tabIndex={0}>
            <MovieCard movie={m} />
          </div>
        </li>
      ))}
    </ul>
  )
}
