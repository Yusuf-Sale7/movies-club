import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './style.css'

function Search() {

  const [search, setSearch] = useState('')

  const navigateTo = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regEx = /^[a-zA-Z0-9\ \u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]+$/i

    if (search.trim().match(regEx)) {
      navigateTo(`/Results/${search}`)
    } else {
      toast.warning('Please enter a valid data!')
    }
  }

  // Random BG Image
  let randomNum = Math.floor(Math.random() * 4)
  const [imgNum] = useState(randomNum)

  return (
    <section className="search"
    style={{
      backgroundImage: `url(/assets/imgs/search/${
        imgNum
      }.jpg)`
    }}
    >
      <div className="uk-container">
        <h3>Welcome.</h3>
        <p>
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
        <form onSubmit={handleSubmit}>
          <input value={search.charAt(0).toUpperCase() + search.slice(1)} placeholder="Search a movie, tv show, person..." type="text" onChange={(e) => setSearch(e.target.value)}/>
          <button>Search</button>
        </form>
      </div>
    </section>
  )
}

export default Search;