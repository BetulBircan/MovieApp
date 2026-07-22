import { useState, useEffect } from "react";

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
  array.reduce((sum, value) => sum + value  / array.length, 0);

const api_key = "459e240832263aedab57605373a66db3";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState(selected_movie_list);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("father")

  useEffect(() => {
    //First render(mount)

    console.log(query)
    //async await ile yapma
    const getMovies = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`,
        );

        if (!res.ok) {
          throw new Error("Bilinmeyen bir hata oluştu.");
        }

        const data = await res.json();

        if (data.total_results === 0) {
          throw new Error("Film bulunamadı.");
        }

        setMovies(data.results);
        
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    if(query.length < 4) {
      setMovies([]);
      setError("");
      return;
    }

    getMovies();

  }, [query]);  

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery}/>
        <NavSearchResult movies={movies} />
      </Navbar>
      <Main>
        <div className="row mt-2">
          <div className="col-md-9">
            <ListContainer>
              
              {loading && <Loading />}
              {!loading && !error && <MovieList movies={movies} /> }
              {error && <ErrorMessage message={error}/>}
            </ListContainer>
          </div>
          <div className="col-md-3">
            <ListContainer>
              <>
                <MyMovieListSummary selectedMovies={selectedMovies} />
                <MyMovieList selectedMovies={selectedMovies} />
              </>
            </ListContainer>
          </div>
        </div>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return <div className="alert alert-danger">{message}</div>;
}

function Loading() {
  return (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

function Navbar({ children }) {
  return (
    <>
      <nav className="bg-info text-white p-2">
        <div className="container">
          <div className="row align-items-center">
            {children}
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

function Search({query, setQuery}) {
  return (
    <div className="col-4">
      <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} className="form-control" placeholder="Film ara..." />
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

function Main({ children }) {
  return <main className="container">{children}</main>;
}

function ListContainer({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="movie-list">
      <button
        className="btn btn-sm btn-outline-info mb-2"
        onClick={() => setIsOpen((val) => !val)}
      >
        {isOpen ? (
          <i className="bi bi-chevron-up"></i>
        ) : (
          <i className="bi bi-chevron-down"></i>
        )}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
      {movies.map((movie) => (
        <MovieListItem movie={movie} key={movie.id} />
      ))}
    </div>
  );
}

function MovieListItem({ movie }) {
  return (
    <div className="col mb-2" key={movie.id}>
      <div className="card">
        <img
          src={
            movie.poster_path
              ? `https://media.themoviedb.org/t/p/w440_and_h660_face` +
                movie.poster_path
              : `/img/no-image.jpg`
          }
          alt={movie.title}
          className="card-img-top"
        />
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <div>
            <i className="bi bi-calendar2-date me-1"></i>
            <span>{movie.release_date}</span>
          </div>
        </div>
      </div>
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
    return selectedMovies.map((movie) => (
      <MyMovieListItem key={movie.Id} movie={movie} />
    ));
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
  );
}
