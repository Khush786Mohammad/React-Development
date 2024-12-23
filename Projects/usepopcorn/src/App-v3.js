
import { useState, useEffect } from "react";
import StarRating from "./StarRating";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const myKEY = "d9ee8fd0";
const KEY = 'f84fc31d';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState();

  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function(){
    const storedValue = localStorage.getItem('watched');
    return JSON.parse(storedValue);
  });

  function handleSelectMovie(id){
    setSelectedId((currId) => currId === id ? null : id);
  }

  function handleClosedMovie(){
    setSelectedId(null);
  }

  function handleAndWatched(watch){
    setWatched((watched) => [...watched, watch]);
    // localStorage.setItem('watched', JSON.stringify([...watched, watch]));
  }

  function handleDeletedWatched(id){
    setWatched(watched.filter((watch)=> watch.imdbID !== id));
  }

  useEffect(function(){
    localStorage.setItem('watched',JSON.stringify(watched));
  },[watched]);

  useEffect(function(){
    const controller = new AbortController();
    async function fetchMovies(){
      //⭐ Try Block
        try{
          setIsLoading(true);
          setError('');

          const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal: controller.signal});

          if(!response.ok) throw new Error("Something went wrong");

          const data = await response.json();

          if(data.Response === 'False') throw new Error("Movie not Found");

          setMovies(data.Search);
          setError("");
        }
        //⭐ Handling CATCH block
        catch(error){
        if(error.name !== 'AbortError')
        setError(error.message);
        }
      //⭐ Finally Block
        finally{
          setIsLoading(false);
        }
      }
      if(!query.length) {
        setMovies([]);
        setError('');
        return;
      }
      handleClosedMovie();
      fetchMovies();
      return function(){
        controller.abort();
      }
  }, [query]);

  

    // setWatched([]);
    return (
        <>
        <NavBar query={query} setQuery={setQuery}>
          <NumResult movies={movies}/>  {/* ⭐example of implicit props (passing as children) */}
        </NavBar>
        <Main>
        {/* Another example of implicit props */}
          <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectedMovie={handleSelectMovie}/>}
          {error && <ErrorMessage message={error} />}
          </Box>
          <Box>
            {
              selectedId ? <MovieDetails 
              selectedId={selectedId} 
              onCloseMovie={handleClosedMovie}
              onAddWatched={handleAndWatched}  
              watched={watched}
              />
              :
              <>
              <WatchedSummary watched={watched}/>
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeletedWatched}/>
              </>
            }
          </Box>

          {/* ⭐Example of Explicit Props  */}

          {/* <Box element={<MovieList movies={movies} />} />
          <Box element=
          {
            <>
              <WatchedSummary watched={watched}/>
              <WatchedMoviesList watched={watched} />
            </>
          }
          /> */}
        </Main>
        </>
    );
}

function Loader(){
  return <p className="loader">Loading...</p>
}

function ErrorMessage({message}){
  return <p className="error">
    <span>⛔</span>{message}
  </p>
}

function NavBar({query, setQuery, children}){
  return (
    <nav className="nav-bar">
          <Logo />
          <Search query={query} setQuery={setQuery}/>
        {children}
      </nav>
  )
}

function Logo(){
  return(
    <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
    </div>
  );
}

function Search({query,setQuery}){

  useEffect(function(){
    const el = document.querySelector('.search');
    // console.log(el);
    el.focus();
  },[]);

  return (
    <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
    />
  )
}

function NumResult({movies}){
  return (
    <p className="num-results">
          Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({children}){
  return (
    <main className="main">
        {children}
    </main>
  );

}

// ⭐Replace the children KEYWORD in Box for explicit props

function Box({children}){
  const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen((open) => !open)}
    >
      {isOpen ? "–" : "+"}
    </button>
    {isOpen && children}
  </div>
    )
}

function MovieList({movies, onSelectedMovie}){

  return (
    <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie movie = {movie} key = {movie.imdbID} onSelectedMovie={onSelectedMovie} />
        ))}
      </ul>
  )
}

function Movie({movie, onSelectedMovie}){
  return (
    <li onClick={() => onSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

function MovieDetails({selectedId, onCloseMovie, onAddWatched, watched}){
  
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const isWatched = watched.map(movie=>movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(movie=>movie.imdbID === selectedId)?.userRating;

  const {Title: title,
    Year: year, 
    Poster: poster,
    Runtime: runtime, 
    imdbRating, 
    Plot: plot, 
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // if(imdbRating > 8) [isTop, setIsTop] = useState(false);

  // if(imdbRating > 8) return <p>Greatest ever!</p>

  function handleAdd(){
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(' ').at(0),
      userRating,
    }
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(function(){
    function callback(e){
      if(e.key === 'Escape')
      {
        onCloseMovie();
      }
    }
    document.addEventListener('keydown',callback);
    // the reason for cleaning the event listener is that the eventlistener will be created on every movie.
    return function(){
      document.removeEventListener('keydown', callback);
    }
  },[]);


  useEffect(()=>{
    async function getMovieDetails(){
      try{
        setIsLoading(true);
        const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
        if(!response.ok) throw new Error("Movie not found");
        const data = await response.json();
        setMovie(data);
      }
      catch(Error){
        console.log(Error.message);
      }
      finally{
        setIsLoading(false);
      }
    }
    getMovieDetails();
  },[selectedId]);

  useEffect(()=>{
      if(!title) return ;
      document.title = `Movie : ${title}`;
      return function(){
        document.title = "usePopcorn";
      }
  },[title]);
  
  return <div className="details">
  {isLoading ? <Loader />: 
    <>
    <button className='btn-back' onClick={onCloseMovie}>&larr;</button>
  <img src={poster} alt={`Poster of ${movie} movie`} />
  <header>
  <div className="details-overview">
    <h2>{title}</h2>
    <p>{released} &bull; {runtime}</p>
    <p>{genre}</p>
    <p>
      <span>⭐</span>
      {imdbRating} IMDB rating
    </p>
  </div>
  </header>

  <section>
    <div className="rating">
      { !isWatched ? 
      <>
        <StarRating 
        maxRating={10} 
        size={24}
        onSetRating={setUserRating}/>

        {
          userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to list</button>
        }
      </> 
      :
        <p>You Rated this movie {watchedUserRating}⭐</p>
      }

    </div>
    <p>
      <em>{plot}</em>
    </p>
    <p>Starring {actors}</p>
    <p>Director by {director}</p>
  </section>
    </>
  }
  
  </div>
}

function WatchedSummary({watched}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <Details emoji="#️⃣" content={watched.length}>movies</Details>
        <Details emoji="⭐️" content={avgImdbRating.toFixed(2)}/>
        <Details emoji="🌟" content={avgUserRating.toFixed(2)}/>
        <Details emoji="⏳" content={avgRuntime.toFixed(0)}>min</Details>
      </div>
    </div>
  )
}

function Details({emoji,content,children}){
    return (
      <p>
        <span>{emoji}</span>
        <span>{content}{children}</span>
      </p>
    )
}

function WatchedMoviesList({watched,onDeleteWatched}){
  return (
    <ul className="list">
      {watched.map((movie) => 
        <WatchedMovie 
        movie={movie} 
        key={movie.imdbID} 
        onDeleteWatched={onDeleteWatched}  
        /> 
      )}
    </ul>
  )
}

function WatchedMovie({movie, onDeleteWatched}){
  return (
    <li>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating.toFixed(2)}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating.toFixed(2)}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>

            <button className="btn-delete" onClick={()=>onDeleteWatched(movie.imdbID)}>X</button>
          </div>
    </li>
  );
}
