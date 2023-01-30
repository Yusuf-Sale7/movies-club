import React, { useState } from "react";
import { useApi } from "../../Hooks/useApi";
import { CircularProgressbar } from 'react-circular-progressbar';
import { NavLink } from "react-router-dom";

function TopMovies() {

  const api_key = '44810a8a464a121bf565fcea4c65103b'

  const [page, setPage] = useState(1)

  const [ topMovies, loading, error ] = useApi(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=${page}`)

  return (
    <section className="allTrending with-cards">
      <div className="uk-container">
        <ul className="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-6@l uk-grid" uk-grid="true">
        {
        loading ?
          <li className="display-loading">
            <img src="/assets/loading.gif"/>
          </li>
          :
            error ?
            <span className="display-error">An error occured, please try again!</span>
            :
            topMovies.results.length ?
              topMovies.results.map(
                object =>
                <li key={object.id}>
                  <NavLink to={`/Movie/${object.id}`}>
                    <div className="uk-panel" style={{
                    backgroundImage: object.poster_path ? 'url(https://www.themoviedb.org/t/p/w500'+ object.poster_path +')' : 'url(/assets/imgs/empty.png)'
                    }}>
                    {
                      object.vote_average ?
                      <div className="vote-average">
                        <CircularProgressbar value={Math.floor(object.vote_average) * 10} text={`${Math.floor(object.vote_average * 10)}%`}/>
                      </div>
                      :
                      null
                    }
                    </div>
                    <div className="info">
                      <h5>{object.title}</h5>
                      <p>{object.release_date}</p>
                    </div>
                  </NavLink>
                </li>
              )
            :
            <li className="search-guide">
              <img src="/assets/imgs/search.png" alt="Search"/>
              <p>No Results Found!</p>
            </li>
        }
        </ul>

        <ul className="uk-pagination">
          {
            page >= 2 &&
            <li>
              <a href="#" onClick={() => setPage(page - 1)}>
                <span className="uk-margin-small-right" uk-pagination-previous="true"></span>
                Previous
              </a>
            </li>
          }

          {
            page < topMovies.total_pages &&
            <li className="uk-margin-auto-left">
              <a href="#" onClick={() => setPage(page + 1)}>
                Next
                <span className="uk-margin-small-left" uk-pagination-next="true"></span>
              </a>
            </li>
          }
        </ul>
      </div>
    </section>
  )
}

export default TopMovies;