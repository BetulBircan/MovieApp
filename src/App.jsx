import { useState } from "react";
const movie_list = [
  {
    Id: "769",
    Title: "GoodFellas",
    Year: "1990",
    Poster:
      "https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
  },
  {
    Id: "120",
    Title: "The Lord of the Rings",
    Year: "2001",
    Poster:
      "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
  },
  {
    Id: "27205",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://image.tmdb.org/t/p/original/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
  },
  {
    Id: "105",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://image.tmdb.org/t/p/original/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
  },
];

const selected_movie_list = [
  {
    Id: "769",
    Title: "GoodFellas",
    Year: "1990",
    Poster:
      "https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    Duration: 120,
    Rating: 8.4,
  },
  {
    Id: "120",
    Title: "The Lord of the Rings",
    Year: "2001",
    Poster:
      "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    Duration: 125,
    Rating: 8.8,
  },
  {
    Id: "105",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://image.tmdb.org/t/p/original/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
    Duration: 115,
    Rating: 8.5,
  },
];

const getAverage = (array) =>
  array.reduce((sum, value) => sum + value, 0) / array.length;

export default function App() {
    const [movies, setMovies] = useState(movie_list);
  return (
    <>
      <Navbar movies={movies} />
      <Main movies={movies} />
    </>
  );
}

function Navbar({ movies }) {
  return (
    <>
      <nav className="bg-info text-white p-2">
        <div className="container">
          <div className="row align-items-center">
            <Logo />
            <Search />
            <NavSearchResult movies={movies} />
          </div>
        </div>
      </nav>
    </>
  );
}

function Logo() {
  return (
    <div className="col-4">
      <i className="bi bi-camera-reels me-2"></i>
      Movie App
    </div>
  );
}

function Search() {
  return (
    <div className="col-4">
      <input type="text" className="form-control" placeholder="Film ara..." />
    </div>
  );
}

function NavSearchResult({ movies }) {
  return (
    <div className="col-4 text-end">
      <strong>{movies.length}</strong> kayıt bulundu.
    </div>
  );
}

function Main({ movies }) {
  return (
    <main className="container">
      <div className="row mt-2">
        <div className="col-md-9">
          <MovieListContainer movies={movies} />
        </div>
        <div className="col-md-3">
          <MyMovieListContainer />
        </div>
      </div>
    </main>
  );
}

function MovieListContainer( {movies}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="movie-list">
      <button
        className="btn btn-sm btn-outline-primary mb-2"
        onClick={() => setIsOpen((val) => !val)}
      >
        {isOpen ? (
          <i className="bi bi-chevron-up"></i>
        ) : (
          <i className="bi bi-chevron-down"></i>
        )}
      </button>
      {isOpen && <MovieList movies={movies} />}
    </div>
  );
}

function MovieList({ movies }) {

  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
      {movies.map((movie) => (
        <MovieListItem movie={movie} key={movie.Id} />
      ))}
    </div>
  );
}

function MovieListItem({ movie }) {
  return (
    <div className="col mb-2" key={movie.Id}>
      <div className="card">
        <img src={movie.Poster} alt={movie.Title} className="card-img-top" />
        <div className="card-body">
          <h6 className="card-title">{movie.Title}</h6>
          <div>
            <i className="bi bi-calendar2-date me-1"></i>
            <span>{movie.Year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyMovieListContainer() {
  const [selectedMovies, setSelectedMovies] = useState(selected_movie_list);
  const [selectedIsOpen, setSelectedIsOpen] = useState(true);

  const avgRating = getAverage(
    selected_movie_list.map((sMovie) => sMovie.Rating),
  );
  const avgDuration = getAverage(
    selected_movie_list.map((sMovie) => sMovie.Duration),
  );

  return (
    <div className="movie-list">
      <button
        className="btn btn-sm btn-outline-primary mb-2"
        onClick={() => setSelectedIsOpen((val) => !val)}
      >
        {selectedIsOpen ? (
          <i className="bi bi-chevron-up"></i>
        ) : (
          <i className="bi bi-chevron-down"></i>
        )}
      </button>
      {selectedIsOpen && (
        <>
          <MyMovieListSummary selectedMovies={selectedMovies} />
          <MyMovieList selectedMovies={selectedMovies} />
        </>
      )}
    </div>
  );
}

function MyMovieListSummary({ selectedMovies }) {
  const avgRating = getAverage(selectedMovies.map((sMovie) => sMovie.Rating));
  const avgDuration = getAverage(
    selectedMovies.map((sMovie) => sMovie.Duration),
  );

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5>Listeye [{selectedMovies.length}] film eklendi.</h5>
        <div className="d-flex justify-content-between">
          <p>
            <i className="bi bi-star-fill text-warning me-1"></i>
            <span>{avgRating.toFixed(2)}</span>
          </p>
          <p>
            <i className="bi bi-hourglass-split text-warning me-1"></i>
            <span>{avgDuration.toFixed(2)} dk</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function MyMovieList({ selectedMovies }) {
  {
    return (
      selectedMovies.map((movie) => (
      <MyMovieListItem key={movie.Id} movie={movie} />
    ))
    )
  
  }
}

function MyMovieListItem({ movie }) {
  return (
     <div className="card mb-2" key={movie.Id}>
        <div className="row">
          <div className="col-4">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h6 className="card-title">{movie.Title}</h6>
              <div className="d-flex justify-content-between">
                <p>
                  <i className="bi bi-star-fill text-warning me-1"></i>
                  <span>{movie.Rating}</span>
                </p>
                <p>
                  <i className="bi bi-hourglass text-warning me-1"></i>
                  <span>{movie.Duration} dk</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}