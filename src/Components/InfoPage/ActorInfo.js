import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useApi } from "../../Hooks/useApi";
import { CircularProgressbar } from 'react-circular-progressbar';
import './style.css'

function ActorInfo() {

  const api_key = '44810a8a464a121bf565fcea4c65103b'

  const { id } = useParams()

  const [ actorInfo, loading, error ] = useApi(`https://api.themoviedb.org/3/person/${id}?api_key=${api_key}&language=en-US`)

  const [ actorCredits, crLoading, crError ] = useApi(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${api_key}`)

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
            <div className="uk-width-1-1 uk-flex">
              <img className="poster" src={actorInfo.profile_path ? 'https://www.themoviedb.org/t/p/w500'+ actorInfo.profile_path : '/assets/imgs/empty.png'}/>
              <ul>
                <li>
                  <h3>
                    {actorInfo.name}
                  </h3>
                </li>
                <li>
                  <span>Biography</span>
                  {actorInfo.biography}
                </li>
                <li>
                  <span>Known For</span>
                  {actorInfo.known_for_department}
                </li>
                <li>
                  <span>Birthday</span>
                  {actorInfo.birthday}
                </li>
                <li>
                  <span>Place of birth</span>
                  {actorInfo.place_of_birth}
                </li>
                {
                  actorInfo.deathday ?
                  <li>
                    <span>Deathday</span>
                    {actorInfo.deathday}
                  </li>
                  :
                  null
                }
                {
                actorInfo.popularity ?
                <li>
                  <span>Popularity</span>
                  <div className="vote-average">
                    <CircularProgressbar value={Math.floor(actorInfo.popularity)} text={`${Math.floor(actorInfo.popularity)}%`}/>
                  </div>
                </li>
                :
                null
                }
              </ul>
            </div>
          </div>
        }
        </div>

        {/* Credits */}
        <div className="related with-cards">
          <div className="section-header uk-padding-remove" >
            <h3>Movies & TV Shows By {actorInfo.name}</h3>
          </div>
          <div>
            <div className="uk-position-relative uk-visible-toggle uk-light" uk-slider="finite: true">
              <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-6@l uk-grid-small">
              {
                crLoading ?
                  <li className="display-loading">
                    <img src="/assets/loading.gif"/>
                  </li>
                :
                  crError ?
                  <div className="display-error">
                    <img src="/assets/imgs/sad.png"/>
                    <p>
                      An error occured, please try again!
                    </p>
                  </div>
                  :
                  actorCredits.cast.map(
                    object =>
                    <li key={object.id}>
                      <NavLink to={
                        object.media_type === 'movie' ?
                        `/Movie/${object.id}`
                        :
                        `/TV/${object.id}`
                      }>
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
                          <h5>{object.name ? object.name : object.title}</h5>
                          <p>{object.release_date ? object.release_date : object.first_air_date}</p>
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

export default ActorInfo;