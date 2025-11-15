import { useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import styles from "./App.module.css";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSelect = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
  }, []);

  const {
    data: movies = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
    enabled: query.trim().length > 0,
    keepPreviousData: true,
    onError: (err: any) => {
      toast.error("Failed to fetch movies");
      console.error(err);
    },
  });

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Movie search</h1>
      </header>
      <main className={styles.main}>
        <SearchBar onSubmit={handleSearch} />
        {isLoading && <Loader />}
        {isError && !isLoading && <ErrorMessage />}
        {!isLoading && !isError && movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={handleSelect} />
        )}
        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
        )}
      </main>
      <Toaster position="top-center" />
    </div>
  );
};

export default App;
