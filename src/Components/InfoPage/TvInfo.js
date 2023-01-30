import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useApi } from "../../Hooks/useApi";
import { CircularProgressbar } from 'react-circular-progressbar';
import './style.css'

function TvInfo() {

  const api_key = '44810a8a464a121bf565fcea4c65103b'

  const { id } = useParams()

  const [ tvInfo, loading, error ] = useApi(`https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US`)

  const [ relatedTvs, relLoading, relError ] = useApi(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${api_key}&language=en-US`)

  return (
    <section className="media-info">
      <div className="uk-container">
        <div className="details">
        {
        loading ?
          <div className="display-loading">
            <img src="/assets/loading.gif"/>
          </div>
        :
          error ?
          <div className="display-error">
            <img src="/assets/imgs/sad.png"/>
            <p>
              An error occured, please try again!
            </p>
          </div>
          :
          <div uk-grid="true">
            <div className="uk-width-3-4@m uk-flex">
              <img className="poster" src={tvInfo.poster_path ? 'https://www.themoviedb.org/t/p/w500'+ tvInfo.poster_path : '/assets/imgs/empty.png'}/>
              <ul>
                <li>
                  <h3>
                    {tvInfo.name}
                  </h3>
                </li>
                <li>
                  <span>Overview</span>
                  {tvInfo.overview}
                </li>
                {
                tvInfo.first_air_date ?
                <li>
                  <span>Release Date</span>
                  {tvInfo.first_air_date}
                </li>
                :
                null
                }
                <li>
                  <span>Seasons</span>
                  {tvInfo.number_of_seasons}
                </li>
                <li>
                  <span>Episodes</span>
                  {tvInfo.number_of_episodes}
                </li>
                {
                tvInfo.vote_average ?
                <li>
                  <span>Vote Average</span>
                  <div className="vote-average">
                    <CircularProgressbar value={Math.floor(tvInfo.vote_average) * 10} text={`${Math.floor(tvInfo.vote_average * 10)}%`}/>
                  </div>
                </li>
                :
                null
                }
              </ul>
            </div>
            <div className="uk-width-1-4@m production-info">
              <h5>Production Companies</h5>
              <div>
              <div className="uk-position-relative uk-visible-toggle uk-light" uk-slider="finite: true">
                <ul className="uk-slider-items uk-child-width-1-1 uk-child-width-1-2@m uk-grid-small">
                {
                tvInfo.production_companies?.map(
                  company =>
                    <li key={company.id} className="company">
                      <div className="uk-panel">
                        <img src={company.logo_path ? 'https://www.themoviedb.org/t/p/w500'+ company.logo_path : '/assets/imgs/empty.png'} alt="Company Logo"/>
                      </div>
                      <p>{company.name}</p>
                    </li>
                  )
                }
                </ul>
                <ul className="uk-slider-nav uk-dotnav uk-flex-center"></ul>
              </div>
              </div>

              <h5>Production Countries</h5>
              <p>
              {
                tvInfo.production_countries?.map(
                  country =>
                  <span key={country.iso_3166_1}>{country.name}</span>
                )
              }
              </p>
            </div>
          </div>
        }
        </div>

        {/* Related Movies */}
        <div className="related with-cards">
          <div className="section-header uk-padding-remove" >
            <h3>Related TV Shows</h3>
          </div>
          <div>
            <div className="uk-position-relative uk-visible-toggle uk-light" uk-slider="finite: true">
              <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-6@l uk-grid-small">
              {
                relLoading ?
                  <li className="display-loading">
                    <img src="/assets/loading.gif"/>
                  </li>
                :
                  relError ?
                  <div className="display-error">
                    <img src="/assets/imgs/sad.png"/>
                    <p>
                      An error occured, please try again!
                    </p>
                  </div>
                  :
                  relatedTvs.results.map(
                    object =>
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TvInfo;