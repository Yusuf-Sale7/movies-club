import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home/Home";
import ActorInfo from "../Components/InfoPage/ActorInfo";
import MovieInfo from "../Components/InfoPage/MovieInfo";
import TvInfo from "../Components/InfoPage/TvInfo";
import NotFound from "../Components/NotFound/NotFound";
import Results from "../Components/SearchResults/Results";
import TopMovies from "../Components/TopMovies/TopMovies";
import TopTv from "../Components/TopTv/TopTv";

function Routers() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/TopMovies" element={<TopMovies/>}/>
        <Route path="/TopTvShows" element={<TopTv/>}/>
        <Route path="/Results/:query" element={<Results/>}/>
        <Route path="/Movie/:id" element={<MovieInfo/>}/>
        <Route path="/TV/:id" element={<TvInfo/>}/>
        <Route path="/Actor/:id" element={<ActorInfo/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </main>
  )
}

export default Routers;