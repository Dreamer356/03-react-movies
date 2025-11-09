import React from 'react'
import styles from './MovieCard.module.css'
import { Movie } from '../../types/movie'
import { getPosterUrl } from '../../services/movieService'

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={getPosterUrl(movie.poster_path)}
        alt={movie.title}
        loading="lazy"
      />
      <h2 className={styles.title}>{movie.title}</h2>
    </div>
  )
}
