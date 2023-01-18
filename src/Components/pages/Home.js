import React from "react"
import Navbar from "../Navbar"
import Hero from "../Hero"
import SearchBar from "../SearchBar"
import Pagination from "../Pagination"

export default function Home(props) {
  return (
    <div>
      <Navbar isAuthenticated={props.isAuthenticated}/>
      <div className="home-contents">
        <Hero />
        <SearchBar pets={props.pets} onSubmit={props.onSearchSubmit} handleChange={props.handleChange} formData={props.formData} />
        <section className="cards-list" >
          {props.pets}
        </section>
        <div className="pagination">
          <Pagination pages={props.pages} changingPage={props.changingPage} currentPage={props.currentPage}/>
        </div>
      </div>
    </div>
  )
}
