import {useState, useEffect} from "react";

const KEY = 'f84fc31d';

export function useMovies(query){
      const [movies, setMovies] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState('');
    useEffect(function(){
        const controller = new AbortController();
        async function fetchMovies(){
            // callback?.();
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
          fetchMovies();
          return function(){
            controller.abort();
          }
      }, [query]);
    
      return {movies, isLoading, error};
}