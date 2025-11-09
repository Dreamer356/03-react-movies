import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from './MovieModal.module.css'
import { Movie } from '../../types/movie'
import { getPosterUrl } from '../../services/movieService'

interface MovieModalProps {
  movie: Movie | null
  onClose: () => void
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (movie) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKey)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [movie, onClose])

  if (!movie) return null

  return ReactDOM.createPortal(
    <div className={styles.backdrop} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} aria-label="Close modal" onClick={onClose}>
          &times;
        </button>
        <img
          src={getPosterUrl(movie.backdrop_path, 'original') || getPosterUrl(movie.poster_path)}
          alt={movie.title}
          className={styles.image}
        />
        <div className={styles.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}/10</p>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  )
}
