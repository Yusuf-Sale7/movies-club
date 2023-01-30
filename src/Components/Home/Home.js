import React from "react";
import Search from "./Search/Search";
import Trending from "./Trending/Trending";
import Collections from "./Collections/Collections";

function Home() {
  return (
    <React.Fragment>
      <Search/>
      <Trending/>
      <Collections/>
    </React.Fragment>
  )
}

export default Home;