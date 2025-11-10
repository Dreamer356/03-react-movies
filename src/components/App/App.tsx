import React, { useCallback, useEffect, useState } from 'react'
import styles from './App.module.css'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'
import { fetchMovies } from '../../services/movieService'
import toast, { Toaster } from 'react-hot-toast'
import { Movie } from '../../types/movie'

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Movie | null>(null)

  const handleSearch = useCallback(async (q: string) => {
    setQuery(q)
    setMovies([]) // clear previous results
    setError(null)
    setLoading(true)
    try {
      const data = await fetchMovies(q)
      if (!data.results || data.results.length === 0) {
        toast('No movies found for your request.')
        setMovies([])
      } else {
        setMovies(data.results)
      }
    } catch (err) {
      setError('Error fetching movies')
      toast.error('There was an error fetching movies.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // optional: could load trending on mount. Keep empty.
  }, [])

  return (
    <div>
      <Toaster />
      <div className="container">
        <SearchBar onSubmit={handleSearch} />
        {loading && <Loader />}
        {error && <ErrorMessage />}
        <MovieGrid movies={movies} onSelect={(m) => setSelected(m)} />
        <MovieModal movie={selected} onClose={() => setSelected(null)} />
      </div>
    </div>
  )
}
