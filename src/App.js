import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Routers from "./Routers/Routers";

function App() {
  return (
    <React.Fragment>
      <NavBar/>
      <Routers/>
      <Footer/>
    </React.Fragment>
  )
}

export default App;
