import { useEffect, useState } from 'react';

import './App.css';
import MovieCart from './components/MovieCart';
import SearchBar from './components/SearchBar';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=e4abefb6';
function App() {
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) =>{
    let searchterm = false;
    if(e){
      searchterm = e.target.value.replace(/\s/g,'').length !== 0 && e.target.value;
    }
    const res = await fetch(`${API_URL}&s=${searchterm}`);
    const data = await res.json();

    setMovies(data.Search);
  }
  const debounce = (fn, d) =>{
    let timer;

    return function(){
        let context = this;
        let args = arguments;

        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(context, args)
        }, d);
    }
  }
  const betterSearchMovies = debounce(searchMovies, 300);

  useEffect(()=>{
    searchMovies();
  }, [])

  return (
    <div className="app">
      <h1>MOVIELAND</h1>

      <SearchBar searchMovies={betterSearchMovies} />

      <div className="container">
        {
          movies ?
          movies.map(movie=>(
            <MovieCart key={movie.imdbID} movie={movie} />
          ))
          :
          <div className='empty'>
            <h2>No Movies found</h2>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
