import React, { useState } from "react";
import { useApi } from "../../../Hooks/useApi";
import { CircularProgressbar } from 'react-circular-progressbar';
import { NavLink } from "react-router-dom";

function Trending() {

  const api_key = '44810a8a464a121bf565fcea4c65103b';

  const [ opt, setOpt ] = useState('day')

  const [ trends, loading, error ] = useApi(`https://api.themoviedb.org/3/trending/all/${opt}?api_key=${api_key}&include_adult=false`)

  return (
    <section className="trending with-cards">
      <div className="section-header" >
        <h3>Trending</h3>

        <ul uk-tab="true">
          <li className="uk-active" onClick={() => setOpt('day')}><a href="#">Today</a></li>
          <li><a href="#" onClick={() => setOpt('week')}>This Week</a></li>
        </ul>
      </div>

      <div className="uk-position-relative uk-visible-toggle uk-light" uk-slider="finite: true">
        <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-6@l uk-grid-small">
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
            trends.results.map(
              object =>
              <li key={object.id}>
                <NavLink to={
                  object.release_date ?
                  `/Movie/${object.id}`
                  :
                  object.first_air_date ?
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
        }
        </ul>
      </div>
    </section>
  )
}

export default Trending;