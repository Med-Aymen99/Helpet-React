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
        <SearchBar pets={props.pets} onSubmit={props.onSearchSubmit} handleChange={props.handleChange} addPetData={props.addPetData} />
        <section className="cards-list" >
          {props.pets}
        </section>
        <div className="pagination">
          <Pagination pages={props.pages} setCurrentPage={props.setCurrentPage} currentPage={props.currentPage}/>
        </div>
      </div>
    </div>
  )
}
