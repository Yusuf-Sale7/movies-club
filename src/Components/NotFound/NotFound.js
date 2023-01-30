import React from "react";
import './style.css'

function NotFound() {
  return (
    <section className="not-found" style={{
      backgroundImage: 'url(/assets/imgs/notFound/nf-bg.gif)'
    }}>
      <img src="/assets/imgs/notFound/iron-man.jpg" alt="Not Found"/>

      <div className="message">
        <h3>404 PAGE NOT FOUND</h3>
        <h5>Protocol Missing... Exiting Program...</h5>
        <p>
          Check that you typed the address correctly, go back to your previous page or try using our site search to find something specific.
        </p>
      </div>
    </section>
  )
}

export default NotFound;