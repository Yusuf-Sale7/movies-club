import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useApi } from "../../Hooks/useApi";
import Search from "../Home/Search/Search";
import { CircularProgressbar } from 'react-circular-progressbar';
import './style.css'

function Results() {

  const api_key = '44810a8a464a121bf565fcea4c65103b'

  const [page, setPage] = useState(1)
  const [searchKey, setSearchKey] = useState('multi')

  const { query } = useParams()

  const [ searchResult, loading, error ] = useApi(`https://api.themoviedb.org/3/search/${searchKey}?api_key=${api_key}&language=en-US&query=${query}&page=${page}&include_adult=false`)

  // Focus on results after submit
  useEffect(() => {
    document.getElementById('results').scrollIntoView({behavior: 'smooth'})
  })

  // Reset Page If Query Changed
  useEffect(() => {
    setPage(1)
  }, [query])

  return (
    <React.Fragment>
      <Search/>

      <section id="results" className="results with-cards">
        <div className="uk-container">
          <ul uk-tab="true">
            <li className="uk-active"><a href="#" onClick={() => {setSearchKey('multi');setPage(1)}}>All</a></li>
            <li><a href="#" onClick={() => {setSearchKey('movie');setPage(1)}}>Movie</a></li>
            <li><a href="#" onClick={() => {setSearchKey('tv');setPage(1)}}>TV Show</a></li>
            <li><a href="#" onClick={() => {setSearchKey('person');setPage(1)}}>Person</a></li>
          </ul>
          <ul className="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-6@l uk-grid" uk-grid="true">
          {
          loading ?
          <li className="display-loading">
            <img src="/assets/loading.gif"/>
          </li>
          :
            error ?
            <div className="display-error">
              <img src="/assets/imgs/sad.png"/>
              <p>
                An error occured, please try again!
              </p>
            </div>
            :
            searchResult.results.length ?
              searchKey === 'multi' ?
              searchResult.results.map(
                object =>
                <li key={object.id}>
                  <NavLink to={
                    object.media_type === 'movie' ?
                    `/Movie/${object.id}`
                    :
                    object.media_type === 'tv' ?
                    `/TV/${object.id}`
                    :
                    `/Actor/${object.id}`
                    }>
                    <div className="uk-panel" style={{
                    backgroundImage: object.poster_path ? 'url(https://www.themoviedb.org/t/p/w500'+ object.poster_path +')' : object.profile_path ? 'url(https://www.themoviedb.org/t/p/w500'+ object.profile_path +')' : 'url(/assets/imgs/empty.png)'
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
                      <h5>{object.title ? object.title : object.name}</h5>
                      <p>{object.release_date ? object.release_date : object.first_air_date}</p>
                    </div>
                  </NavLink>
                </li>
              )
              :
              searchKey === 'movie' ?
              searchResult.results.map(
                object => {
                  return (
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
                }
              )
              :
              searchKey === 'tv' ?
              searchResult.results.map(
                object => {
                  return (
                    <li key={object.id}>
                      <NavLink to={`/TV/${object.id}`}>
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
                          <h5>{object.name}</h5>
                          <p>{object.first_air_date}</p>
                        </div>
                      </NavLink>
                    </li>
                  )
                }
              )
              :
              searchResult.results.map(
                object => {
                  return (
                    <li key={object.id}>
                      <NavLink to={`/Actor/${object.id}`}>
                        <div className="uk-panel" style={{
                        backgroundImage: object.profile_path ? 'url(https://www.themoviedb.org/t/p/w500'+ object.profile_path +')' : 'url(/assets/imgs/empty.png)'
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
                          <h5>{object.name}</h5>
                        </div>
                      </NavLink>
                    </li>
                  )
                }
              )
            :
            <li className="search-guide">
              <img src="/assets/imgs/search.png" alt="Search"/>
              <p>No Results Found For "{query}"!</p>
            </li>
          }
          </ul>

          <ul className="uk-pagination">
            {
              page >= 2 &&
              <li>
                <button onClick={() => setPage(page - 1)}>
                  <span className="uk-margin-small-right" uk-pagination-previous="true"></span>
                  Previous
                </button>
              </li>
            }

            {
              page < searchResult.total_pages &&
              <li className="uk-margin-auto-left">
                <button onClick={() => setPage(page + 1)}>
                  Next
                  <span className="uk-margin-small-left" uk-pagination-next="true"></span>
                </button>
              </li>
            }
          </ul>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Results;